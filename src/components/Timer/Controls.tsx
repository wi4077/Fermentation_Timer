import type { TimerStatus } from '../../hooks/useTimer';
import './Controls.css';

interface ControlsProps {
    status: TimerStatus;
    onStart: () => void;
    onPause: () => void;
    onResume: () => void;
    onReset: () => void;
}

export function Controls({ status, onStart, onPause, onResume, onReset }: ControlsProps) {
    return (
        <div className="controls">
            {status === 'idle' && (
                <button className="btn btn-primary btn-icon btn-lg" onClick={onStart} aria-label="시작">
                    <PlayIcon />
                </button>
            )}

            {status === 'running' && (
                <button className="btn btn-secondary btn-icon btn-lg" onClick={onPause} aria-label="일시정지">
                    <PauseIcon />
                </button>
            )}

            {status === 'paused' && (
                <>
                    <button className="btn btn-secondary btn-icon" onClick={onReset} aria-label="리셋">
                        <ResetIcon />
                    </button>
                    <button className="btn btn-primary btn-icon btn-lg" onClick={onResume} aria-label="재개">
                        <PlayIcon />
                    </button>
                </>
            )}

            {status === 'completed' && (
                <button className="btn btn-primary btn-icon btn-lg" onClick={onReset} aria-label="다시 시작">
                    <ResetIcon />
                </button>
            )}

            {status === 'running' && (
                <button className="btn btn-secondary btn-icon" onClick={onReset} aria-label="리셋">
                    <ResetIcon />
                </button>
            )}
        </div>
    );
}

// 간단한 SVG 아이콘들
function PlayIcon() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
        </svg>
    );
}

function PauseIcon() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
        </svg>
    );
}

function ResetIcon() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
        </svg>
    );
}

export default Controls;
