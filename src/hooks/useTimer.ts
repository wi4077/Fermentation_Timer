import { useState, useEffect, useCallback, useRef } from 'react';
import type { FermentationStage } from '../data/presets';

export type TimerStatus = 'idle' | 'running' | 'paused' | 'stageComplete' | 'allComplete';

interface UseMultiStageTimerReturn {
    /** 현재 단계 인덱스 */
    currentStageIndex: number;
    /** 현재 단계 정보 */
    currentStage: FermentationStage | null;
    /** 남은 시간 (초) */
    timeLeft: number;
    /** 현재 단계 전체 시간 (초) */
    stageTime: number;
    /** 타이머 상태 */
    status: TimerStatus;
    /** 현재 단계 진행률 (0~1) */
    stageProgress: number;
    /** 전체 진행률 (0~1) */
    totalProgress: number;
    /** 완료된 단계 수 */
    completedStages: number;
    /** 전체 단계 수 */
    totalStages: number;
    /** 타이머 시작 */
    start: () => void;
    /** 타이머 일시정지 */
    pause: () => void;
    /** 타이머 재개 */
    resume: () => void;
    /** 현재 단계 리셋 */
    resetStage: () => void;
    /** 전체 리셋 */
    resetAll: () => void;
    /** 다음 단계로 진행 */
    nextStage: () => void;
    /** 단계 설정 */
    setStages: (stages: FermentationStage[]) => void;
}

export function useMultiStageTimer(initialStages: FermentationStage[] = []): UseMultiStageTimerReturn {
    const [stages, setStagesState] = useState<FermentationStage[]>(initialStages);
    const [currentStageIndex, setCurrentStageIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState(0);
    const [status, setStatus] = useState<TimerStatus>('idle');
    const intervalRef = useRef<number | null>(null);

    const currentStage = stages[currentStageIndex] || null;
    const stageTime = currentStage ? currentStage.durationMinutes * 60 : 0;

    // 초기화
    useEffect(() => {
        if (stages.length > 0 && status === 'idle') {
            setTimeLeft(stages[0].durationMinutes * 60);
        }
    }, [stages, status]);

    // 알림
    const playNotification = useCallback((message: string) => {
        try {
            const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.frequency.value = 880;
            oscillator.type = 'sine';
            gainNode.gain.value = 0.3;

            oscillator.start();
            setTimeout(() => gainNode.gain.value = 0, 150);
            setTimeout(() => gainNode.gain.value = 0.3, 300);
            setTimeout(() => gainNode.gain.value = 0, 450);
            setTimeout(() => {
                oscillator.stop();
                audioContext.close();
            }, 600);
        } catch (e) {
            console.log('Audio notification failed:', e);
        }

        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('🍞 ' + message, {
                body: currentStage ? `${currentStage.name} 단계가 완료되었습니다!` : '발효가 완료되었습니다!',
            });
        }
    }, [currentStage]);

    // 타이머 로직
    useEffect(() => {
        if (status === 'running' && timeLeft > 0) {
            intervalRef.current = window.setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        // 현재 단계 완료
                        if (currentStageIndex < stages.length - 1) {
                            setStatus('stageComplete');
                            playNotification('단계 완료!');
                        } else {
                            setStatus('allComplete');
                            playNotification('모든 발효 완료!');
                        }
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
    }, [status, timeLeft, currentStageIndex, stages.length, playNotification]);

    const start = useCallback(() => {
        if (status === 'idle' || status === 'stageComplete') {
            if (status === 'idle' && stages.length > 0) {
                setTimeLeft(stages[0].durationMinutes * 60);
            }
        }
        setStatus('running');

        if ('Notification' in window && Notification.permission === 'default') {
            Notification.requestPermission();
        }
    }, [status, stages]);

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

    const resetStage = useCallback(() => {
        if (currentStage) {
            setTimeLeft(currentStage.durationMinutes * 60);
            setStatus('idle');
        }
    }, [currentStage]);

    const resetAll = useCallback(() => {
        setCurrentStageIndex(0);
        if (stages.length > 0) {
            setTimeLeft(stages[0].durationMinutes * 60);
        }
        setStatus('idle');
    }, [stages]);

    const nextStage = useCallback(() => {
        if (currentStageIndex < stages.length - 1) {
            const nextIndex = currentStageIndex + 1;
            setCurrentStageIndex(nextIndex);
            setTimeLeft(stages[nextIndex].durationMinutes * 60);
            setStatus('running');
        }
    }, [currentStageIndex, stages]);

    const setStages = useCallback((newStages: FermentationStage[]) => {
        setStagesState(newStages);
        setCurrentStageIndex(0);
        if (newStages.length > 0) {
            setTimeLeft(newStages[0].durationMinutes * 60);
        }
        setStatus('idle');
    }, []);

    // 진행률 계산
    const stageProgress = stageTime > 0 ? (stageTime - timeLeft) / stageTime : 0;

    const totalTimeAll = stages.reduce((sum, s) => sum + s.durationMinutes * 60, 0);
    const completedTime = stages.slice(0, currentStageIndex).reduce((sum, s) => sum + s.durationMinutes * 60, 0) + (stageTime - timeLeft);
    const totalProgress = totalTimeAll > 0 ? completedTime / totalTimeAll : 0;

    return {
        currentStageIndex,
        currentStage,
        timeLeft,
        stageTime,
        status,
        stageProgress,
        totalProgress,
        completedStages: currentStageIndex,
        totalStages: stages.length,
        start,
        pause,
        resume,
        resetStage,
        resetAll,
        nextStage,
        setStages,
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
