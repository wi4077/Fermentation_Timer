import { formatTime } from '../../hooks/useTimer';
import type { TimerStatus } from '../../hooks/useTimer';
import './TimerDisplay.css';

interface TimerDisplayProps {
    timeLeft: number;
    progress: number;
    status: TimerStatus;
}

export function TimerDisplay({ timeLeft, progress, status }: TimerDisplayProps) {
    const circumference = 2 * Math.PI * 140; // 원 둘레 (반지름 140)
    const strokeDashoffset = circumference * (1 - progress);

    const getStatusText = () => {
        switch (status) {
            case 'running': return '발효 중...';
            case 'paused': return '일시정지';
            case 'completed': return '🎉 완료!';
            default: return '준비';
        }
    };

    const getStatusClass = () => {
        switch (status) {
            case 'running': return 'status-running';
            case 'paused': return 'status-paused';
            case 'completed': return 'status-completed';
            default: return 'status-idle';
        }
    };

    return (
        <div className={`timer-display ${getStatusClass()}`}>
            <svg className="timer-ring" viewBox="0 0 320 320">
                {/* 배경 원 */}
                <circle
                    className="timer-ring-bg"
                    cx="160"
                    cy="160"
                    r="140"
                    fill="none"
                    strokeWidth="12"
                />
                {/* 진행 원 */}
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
