import { useState, useEffect, useCallback, useRef } from 'react';

export type TimerStatus = 'idle' | 'running' | 'paused' | 'completed';

interface UseTimerReturn {
    /** 남은 시간 (초) */
    timeLeft: number;
    /** 전체 시간 (초) */
    totalTime: number;
    /** 타이머 상태 */
    status: TimerStatus;
    /** 진행률 (0~1) */
    progress: number;
    /** 타이머 시작 */
    start: () => void;
    /** 타이머 일시정지 */
    pause: () => void;
    /** 타이머 재개 */
    resume: () => void;
    /** 타이머 리셋 */
    reset: () => void;
    /** 시간 설정 (분 단위) */
    setMinutes: (minutes: number) => void;
}

export function useTimer(initialMinutes: number = 60): UseTimerReturn {
    const [totalTime, setTotalTime] = useState(initialMinutes * 60);
    const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);
    const [status, setStatus] = useState<TimerStatus>('idle');
    const intervalRef = useRef<number | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // 알림 소리 초기화
    useEffect(() => {
        // 브라우저 내장 비프음 사용 (Web Audio API)
        audioRef.current = null;
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    // 타이머 완료 알림
    const playNotification = useCallback(() => {
        // Web Audio API로 비프음 생성
        try {
            const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.frequency.value = 800;
            oscillator.type = 'sine';
            gainNode.gain.value = 0.3;

            oscillator.start();

            // 비프음 패턴: 3번 울림
            setTimeout(() => gainNode.gain.value = 0, 200);
            setTimeout(() => gainNode.gain.value = 0.3, 400);
            setTimeout(() => gainNode.gain.value = 0, 600);
            setTimeout(() => gainNode.gain.value = 0.3, 800);
            setTimeout(() => gainNode.gain.value = 0, 1000);
            setTimeout(() => {
                oscillator.stop();
                audioContext.close();
            }, 1200);
        } catch (e) {
            console.log('Audio notification failed:', e);
        }

        // 브라우저 알림
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('🍞 발효 완료!', {
                body: '빵 발효가 완료되었습니다.',
                icon: '🍞',
            });
        }
    }, []);

    // 타이머 틱
    useEffect(() => {
        if (status === 'running' && timeLeft > 0) {
            intervalRef.current = window.setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        setStatus('completed');
                        playNotification();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, [status, timeLeft, playNotification]);

    const start = useCallback(() => {
        if (status === 'idle' || status === 'completed') {
            setTimeLeft(totalTime);
        }
        setStatus('running');

        // 알림 권한 요청
        if ('Notification' in window && Notification.permission === 'default') {
            Notification.requestPermission();
        }
    }, [status, totalTime]);

    const pause = useCallback(() => {
        if (status === 'running') {
            setStatus('paused');
        }
    }, [status]);

    const resume = useCallback(() => {
        if (status === 'paused') {
            setStatus('running');
        }
    }, [status]);

    const reset = useCallback(() => {
        setStatus('idle');
        setTimeLeft(totalTime);
    }, [totalTime]);

    const setMinutes = useCallback((minutes: number) => {
        const seconds = Math.max(1, minutes) * 60;
        setTotalTime(seconds);
        setTimeLeft(seconds);
        setStatus('idle');
    }, []);

    const progress = totalTime > 0 ? (totalTime - timeLeft) / totalTime : 0;

    return {
        timeLeft,
        totalTime,
        status,
        progress,
        start,
        pause,
        resume,
        reset,
        setMinutes,
    };
}

// 시간 포맷팅 헬퍼
export function formatTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
        return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}
