import type { FermentationStage } from '../../data/presets';
import './StageProgress.css';

interface StageProgressProps {
    stages: FermentationStage[];
    currentStageIndex: number;
    status: string;
}

export function StageProgress({ stages, currentStageIndex, status }: StageProgressProps) {
    return (
        <div className="stage-progress">
            <div className="stage-list">
                {stages.map((stage, index) => {
                    let stageStatus = 'pending';
                    if (index < currentStageIndex) {
                        stageStatus = 'completed';
                    } else if (index === currentStageIndex) {
                        stageStatus = status === 'allComplete' ? 'completed' : 'active';
                    }

                    return (
                        <div
                            key={stage.id + index}
                            className={`stage-item ${stageStatus}`}
                            title={`${stage.name}: ${stage.durationMinutes}분`}
                        >
                            <div className="stage-dot">
                                {stageStatus === 'completed' ? '✓' : index + 1}
                            </div>
                            <div className="stage-info">
                                <span className="stage-name">{stage.emoji} {stage.name}</span>
                                <span className="stage-time">{stage.durationMinutes}분</span>
                            </div>
                            {index < stages.length - 1 && <div className="stage-connector" />}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default StageProgress;
