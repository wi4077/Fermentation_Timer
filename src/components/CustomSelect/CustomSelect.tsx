import { useState, useRef, useEffect, useCallback } from 'react';
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
    const dropdownRef = useRef<HTMLUListElement>(null);

    const selectedOption = options.find(opt => opt.value === value);
    const selectedIndex = options.findIndex(opt => opt.value === value);

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

    // 드롭다운 열릴 때 선택된 항목으로 스크롤
    useEffect(() => {
        if (isOpen && dropdownRef.current && selectedIndex >= 0) {
            const optionHeight = 40; // 대략적인 옵션 높이
            dropdownRef.current.scrollTop = Math.max(0, (selectedIndex - 2) * optionHeight);
        }
    }, [isOpen, selectedIndex]);

    // 스크롤 이벤트가 부모로 전파되지 않도록
    const handleWheel = useCallback((e: React.WheelEvent) => {
        const dropdown = dropdownRef.current;
        if (!dropdown) return;

        const { scrollTop, scrollHeight, clientHeight } = dropdown;
        const isScrollingUp = e.deltaY < 0;
        const isScrollingDown = e.deltaY > 0;

        // 스크롤 끝에 도달했을 때만 전파 방지
        if ((isScrollingUp && scrollTop <= 0) ||
            (isScrollingDown && scrollTop + clientHeight >= scrollHeight)) {
            e.preventDefault();
        }
        e.stopPropagation();
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
                <ul
                    className="custom-select-dropdown"
                    role="listbox"
                    ref={dropdownRef}
                    onWheel={handleWheel}
                >
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
