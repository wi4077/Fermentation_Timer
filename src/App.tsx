import { useState, useEffect } from 'react';
import { TimerDisplay, Controls, StageProgress } from './components/Timer';
import { BreadSelector } from './components/BreadSelector';
import { PresetEditor } from './components/PresetEditor';
import { useMultiStageTimer } from './hooks/useTimer';
import { useCustomPresets } from './hooks/useCustomPresets';
import { defaultPresets, getTotalTime, type BreadPreset } from './data/presets';
import './App.css';

type AppMode = 'timer' | 'editor';

function App() {
    const [mode, setMode] = useState<AppMode>('timer');
    const [selectedBread, setSelectedBread] = useState<BreadPreset>(defaultPresets[0]);
    const timer = useMultiStageTimer(selectedBread.stages);
    const { customPresets, savePreset, deletePreset } = useCustomPresets();

    // 빵 선택 시 타이머 단계 업데이트
    useEffect(() => {
        timer.setStages(selectedBread.stages);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedBread]);

    const handleBreadSelect = (preset: BreadPreset) => {
        setSelectedBread(preset);
    };

    const handleCreateCustom = () => {
        setMode('editor');
    };

    const handleSavePreset = (preset: BreadPreset) => {
        savePreset(preset);
        setSelectedBread(preset);
        setMode('timer');
    };

    const handleCancelEditor = () => {
        setMode('timer');
    };

    const handleDeleteCustom = (id: string) => {
        if (confirm('이 프리셋을 삭제하시겠습니까?')) {
            deletePreset(id);
            // 삭제한 프리셋이 선택되어 있었다면 기본 프리셋으로 변경
            if (selectedBread.id === id) {
                setSelectedBread(defaultPresets[0]);
            }
        }
    };

    const isTimerActive = timer.status === 'running' || timer.status === 'paused';
    const totalMinutes = getTotalTime(selectedBread.stages);

    return (
        <div className="app animate-fadeIn">
            <header className="app-header">
                <div className="title-wrapper">
                    <img src="/PhotoshopExtension_Image-Photoroom.png" alt="Logo" className="app-logo" />
                    <h1 className="app-title">빵 발효 타이머</h1>
                </div>
                <p className="app-subtitle">완벽한 발효를 위한 당신의 파트너</p>
            </header>

            <main className="glass-card">
                {mode === 'timer' ? (
                    <>
                        <div className="selected-bread">
                            <span className="selected-emoji">{selectedBread.emoji}</span>
                            <div className="selected-info">
                                <span className="selected-name">{selectedBread.name}</span>
                                <span className="selected-total">총 {totalMinutes}분 · {selectedBread.stages.length}단계</span>
                            </div>
                        </div>

                        <StageProgress
                            stages={selectedBread.stages}
                            currentStageIndex={timer.currentStageIndex}
                            status={timer.status}
                        />

                        <TimerDisplay
                            timeLeft={timer.timeLeft}
                            progress={timer.stageProgress}
                            status={timer.status}
                            currentStage={timer.currentStage}
                        />

                        <Controls
                            status={timer.status}
                            onStart={timer.start}
                            onPause={timer.pause}
                            onResume={timer.resume}
                            onResetStage={timer.resetStage}
                            onResetAll={timer.resetAll}
                            onNextStage={timer.nextStage}
                            hasNextStage={timer.currentStageIndex < timer.totalStages - 1}
                        />

                        <BreadSelector
                            presets={defaultPresets}
                            customPresets={customPresets}
                            selectedId={selectedBread.id}
                            onSelect={handleBreadSelect}
                            onCreateCustom={handleCreateCustom}
                            onDeleteCustom={handleDeleteCustom}
                            disabled={isTimerActive}
                        />
                    </>
                ) : (
                    <PresetEditor
                        onSave={handleSavePreset}
                        onCancel={handleCancelEditor}
                    />
                )}
            </main>

            <footer className="app-footer">
                {mode === 'timer' ? (
                    <p>💡 단계가 끝나면 알림이 울리고 다음 단계로 진행할 수 있어요!</p>
                ) : (
                    <p>✨ 나만의 발효 레시피를 만들어 저장하세요!</p>
                )}
            </footer>
        </div>
    );
}

export default App;
