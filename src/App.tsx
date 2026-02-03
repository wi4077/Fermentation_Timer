import { useState, useEffect, useCallback } from 'react';
import { TimerDisplay, Controls, StageProgress } from './components/Timer';
import { BreadSelector } from './components/BreadSelector';
import { PresetEditor } from './components/PresetEditor';
import { useMultiStageTimer } from './hooks/useTimer';
import { useCustomPresets } from './hooks/useCustomPresets';
import { usePushNotification } from './hooks/usePushNotification';
import { defaultPresets, getTotalTime, type BreadPreset } from './data/presets';
import logoImage from '/PhotoshopExtension_Image-Photoroom.png';
import './App.css';

type AppMode = 'timer' | 'editor';

function App() {
    const [mode, setMode] = useState<AppMode>('timer');
    const [selectedBread, setSelectedBread] = useState<BreadPreset>(defaultPresets[0]);
    const timer = useMultiStageTimer(selectedBread.stages);
    const { customPresets, savePreset, deletePreset } = useCustomPresets();
    const pushNotification = usePushNotification();

    // 빵 선택 시 타이머 단계 업데이트
    useEffect(() => {
        timer.setStages(selectedBread.stages);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedBread]);

    // 타이머 시작 시 푸시 알림 스케줄 저장
    const handleStart = useCallback(async () => {
        timer.start();

        // 푸시 알림 구독되어 있으면 스케줄 저장
        if (pushNotification.isSubscribed) {
            try {
                // 현재 단계부터 남은 모든 단계의 알림 스케줄
                let accumulatedTime = 0;
                for (let i = timer.currentStageIndex; i < selectedBread.stages.length; i++) {
                    accumulatedTime += selectedBread.stages[i].durationMinutes * 60;
                    const message = i < selectedBread.stages.length - 1
                        ? `${selectedBread.stages[i].name} 단계 완료!`
                        : `${selectedBread.name} 발효 완료! 🎉`;
                    await pushNotification.scheduleNotification(accumulatedTime, message);
                }
            } catch (error) {
                console.error('Failed to schedule notifications:', error);
            }
        }
    }, [timer, pushNotification, selectedBread]);

    // 타이머 리셋 시 스케줄 삭제
    const handleResetAll = useCallback(async () => {
        timer.resetAll();
        if (pushNotification.isSubscribed) {
            await pushNotification.cancelScheduledNotifications();
        }
    }, [timer, pushNotification]);

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
                    <img src={logoImage} alt="Logo" className="app-logo" />
                    <h1 className="app-title">빵 발효 타이머</h1>
                </div>
                <p className="app-subtitle">완벽한 발효를 위한 당신의 파트너</p>
            </header>

            <main className="glass-card">
                {mode === 'timer' ? (
                    <>
                        {/* 푸시 알림 구독 버튼 */}
                        {pushNotification.isSupported && !pushNotification.isSubscribed && (
                            <button
                                className="push-subscribe-btn"
                                onClick={pushNotification.subscribe}
                            >
                                🔔 알림 받기 (백그라운드에서도!)
                            </button>
                        )}
                        {pushNotification.isSubscribed && (
                            <div className="push-status">
                                ✅ 백그라운드 알림 활성화됨
                            </div>
                        )}

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
                            onStart={handleStart}
                            onPause={timer.pause}
                            onResume={timer.resume}
                            onResetStage={timer.resetStage}
                            onResetAll={handleResetAll}
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
