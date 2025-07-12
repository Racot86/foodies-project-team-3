// src/components/ui/FieldTextarea/FieldTextarea.jsx
import clsx from "clsx";
import { useId, useState, useEffect, useRef, useCallback } from "react";
import css from "../Fields.module.css";
import { ErrorField } from "../ErrorField/ErrorField";
import { useFormikContext } from "formik";
import { useBreakpoint } from "../../../../hooks/useBreakpoint";

export const FieldTextarea = ({
  name,
  label,
  placeholder,
  maxLength,
  onChange,
  error,
  strong,
  value,
  style = "default",
  className = "",
  helperText,
  disabled = false,
}) => {
  const fieldId = useId();
  const defaultMaxLength = maxLength && parseInt(maxLength, 10);
  const { isMobile, isTablet } = useBreakpoint();
  const textareaRef = useRef(null);

  // Отримуємо Formik context
  const formikContext = useFormikContext();

  // Визначаємо значення та методи з Formik
  const formikValue = formikContext?.values?.[name];
  const formikSetFieldValue = formikContext?.setFieldValue;
  const formikSetFieldTouched = formikContext?.setFieldTouched;
  const formikTouched = formikContext?.touched?.[name];
  const formikError = formikContext?.errors?.[name];

  // Визначаємо фінальне значення
  const inputValue = formikValue || value || "";

  const [counter, setCounter] = useState(0);
  const [limitReached, setLimitReached] = useState(false);

  // Визначаємо фінальну помилку
  const inputError = error || (formikTouched && formikError);

  function chunkify(str) {
    // Disable expandAt functionality for mobile and tablet
    if (isMobile || isTablet) {
      return str; // Return text as-is without chunking
    }
    // For desktop, return the string as-is (you can add chunking logic here if needed)
    return str;
  }

  // Improved auto-resize textarea function
  const autoResize = useCallback(() => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      const maxHeight = 120;

      if (isMobile || isTablet) {
        // Mobile: Auto-grow functionality
        textarea.style.height = "auto";
        textarea.style.overflow = "hidden";

        const scrollHeight = textarea.scrollHeight;

        if (scrollHeight <= maxHeight) {
          textarea.style.height = `${Math.max(scrollHeight, 56)}px`;
          textarea.style.overflowY = "hidden";
        } else {
          textarea.style.height = `${maxHeight}px`;
          textarea.style.overflowY = "auto";
        }
      } else {
        // Desktop: Check if content overflows the fixed height
        const scrollHeight = textarea.scrollHeight;
        const currentHeight = 56; // Fixed height for desktop

        if (scrollHeight > currentHeight) {
          textarea.style.overflowY = "auto";
        } else {
          textarea.style.overflowY = "hidden";
        }
      }
    }
  }, [isMobile, isTablet]);

  useEffect(() => {
    const plainLen = inputValue ? inputValue.replace(/\n/g, "").length : 0;
    setCounter(plainLen);

    // Use requestAnimationFrame for better performance
    requestAnimationFrame(() => {
      autoResize();
    });
  }, [inputValue, isMobile, isTablet, autoResize]);

  useEffect(() => {
    autoResize();
  }, [isMobile, isTablet, autoResize]);

  const handleOnChange = (event) => {
    const raw = event.target.value;
    const formatted = chunkify(raw);
    const plainLen = formatted.replace(/\n/g, "").length;

    // Block input if we have a maxLength and would exceed it
    if (defaultMaxLength && plainLen > defaultMaxLength) {
      if (formatted.length >= (inputValue || "").length) {
        setLimitReached(true);
        return;
      }
      return;
    }

    // If limit is reached, block adding new lines (Enter key)
    if (defaultMaxLength && plainLen === defaultMaxLength) {
      // If the new value has more newlines than the previous value, block it
      const prevNewlines = (inputValue.match(/\n/g) || []).length;
      const newNewlines = (formatted.match(/\n/g) || []).length;
      if (newNewlines > prevNewlines) {
        setLimitReached(true);
        return;
      }
    }

    // Clear limit reached state if we're under the limit
    if (limitReached) {
      setLimitReached(false);
    }

    setCounter(plainLen);

    // Оновлюємо Formik значення
    if (name && formikSetFieldValue) {
      formikSetFieldValue(name, formatted);
    }

    // Викликаємо кастомний onChange якщо є
    if (onChange) {
      onChange(formatted);
    }

    // Auto-resize immediately on input for better UX
    requestAnimationFrame(() => {
      autoResize();
    });
  };

  const handleOnBlur = () => {
    if (name && formikSetFieldTouched) {
      formikSetFieldTouched(name, true);
    }
  };

  const renderTextarea = () => {
    const defaultProps = {
      id: fieldId,
      ref: textareaRef,
      placeholder,
      disabled,
      value: inputValue,
      onChange: handleOnChange,
      onBlur: handleOnBlur,
      "aria-invalid": inputError ? "true" : "false",
      "aria-describedby": inputError ? `${fieldId}-error` : undefined,
    };

    return <textarea {...defaultProps} />;
  };

  const renderExtra = () => {
    if (maxLength) {
      return (
        <span className={css.count}>
          <span
            className={clsx(
              css.count_active,
              counter > defaultMaxLength && css.count_error
            )}
          >
            {counter}
          </span>{" "}
          / {defaultMaxLength}
        </span>
      );
    }
  };

  return (
    <div
      className={clsx(
        css.field,
        css.fieldTextarea,
        style && css[style],
        className,
        strong && css.strong,
        inputError && css.error,
        disabled && css.disabled
      )}
    >
      {label && <label htmlFor={fieldId}>{label}</label>}

      <div
        className={clsx(css.textAreaWrapper, defaultMaxLength && css.withExtra)}
      >
        {renderTextarea()}
        {defaultMaxLength && (
          <div className={css.textareaCountWrapper}>{renderExtra()}</div>
        )}
      </div>

      {helperText && !inputError && !limitReached && (
        <p className={css.helperText}>{helperText}</p>
      )}
      {limitReached && (
        <ErrorField
          id={`${fieldId}-error`}
        >{`Character limit reached (${defaultMaxLength} characters maximum)`}</ErrorField>
      )}
      {inputError && (
        <ErrorField id={`${fieldId}-error`}>{inputError}</ErrorField>
      )}
    </div>
  );
};
