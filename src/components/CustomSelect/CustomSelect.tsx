import { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
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
    const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});
    const selectRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const dropdownRef = useRef<HTMLUListElement>(null);

    const selectedOption = options.find(opt => opt.value === value);
    const selectedIndex = options.findIndex(opt => opt.value === value);

    // 드롭다운 위치 계산
    const updatePosition = useCallback(() => {
        if (triggerRef.current) {
            const rect = triggerRef.current.getBoundingClientRect();
            setDropdownStyle({
                position: 'fixed',
                top: `${rect.bottom + 6}px`,
                left: `${rect.left}px`,
                width: `${rect.width}px`,
            });
        }
    }, []);

    // 외부 클릭 시 닫기
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            if (selectRef.current && !selectRef.current.contains(target) &&
                dropdownRef.current && !dropdownRef.current.contains(target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [isOpen]);

    // 열릴 때 위치 계산
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

    // 드롭다운을 Portal로 body에 렌더링
    const dropdown = isOpen ? createPortal(
        <ul
            className="custom-select-dropdown"
            role="listbox"
            ref={dropdownRef}
            style={dropdownStyle}
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
        </ul>,
        document.body
    ) : null;

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
            {dropdown}
        </div>
    );
}

export default CustomSelect;
