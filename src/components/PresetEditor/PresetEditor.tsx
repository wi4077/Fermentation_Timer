import { useState } from 'react';
import { stageInfo, createEmptyStage, type FermentationStage, type BreadPreset, type StageType } from '../../data/presets';
import './PresetEditor.css';

interface PresetEditorProps {
    onSave: (preset: BreadPreset) => void;
    onCancel: () => void;
    initialPreset?: BreadPreset;
}

export function PresetEditor({ onSave, onCancel, initialPreset }: PresetEditorProps) {
    const [name, setName] = useState(initialPreset?.name || '');
    const [stages, setStages] = useState<FermentationStage[]>(
        initialPreset?.stages || [createEmptyStage()]
    );

    const addStage = () => {
        setStages([...stages, createEmptyStage()]);
    };

    const removeStage = (index: number) => {
        if (stages.length > 1) {
            setStages(stages.filter((_, i) => i !== index));
        }
    };

    const updateStage = (index: number, field: keyof FermentationStage, value: string | number) => {
        const updated = [...stages];
        if (field === 'id') {
            // 단계 유형 변경 시 이름과 이모지도 자동 업데이트
            const stageType = value as StageType;
            const info = stageInfo[stageType];
            if (info) {
                updated[index] = {
                    ...updated[index],
                    id: stageType,
                    name: info.name,
                    emoji: info.emoji,
                };
            }
        } else {
            updated[index] = { ...updated[index], [field]: value };
        }
        setStages(updated);
    };

    const handleSave = () => {
        if (!name.trim()) {
            alert('프리셋 이름을 입력해주세요.');
            return;
        }
        if (stages.some((s) => s.durationMinutes <= 0)) {
            alert('모든 단계의 시간을 설정해주세요.');
            return;
        }

        const preset: BreadPreset = {
            id: initialPreset?.id || `custom-${Date.now()}`,
            name: name.trim(),
            description: '나만의 발효 레시피',
            emoji: '⭐',
            stages,
            isCustom: true,
        };
        onSave(preset);
    };

    const stageTypes = Object.keys(stageInfo) as StageType[];

    return (
        <div className="preset-editor">
            <div className="editor-header">
                <h2>✨ 나만의 프리셋 만들기</h2>
            </div>

            <div className="editor-form">
                <div className="form-group">
                    <label htmlFor="preset-name">프리셋 이름</label>
                    <input
                        id="preset-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="예: 내 사워도우 레시피"
                        className="input-text"
                    />
                </div>

                <div className="stages-section">
                    <div className="stages-header">
                        <span>발효 단계</span>
                        <button type="button" className="btn-add-stage" onClick={addStage}>
                            + 단계 추가
                        </button>
                    </div>

                    <div className="stages-list">
                        {stages.map((stage, index) => (
                            <div key={index} className="stage-edit-item">
                                <span className="stage-number">{index + 1}</span>

                                <select
                                    value={stage.id}
                                    onChange={(e) => updateStage(index, 'id', e.target.value)}
                                    className="input-select"
                                >
                                    {stageTypes.map((type) => (
                                        <option key={type} value={type}>
                                            {stageInfo[type].emoji} {stageInfo[type].name}
                                        </option>
                                    ))}
                                </select>

                                <div className="time-input-group">
                                    <input
                                        type="number"
                                        min="1"
                                        value={stage.durationMinutes}
                                        onChange={(e) => updateStage(index, 'durationMinutes', parseInt(e.target.value) || 1)}
                                        className="input-number"
                                    />
                                    <span className="time-unit">분</span>
                                </div>

                                <input
                                    type="text"
                                    value={stage.description}
                                    onChange={(e) => updateStage(index, 'description', e.target.value)}
                                    placeholder="설명 (선택)"
                                    className="input-description"
                                />

                                <button
                                    type="button"
                                    className="btn-remove-stage"
                                    onClick={() => removeStage(index)}
                                    disabled={stages.length === 1}
                                    aria-label="단계 삭제"
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="editor-actions">
                <button type="button" className="btn btn-secondary" onClick={onCancel}>
                    취소
                </button>
                <button type="button" className="btn btn-primary" onClick={handleSave}>
                    💾 저장하기
                </button>
            </div>
        </div>
    );
}

export default PresetEditor;
