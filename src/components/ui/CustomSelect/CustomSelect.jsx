import {useEffect, useId, useRef, useState} from "react";
import {FiChevronDown, FiChevronUp, FiX} from "react-icons/fi";
import styles from "./CustomSelect.module.css";

const CustomSelect = ({
                          options = [],
                          placeholder = "Select...",
                          onChange,
                          value,
                          className,
                          disabled = false,
                      }) => {
    const fieldId = useId();
    const containerRef = useRef(null);

    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [filteredOptions, setFilteredOptions] = useState(options);

    // Update input value when value or options change
    useEffect(() => {
        const selectedOption = options.find((opt) => opt.value === value);
        setInputValue(selectedOption ? selectedOption.label : "");
    }, [value, options]);

    // Filter options based on input value
    useEffect(() => {
        const filtered = options.filter((opt) =>
            opt.label.toLowerCase().includes(inputValue.toLowerCase())
        );
        setFilteredOptions(filtered);
    }, [inputValue, options]);

    // Handle clicks outside the component
    useEffect(() => {
        function handleClickOutside(event) {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        }

        function handleKeyDown(event) {
            if (event.key === "Escape") {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    const toggleOpen = () => {
        if (!disabled) setIsOpen((prev) => !prev);
    };

    const handleOptionClick = (optionValue, optionLabel) => {
        if (optionValue !== value) {
            onChange && onChange({value: optionValue, label: optionLabel});
        }
        setInputValue(optionLabel);
        setIsOpen(false);
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        setIsOpen(true);
    };

    const handleClear = () => {
        setInputValue("");
        onChange && onChange("");
        setIsOpen(false);
    };

    return (
        <div
            className={`${styles.customSelect} ${className || ""} ${disabled ? styles.disabled : ""}`}
            ref={containerRef}
            id={fieldId}
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            aria-disabled={disabled}
            tabIndex={-1}
        >
            <div className={styles.selectWrapper}>
                <input
                    id={fieldId}
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleOpen();
                    }}
                    placeholder={placeholder}
                    disabled={disabled}
                    aria-autocomplete="list"
                    aria-controls={`${fieldId}-listbox`}
                    aria-expanded={isOpen}
                    aria-haspopup="listbox"
                    aria-activedescendant={isOpen ? `${fieldId}-option-0` : undefined}
                    autoComplete="off"
                    className={`${styles.selectedValue} ${!inputValue ? styles.placeholder : ""}`}
                />

                {inputValue && !disabled && (
                    <FiX
                        size={18}
                        className={styles.clearIcon}
                        onClick={(e) => {
                            e.stopPropagation();
                            handleClear();
                        }}
                        aria-label="Clear input"
                    />
                )}

                {isOpen ? (
                    <FiChevronUp
                        size={18}
                        className={styles.selectIcon}
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsOpen(false);
                        }}
                        aria-hidden="true"
                    />
                ) : (
                    <FiChevronDown
                        size={18}
                        className={styles.selectIcon}
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsOpen(true);
                        }}
                        aria-hidden="true"
                    />
                )}
            </div>

            {isOpen && !disabled && (
                <ul
                    className={styles.optionsList}
                    role="listbox"
                    id={`${fieldId}-listbox`}
                    tabIndex={-1}
                >
                    {filteredOptions.length > 0 ? (
                        filteredOptions.map(
                            ({value: optionValue, label: optionLabel}, idx) => (
                                <li
                                    key={`${optionValue}-${idx}`}
                                    id={`${fieldId}-option-${idx}`}
                                    role="option"
                                    aria-selected={optionValue === value}
                                    className={styles.option}
                                    onClick={() => handleOptionClick(optionValue, optionLabel)}
                                    tabIndex={0}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" || e.key === " ") {
                                            e.preventDefault();
                                            handleOptionClick(optionValue, optionLabel);
                                        }
                                    }}
                                >
                                    {optionLabel}
                                </li>
                            )
                        )
                    ) : (
                        <li className={styles.option} aria-disabled="true">
                            No options found
                        </li>
                    )}
                </ul>
            )}
        </div>
    );
};

export default CustomSelect;
