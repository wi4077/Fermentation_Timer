import { useState } from 'react';
import { TimerDisplay, Controls } from './components/Timer';
import { BreadSelector } from './components/BreadSelector';
import { useTimer } from './hooks/useTimer';
import { breadPresets, type BreadPreset } from './data/presets';
import './App.css';

function App() {
    const [selectedBread, setSelectedBread] = useState<BreadPreset>(breadPresets[0]);
    const timer = useTimer(selectedBread.defaultTimeMinutes);

    const handleBreadSelect = (preset: BreadPreset) => {
        setSelectedBread(preset);
        timer.setMinutes(preset.defaultTimeMinutes);
    };

    const isTimerActive = timer.status === 'running' || timer.status === 'paused';

    return (
        <div className="app animate-fadeIn">
            <header className="app-header">
                <h1 className="app-title">🍞 빵 발효 타이머</h1>
                <p className="app-subtitle">완벽한 발효를 위한 당신의 파트너</p>
            </header>

            <main className="glass-card">
                <div className="selected-bread">
                    <span className="selected-emoji">{selectedBread.emoji}</span>
                    <span className="selected-name">{selectedBread.name}</span>
                </div>

                <TimerDisplay
                    timeLeft={timer.timeLeft}
                    progress={timer.progress}
                    status={timer.status}
                />

                <Controls
                    status={timer.status}
                    onStart={timer.start}
                    onPause={timer.pause}
                    onResume={timer.resume}
                    onReset={timer.reset}
                />

                <BreadSelector
                    presets={breadPresets}
                    selectedId={selectedBread.id}
                    onSelect={handleBreadSelect}
                    disabled={isTimerActive}
                />
            </main>

            <footer className="app-footer">
                <p>발효 중엔 따뜻하고 습한 곳에 반죽을 두세요 🌡️</p>
            </footer>
        </div>
    );
}

export default App;
