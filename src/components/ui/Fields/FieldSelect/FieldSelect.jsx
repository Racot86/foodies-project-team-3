import { useState, useRef, useEffect, useId } from "react";
import clsx from "clsx";
import css from "../Fields.module.css";
import { ErrorField } from "../ErrorField/ErrorField";
import { FiChevronDown, FiChevronUp, FiX } from "react-icons/fi";

export const FieldSelect = ({
  selectWrapperClassName,
  optionsListClassName,
  selectedValueClassName,
  name,
  label,
  error,
  options = [],
  required,
  placeholder = "Select...",
  onChange,
  value,
  className,
  wrapperClassName,
  helperText,
  disabled = false,
}) => {
  const fieldId = useId();
  const containerRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);

  useEffect(() => {
    const selectedOption = options.find((opt) => opt.value === value);
    setInputValue(selectedOption ? selectedOption.label : "");
  }, [value, options]);

  useEffect(() => {
    const filtered = options.filter((opt) =>
      opt.label.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredOptions(filtered);
  }, [inputValue, options]);

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
      onChange && onChange(optionValue);
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

  const listHeightClass = clsx({
    [css.categoriesOption]: name === "category",
    [css.areasOption]: name === "area",
    [css.ingredientsOption]: name === "ingredient",
    [css.timeOption]: name === "time",
  });

  return (
    <div
      className={`${clsx(css.field, error && css.error, disabled && css.disabled)} ${className || ''} ${wrapperClassName || ''}`.trim()}
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

      <div className={clsx(css.selectWrapper, selectWrapperClassName, disabled && css.disabled)}>
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
          className={clsx(css.selectedValue, selectedValueClassName, !inputValue && css.placeholder)}
        />

        {inputValue && !disabled && (
          <FiX
            size={18}
            className={css.clearIcon}
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
            color={disabled ? "#aaa" : "black"}
            className={css.selectIcon}
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
            }}
            aria-hidden="true"
          />
        ) : (
          <FiChevronDown
            size={18}
            color={disabled ? "#aaa" : "black"}
            className={css.selectIcon}
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(true);
            }}
            aria-hidden="true"
          />
        )}
      </div>

      <ul
          className={clsx(
            css.optionsList,
            optionsListClassName,
            listHeightClass,
            (!isOpen || disabled) && css.optionsListHidden
          )}
          role="listbox"
          id={`${fieldId}-listbox`}
          tabIndex={-1}
          aria-hidden={!isOpen || disabled}
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
                  tabIndex={isOpen && !disabled ? 0 : -1}
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

      {helperText && !error && <p className={css.helperText}>{helperText}</p>}
      {error && <ErrorField id={`${fieldId}-error`}>{error}</ErrorField>}
    </div>
  );
};
