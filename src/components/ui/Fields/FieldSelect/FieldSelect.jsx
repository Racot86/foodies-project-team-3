import { useState, useRef, useEffect, useId } from "react";
import clsx from "clsx";
import css from "../Fields.module.css";
import { ErrorField } from "../ErrorField/ErrorField";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

export const FieldSelect = ({
  name,
  label,
  error,
  options = [],
  required,
  placeholder = "Select...",
  onChange,
  value,
  className,
  helperText,
  disabled = false,
}) => {
  const fieldId = useId();
  const containerRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);

  // Поддержка controlled компонента — если value меняется извне, обновляем inputValue
  useEffect(() => {
    const selectedOption = options.find((opt) => opt.value === value);
    setInputValue(selectedOption ? selectedOption.label : "");
  }, [value, options]);

  // Фильтруем опции при изменении ввода
  useEffect(() => {
    const filtered = options.filter((opt) =>
      opt.label.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredOptions(filtered);
  }, [inputValue, options]);

  // Закрытие селекта по клику вне
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggle = () => {
    if (!disabled) setIsOpen((prev) => !prev);
  };

  const handleOptionClick = (optionValue, optionLabel) => {
    if (optionValue !== value) {
      onChange && onChange(optionValue);
    }
    setInputValue(optionLabel);
    setIsOpen(false);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setIsOpen(true);
  };

  const handleInputFocus = () => {
    if (!disabled) setIsOpen(true);
  };

  return (
    <div
      className={clsx(
        css.field,
        className,
        error && css.error,
        disabled && css.disabled
      )}
      ref={containerRef}
      id={fieldId}
      aria-haspopup="listbox"
      aria-expanded={isOpen}
      aria-disabled={disabled}
      tabIndex={-1}
    >
      {label && (
        <label htmlFor={fieldId}>
          {label}
          {required && <span aria-label="required"> *</span>}
        </label>
      )}

      <div className={clsx(css.selectWrapper, disabled && css.disabled)}>
        <input
          id={fieldId}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          placeholder={placeholder}
          disabled={disabled}
          aria-autocomplete="list"
          aria-controls={`${fieldId}-listbox`}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-activedescendant={isOpen ? `${fieldId}-option-0` : undefined}
          autoComplete="off"
          className={clsx(css.selectedValue, !inputValue && css.placeholder)}
        />
        {isOpen ? (
          <FiChevronUp
            size={18}
            color={disabled ? "#aaa" : "black"}
            className={css.selectIcon}
            onClick={handleToggle}
            aria-hidden="true"
          />
        ) : (
          <FiChevronDown
            size={18}
            color={disabled ? "#aaa" : "black"}
            className={css.selectIcon}
            onClick={handleToggle}
            aria-hidden="true"
          />
        )}
      </div>

      {isOpen && !disabled && (
        <ul
          className={css.optionsList}
          role="listbox"
          id={`${fieldId}-listbox`}
          tabIndex={-1}
        >
          {filteredOptions.length > 0 ? (
            filteredOptions.map(
              ({ value: optionValue, label: optionLabel }, idx) => (
                <li
                  key={optionValue}
                  id={`${fieldId}-option-${idx}`}
                  role="option"
                  aria-selected={optionValue === value}
                  className={css.option}
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
            <li className={css.option} aria-disabled="true">
              No options found
            </li>
          )}
        </ul>
      )}

      {helperText && !error && <p className={css.helperText}>{helperText}</p>}
      {error && <ErrorField id={`${fieldId}-error`}>{error}</ErrorField>}
    </div>
  );
};
