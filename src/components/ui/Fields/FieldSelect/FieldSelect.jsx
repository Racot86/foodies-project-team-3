import { useState, useRef, useEffect, useId } from "react";
import clsx from "clsx";
import css from "../Fields.module.css";
import { ErrorField } from "../ErrorField/ErrorField";
import { FiChevronDown } from "react-icons/fi";
import { FiChevronUp } from "react-icons/fi";

/**
 * @param {{ 
 *   name?: any; 
 *   label?: any; 
 *   error?: any; 
 *   options?: any[]; 
 *   required?: any; 
 *   placeholder?: any; 
 *   onChange?: any; 
 *   value?: any; 
 *   className?: any; 
 *   wrapperClassName?: any; 
 *   helperText?: any; 
 *   disabled?: boolean; 
 * }} props
 */
export const FieldSelect = ({
  name,
  label,
  error,
  options = [],
  required,
  placeholder,
  onChange,
  value,
  className,
  wrapperClassName,
  helperText,
  disabled = false,
}) => {
  const fieldId = useId();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

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

  const handleOptionClick = (optionValue) => {
    if (optionValue !== value) {
      onChange && onChange(optionValue);
    }
    setIsOpen(false);
  };

  const selectedLabel =
    options.find((opt) => opt.value === value)?.label || placeholder;

  const listHeightClass = clsx({
    [css.categoriesOption]: name === "category",
    [css.areasOption]: name === "area",
    [css.ingredientsOption]: name === "ingredient",
    [css.timeOption]: name === "time",
  });

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
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleToggle();
        } else if (e.key === "Escape") {
          setIsOpen(false);
        }
      }}
    >
      {label && (
        <label htmlFor={fieldId}>
          {label}
          {required && <span aria-label="required"> *</span>}
        </label>
      )}

      <div
        className={clsx(css.selectWrapper, wrapperClassName, disabled && css.disabled)} // Apply the new prop here
        onClick={handleToggle}
        role="button"
        aria-label="Toggle select dropdown"
      >
        <div
          className={clsx(
            css.selectedValue,
            selectedLabel === placeholder && css.placeholder
          )}
        >
          {selectedLabel}
        </div>
        {isOpen ? (
          <FiChevronUp
            size={18}
            color={disabled ? "#aaa" : "black"}
            className={css.selectIcon}
          />
        ) : (
          <FiChevronDown
            size={18}
            color={disabled ? "#aaa" : "black"}
            className={css.selectIcon}
          />
        )}
      </div>

      {isOpen && !disabled && (
        <ul className={clsx(css.optionsList, listHeightClass)} role="listbox">
          {options.map((option) => (
            <li
              key={option.value}
              role="option"
              aria-selected={option.value === value}
              onClick={() => handleOptionClick(option.value)}
              className={clsx(css.option, {
                [css.selected]: value === option.value,
              })}
              tabIndex={0}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}

      {helperText && !error && <p className={css.helperText}>{helperText}</p>}
      {error && <ErrorField id={`${fieldId}-error`}>{error}</ErrorField>}
    </div>
  );
};
