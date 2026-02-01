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

interface DropdownPosition {
    top: number;
    left: number;
    width: number;
}

export function CustomSelect({ options, value, onChange, className = '' }: CustomSelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [position, setPosition] = useState<DropdownPosition | null>(null);
    const selectRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const dropdownRef = useRef<HTMLUListElement>(null);

    const selectedOption = options.find(opt => opt.value === value);
    const selectedIndex = options.findIndex(opt => opt.value === value);

    // 드롭다운 위치 계산
    const updatePosition = useCallback(() => {
        if (triggerRef.current) {
            const rect = triggerRef.current.getBoundingClientRect();
            setPosition({
                top: rect.bottom + 6,
                left: rect.left,
                width: rect.width,
            });
        }
    }, []);

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

    // 열릴 때 위치 계산 및 스크롤 시 위치 업데이트
    useEffect(() => {
        if (isOpen) {
            updatePosition();
            window.addEventListener('scroll', updatePosition, true);
            window.addEventListener('resize', updatePosition);
            return () => {
                window.removeEventListener('scroll', updatePosition, true);
                window.removeEventListener('resize', updatePosition);
            };
        }
    }, [isOpen, updatePosition]);

    // 드롭다운 열릴 때 선택된 항목으로 스크롤
    useEffect(() => {
        if (isOpen && dropdownRef.current && selectedIndex >= 0) {
            const optionHeight = 42;
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

    const handleToggle = () => {
        if (!isOpen) {
            updatePosition();
        }
        setIsOpen(!isOpen);
    };

    return (
        <div className={`custom-select ${className} ${isOpen ? 'open' : ''}`} ref={selectRef}>
            <button
                ref={triggerRef}
                type="button"
                className="custom-select-trigger"
                onClick={handleToggle}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
            >
                <span className="custom-select-value">
                    {selectedOption?.emoji && <span className="option-emoji">{selectedOption.emoji}</span>}
                    {selectedOption?.label || '선택하세요'}
                </span>
                <span className={`custom-select-arrow ${isOpen ? 'rotate' : ''}`}>▾</span>
            </button>

            {isOpen && position && (
                <ul
                    className="custom-select-dropdown"
                    role="listbox"
                    ref={dropdownRef}
                    onWheel={handleWheel}
                    style={{
                        position: 'fixed',
                        top: position.top,
                        left: position.left,
                        width: position.width,
                    }}
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
