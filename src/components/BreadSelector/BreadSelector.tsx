import { type BreadPreset, getTotalTime } from '../../data/presets';
import './BreadSelector.css';

interface BreadSelectorProps {
    presets: BreadPreset[];
    customPresets: BreadPreset[];
    selectedId: string;
    onSelect: (preset: BreadPreset) => void;
    onCreateCustom: () => void;
    onDeleteCustom?: (id: string) => void;
    disabled?: boolean;
}

export function BreadSelector({
    presets,
    customPresets,
    selectedId,
    onSelect,
    onCreateCustom,
    onDeleteCustom,
    disabled
}: BreadSelectorProps) {
    const allPresets = [...presets, ...customPresets];

    return (
        <div className="bread-selector">
            <div className="bread-selector-header">
                <h3 className="bread-selector-title">빵 종류 선택</h3>
                <button
                    type="button"
                    className="btn-create-custom"
                    onClick={onCreateCustom}
                    disabled={disabled}
                >
                    ✨ 직접 만들기
                </button>
            </div>

            <div className="bread-list">
                {allPresets.map((preset) => (
                    <div key={preset.id} className="bread-item-wrapper">
                        <button
                            className={`bread-item ${selectedId === preset.id ? 'selected' : ''} ${preset.isCustom ? 'custom' : ''}`}
                            onClick={() => onSelect(preset)}
                            disabled={disabled}
                            aria-pressed={selectedId === preset.id}
                        >
                            <span className="bread-emoji">{preset.emoji}</span>
                            <span className="bread-name">{preset.name}</span>
                            <span className="bread-time">
                                {getTotalTime(preset.stages)}분 · {preset.stages.length}단계
                            </span>
                            {preset.isCustom && <span className="custom-badge">커스텀</span>}
                        </button>
                        {preset.isCustom && onDeleteCustom && (
                            <button
                                type="button"
                                className="btn-delete-custom"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDeleteCustom(preset.id);
                                }}
                                disabled={disabled}
                                aria-label="삭제"
                            >
                                🗑️
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default BreadSelector;
