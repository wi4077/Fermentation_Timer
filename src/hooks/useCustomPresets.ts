import { useState, useEffect, useCallback } from 'react';
import type { BreadPreset } from '../data/presets';

const STORAGE_KEY = 'fermentation-timer-custom-presets';

interface UseCustomPresetsReturn {
    customPresets: BreadPreset[];
    savePreset: (preset: BreadPreset) => void;
    deletePreset: (id: string) => void;
    updatePreset: (preset: BreadPreset) => void;
}

export function useCustomPresets(): UseCustomPresetsReturn {
    const [customPresets, setCustomPresets] = useState<BreadPreset[]>([]);

    // localStorage에서 불러오기
    useEffect(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                const parsed = JSON.parse(saved);
                if (Array.isArray(parsed)) {
                    setCustomPresets(parsed);
                }
            }
        } catch (e) {
            console.error('Failed to load custom presets:', e);
        }
    }, []);

    // localStorage에 저장
    const persistPresets = useCallback((presets: BreadPreset[]) => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(presets));
        } catch (e) {
            console.error('Failed to save custom presets:', e);
        }
    }, []);

    const savePreset = useCallback((preset: BreadPreset) => {
        const newPreset = { ...preset, isCustom: true };
        setCustomPresets((prev) => {
            const updated = [...prev, newPreset];
            persistPresets(updated);
            return updated;
        });
    }, [persistPresets]);

    const deletePreset = useCallback((id: string) => {
        setCustomPresets((prev) => {
            const updated = prev.filter((p) => p.id !== id);
            persistPresets(updated);
            return updated;
        });
    }, [persistPresets]);

    const updatePreset = useCallback((preset: BreadPreset) => {
        setCustomPresets((prev) => {
            const updated = prev.map((p) => (p.id === preset.id ? preset : p));
            persistPresets(updated);
            return updated;
        });
    }, [persistPresets]);

    return {
        customPresets,
        savePreset,
        deletePreset,
        updatePreset,
    };
}
