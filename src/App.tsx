import { useState, useEffect } from 'react';
import { TimerDisplay, Controls, StageProgress } from './components/Timer';
import { BreadSelector } from './components/BreadSelector';
import { useMultiStageTimer } from './hooks/useTimer';
import { breadPresets, getTotalTime, type BreadPreset } from './data/presets';
import './App.css';

function App() {
    const [selectedBread, setSelectedBread] = useState<BreadPreset>(breadPresets[0]);
    const timer = useMultiStageTimer(selectedBread.stages);

    // 빵 선택 시 타이머 단계 업데이트
    useEffect(() => {
        timer.setStages(selectedBread.stages);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedBread]);

    const handleBreadSelect = (preset: BreadPreset) => {
        setSelectedBread(preset);
    };

    const isTimerActive = timer.status === 'running' || timer.status === 'paused';
    const totalMinutes = getTotalTime(selectedBread.stages);

    return (
        <div className="app animate-fadeIn">
            <header className="app-header">
                <h1 className="app-title">🍞 빵 발효 타이머</h1>
                <p className="app-subtitle">완벽한 발효를 위한 당신의 파트너</p>
            </header>

            <main className="glass-card">
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
                    presets={breadPresets}
                    selectedId={selectedBread.id}
                    onSelect={handleBreadSelect}
                    disabled={isTimerActive}
                />
            </main>

            <footer className="app-footer">
                <p>💡 단계가 끝나면 알림이 울리고 다음 단계로 진행할 수 있어요!</p>
            </footer>
        </div>
    );
}

export default App;
