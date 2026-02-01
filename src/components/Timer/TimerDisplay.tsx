import { formatTime } from '../../hooks/useTimer';
import type { TimerStatus } from '../../hooks/useTimer';
import type { FermentationStage } from '../../data/presets';
import './TimerDisplay.css';

interface TimerDisplayProps {
    timeLeft: number;
    progress: number;
    status: TimerStatus;
    currentStage: FermentationStage | null;
}

export function TimerDisplay({ timeLeft, progress, status, currentStage }: TimerDisplayProps) {
    const circumference = 2 * Math.PI * 140;
    const strokeDashoffset = circumference * (1 - progress);

    const getStatusText = () => {
        switch (status) {
            case 'running': return currentStage?.description || '진행 중...';
            case 'paused': return '일시정지';
            case 'stageComplete': return '✅ 단계 완료!';
            case 'allComplete': return '🎉 모든 발효 완료!';
            default: return '시작하려면 버튼을 누르세요';
        }
    };

    const getStatusClass = () => {
        switch (status) {
            case 'running': return 'status-running';
            case 'paused': return 'status-paused';
            case 'stageComplete': return 'status-stage-complete';
            case 'allComplete': return 'status-completed';
            default: return 'status-idle';
        }
    };

    return (
        <div className={`timer-display ${getStatusClass()}`}>
            {currentStage && (
                <div className="current-stage-badge">
                    <span>{currentStage.emoji}</span>
                    <span>{currentStage.name}</span>
                </div>
            )}

            <svg className="timer-ring" viewBox="0 0 320 320">
                <circle
                    className="timer-ring-bg"
                    cx="160"
                    cy="160"
                    r="140"
                    fill="none"
                    strokeWidth="12"
                />
                <circle
                    className="timer-ring-progress"
                    cx="160"
                    cy="160"
                    r="140"
                    fill="none"
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    transform="rotate(-90 160 160)"
                />
            </svg>

            <div className="timer-content">
                <span className="timer-time">{formatTime(timeLeft)}</span>
                <span className="timer-status">{getStatusText()}</span>
            </div>
        </div>
    );
}

export default TimerDisplay;
