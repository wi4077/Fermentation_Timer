import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Supabase 클라이언트 (환경변수 있을 때만 생성)
export const supabase: SupabaseClient | null =
    supabaseUrl && supabaseAnonKey
        ? createClient(supabaseUrl, supabaseAnonKey)
        : null;

export const isSupabaseConfigured = (): boolean => supabase !== null;

// 푸시 알림 구독 저장
export async function savePushSubscription(subscription: PushSubscription) {
    if (!supabase) {
        console.warn('Supabase not configured');
        return null;
    }

    const { data, error } = await supabase
        .from('push_subscriptions')
        .upsert({
            endpoint: subscription.endpoint,
            keys: JSON.stringify(subscription.toJSON().keys),
            created_at: new Date().toISOString(),
        }, {
            onConflict: 'endpoint'
        });

    if (error) {
        console.error('Failed to save subscription:', error);
        throw error;
    }
    return data;
}

// 타이머 스케줄 저장
export async function saveTimerSchedule(
    subscriptionEndpoint: string,
    scheduledTime: Date,
    message: string
) {
    if (!supabase) {
        console.warn('Supabase not configured');
        return null;
    }

    const { data, error } = await supabase
        .from('timer_schedules')
        .insert({
            subscription_endpoint: subscriptionEndpoint,
            scheduled_at: scheduledTime.toISOString(),
            message: message,
            sent: false,
        });

    if (error) {
        console.error('Failed to save timer schedule:', error);
        throw error;
    }
    return data;
}

// 기존 타이머 스케줄 삭제 (리셋 시)
export async function deleteTimerSchedules(subscriptionEndpoint: string) {
    if (!supabase) {
        console.warn('Supabase not configured');
        return;
    }

    const { error } = await supabase
        .from('timer_schedules')
        .delete()
        .eq('subscription_endpoint', subscriptionEndpoint)
        .eq('sent', false);

    if (error) {
        console.error('Failed to delete schedules:', error);
    }
}

// Edge Function을 통해 즉시 푸시 알림 전송
export async function sendPushNow(subscription: PushSubscription, message: string) {
    if (!supabase) {
        console.warn('Supabase not configured');
        return null;
    }

    const { data, error } = await supabase.functions.invoke('send-push', {
        body: {
            subscription: subscription.toJSON(),
            message: message,
        }
    });

    if (error) {
        console.error('Failed to send push:', error);
        throw error;
    }
    return data;
}

