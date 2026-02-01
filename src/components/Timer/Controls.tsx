import type { TimerStatus } from '../../hooks/useTimer';
import './Controls.css';

interface ControlsProps {
    status: TimerStatus;
    onStart: () => void;
    onPause: () => void;
    onResume: () => void;
    onResetStage: () => void;
    onResetAll: () => void;
    onNextStage: () => void;
    hasNextStage: boolean;
}

export function Controls({
    status,
    onStart,
    onPause,
    onResume,
    onResetStage,
    onResetAll,
    onNextStage,
    hasNextStage
}: ControlsProps) {
    return (
        <div className="controls">
            {status === 'idle' && (
                <button className="btn btn-primary btn-icon btn-lg" onClick={onStart} aria-label="시작">
                    <PlayIcon />
                </button>
            )}

            {status === 'running' && (
                <>
                    <button className="btn btn-secondary btn-icon" onClick={onResetStage} aria-label="단계 리셋">
                        <ResetIcon />
                    </button>
                    <button className="btn btn-secondary btn-icon btn-lg" onClick={onPause} aria-label="일시정지">
                        <PauseIcon />
                    </button>
                </>
            )}

            {status === 'paused' && (
                <>
                    <button className="btn btn-secondary btn-icon" onClick={onResetStage} aria-label="단계 리셋">
                        <ResetIcon />
                    </button>
                    <button className="btn btn-primary btn-icon btn-lg" onClick={onResume} aria-label="재개">
                        <PlayIcon />
                    </button>
                </>
            )}

            {status === 'stageComplete' && hasNextStage && (
                <>
                    <button className="btn btn-secondary btn-icon" onClick={onResetAll} aria-label="처음부터">
                        <HomeIcon />
                    </button>
                    <button className="btn btn-primary btn-icon btn-lg" onClick={onNextStage} aria-label="다음 단계">
                        <NextIcon />
                    </button>
                </>
            )}

            {status === 'allComplete' && (
                <button className="btn btn-primary btn-icon btn-lg" onClick={onResetAll} aria-label="처음부터">
                    <ResetIcon />
                </button>
            )}
        </div>
    );
}

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

function NextIcon() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M5 5v14l11-7z" />
            <rect x="17" y="5" width="2" height="14" />
        </svg>
    );
}

function HomeIcon() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
    );
}

export default Controls;
