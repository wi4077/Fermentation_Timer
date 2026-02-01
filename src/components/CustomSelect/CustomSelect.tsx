import { useState, useRef, useEffect } from 'react';
import './CustomSelect.css';

interface Option {
    value: string;
    label: string;
    emoji?: string;
}

interface CustomSelectProps {
    options: Option[];
    value: string;
    onChange: (value: string) => void;
    className?: string;
}

export function CustomSelect({ options, value, onChange, className = '' }: CustomSelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef<HTMLDivElement>(null);

    const selectedOption = options.find(opt => opt.value === value);

    // 외부 클릭 시 닫기
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (optionValue: string) => {
        onChange(optionValue);
        setIsOpen(false);
    };

    return (
        <div className={`custom-select ${className} ${isOpen ? 'open' : ''}`} ref={selectRef}>
            <button
                type="button"
                className="custom-select-trigger"
                onClick={() => setIsOpen(!isOpen)}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
            >
                <span className="custom-select-value">
                    {selectedOption?.emoji && <span className="option-emoji">{selectedOption.emoji}</span>}
                    {selectedOption?.label || '선택하세요'}
                </span>
                <span className={`custom-select-arrow ${isOpen ? 'rotate' : ''}`}>▾</span>
            </button>

            {isOpen && (
                <ul className="custom-select-dropdown" role="listbox">
                    {options.map((option) => (
                        <li
                            key={option.value}
                            className={`custom-select-option ${option.value === value ? 'selected' : ''}`}
                            onClick={() => handleSelect(option.value)}
                            role="option"
                            aria-selected={option.value === value}
                        >
                            {option.emoji && <span className="option-emoji">{option.emoji}</span>}
                            <span className="option-label">{option.label}</span>
                            {option.value === value && <span className="option-check">✓</span>}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default CustomSelect;
