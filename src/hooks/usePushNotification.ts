import { useState, useEffect, useCallback } from 'react';
import { savePushSubscription, saveTimerSchedule, deleteTimerSchedules } from '../lib/supabase';

// VAPID 공개 키 (GitHub Secrets에서 주입)
const VAPID_PUBLIC_KEY = import.meta.env.VITE_VAPID_PUBLIC_KEY || '';

interface UsePushNotificationReturn {
    isSupported: boolean;
    isSubscribed: boolean;
    subscription: PushSubscription | null;
    subscribe: () => Promise<void>;
    scheduleNotification: (delaySeconds: number, message: string) => Promise<void>;
    cancelScheduledNotifications: () => Promise<void>;
    sendPush: (message: string) => Promise<void>;
}

function urlBase64ToUint8Array(base64String: string): Uint8Array {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

export function usePushNotification(): UsePushNotificationReturn {
    const [isSupported, setIsSupported] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [subscription, setSubscription] = useState<PushSubscription | null>(null);

    useEffect(() => {
        const checkSupport = async () => {
            const supported = 'serviceWorker' in navigator && 'PushManager' in window;
            setIsSupported(supported);

            if (supported) {
                try {
                    const registration = await navigator.serviceWorker.ready;
                    const existingSubscription = await registration.pushManager.getSubscription();
                    if (existingSubscription) {
                        setSubscription(existingSubscription);
                        setIsSubscribed(true);
                    }
                } catch (error) {
                    console.error('Error checking subscription:', error);
                }
            }
        };

        checkSupport();
    }, []);

    const subscribe = useCallback(async () => {
        if (!isSupported || !VAPID_PUBLIC_KEY) {
            console.error('Push notifications not supported or VAPID key missing');
            return;
        }

        try {
            // Service Worker 등록
            const registration = await navigator.serviceWorker.register('/Fermentation_Timer/sw.js');
            await navigator.serviceWorker.ready;

            // 기존 구독 확인
            let pushSubscription = await registration.pushManager.getSubscription();

            if (!pushSubscription) {
                // 새 구독 생성
                pushSubscription = await registration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY) as BufferSource
                });
            }

            // Supabase에 구독 정보 저장
            await savePushSubscription(pushSubscription);

            setSubscription(pushSubscription);
            setIsSubscribed(true);
            console.log('Push subscription successful');
        } catch (error) {
            console.error('Push subscription failed:', error);
            throw error;
        }
    }, [isSupported]);

    const scheduleNotification = useCallback(async (delaySeconds: number, message: string) => {
        if (!subscription) {
            console.error('No push subscription');
            return;
        }

        const scheduledTime = new Date(Date.now() + delaySeconds * 1000);
        await saveTimerSchedule(subscription.endpoint, scheduledTime, message);
        console.log('Notification scheduled for:', scheduledTime);
    }, [subscription]);

    const cancelScheduledNotifications = useCallback(async () => {
        if (!subscription) return;
        await deleteTimerSchedules(subscription.endpoint);
        console.log('Scheduled notifications cancelled');
    }, [subscription]);

    // Edge Function을 통해 즉시 푸시 알림 전송
    const sendPush = useCallback(async (message: string) => {
        if (!subscription) {
            console.error('No push subscription');
            return;
        }

        const { sendPushNow } = await import('../lib/supabase');
        await sendPushNow(subscription, message);
        console.log('Push notification sent:', message);
    }, [subscription]);

    return {
        isSupported,
        isSubscribed,
        subscription,
        subscribe,
        scheduleNotification,
        cancelScheduledNotifications,
        sendPush,
    };
}
