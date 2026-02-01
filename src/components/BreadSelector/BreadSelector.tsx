import type { BreadPreset } from '../../data/presets';
import './BreadSelector.css';

interface BreadSelectorProps {
    presets: BreadPreset[];
    selectedId: string;
    onSelect: (preset: BreadPreset) => void;
    disabled?: boolean;
}

export function BreadSelector({ presets, selectedId, onSelect, disabled }: BreadSelectorProps) {
    return (
        <div className="bread-selector">
            <h3 className="bread-selector-title">빵 종류 선택</h3>
            <div className="bread-list">
                {presets.map((preset) => (
                    <button
                        key={preset.id}
                        className={`bread-item ${selectedId === preset.id ? 'selected' : ''}`}
                        onClick={() => onSelect(preset)}
                        disabled={disabled}
                        aria-pressed={selectedId === preset.id}
                    >
                        <span className="bread-emoji">{preset.emoji}</span>
                        <span className="bread-name">{preset.name}</span>
                        <span className="bread-time">{preset.defaultTimeMinutes}분</span>
                    </button>
                ))}
            </div>
        </div>
    );
}

export default BreadSelector;
