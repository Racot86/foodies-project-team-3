// src/components/ui/FieldTextarea/FieldTextarea.jsx
import clsx from "clsx";
import { useId, useState, useEffect, useCallback } from "react";
import css from "../Fields.module.css";
import { ErrorField } from "../ErrorField/ErrorField";
import { useFormikContext } from "formik";
import { useBreakpoint } from "../../../../hooks/useBreakpoint";

export const FieldTextarea = ({
  name,
  label,
  required,
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
  minRows = 1,
  maxRows = 10,
  expandAt = 60,
}) => {
  const fieldId = useId();
  const defaultMaxLength = maxLength && parseInt(maxLength, 10);
  const { isMobile, isTablet } = useBreakpoint();

  // Отримуємо Formik context
  const formikContext = useFormikContext();

  // Визначаємо значення та методи з Formik
  const formikValue = formikContext?.values?.[name];
  const formikSetFieldValue = formikContext?.setFieldValue;
  const formikSetFieldTouched = formikContext?.setFieldTouched;
  const formikTouched = formikContext?.touched?.[name];
  const formikError = formikContext?.errors?.[name];

  // Визначаємо фінальне значення
  const inputValue = value !== undefined ? value : formikValue || "";

  const calcRows = useCallback(
    (len) => {
      // For mobile and tablet, use natural textarea behavior without artificial row calculation
      if (isMobile || isTablet) {
        return minRows; // Use minimum rows, let CSS handle auto-resize
      }
      return Math.min(maxRows, Math.max(minRows, Math.ceil(len / expandAt)));
    },
    [maxRows, minRows, expandAt, isMobile, isTablet]
  );
  const [counter, setCounter] = useState(inputValue.length);
  const [rows, setRows] = useState(calcRows(inputValue.length));
  const [limitReached, setLimitReached] = useState(false);

  // Визначаємо фінальну помилку
  const inputError = error || (formikTouched && formikError);

  function chunkify(str) {
    // Disable expandAt functionality for mobile and tablet
    if (isMobile || isTablet) {
      return str; // Return text as-is without chunking
    }

    const plain = str.replace(/\n/g, "");
    const parts = plain.match(new RegExp(`.{1,${expandAt}}`, "g")) || [""];
    return parts.join("\n");
  }

  useEffect(() => {
    const plainLen = inputValue.replace(/\n/g, "").length;
    setCounter(plainLen);
    setRows(calcRows(plainLen));
  }, [inputValue, calcRows]);

  const handleOnChange = (event) => {
    const raw = event.target.value;
    const formatted = chunkify(raw);

    const plainLen = formatted.replace(/\n/g, "").length;

    // Block input if we have a maxLength and would exceed it
    if (defaultMaxLength && plainLen > defaultMaxLength) {
      // Show notification that limit is reached
      setLimitReached(true);

      // Hide notification after 3 seconds
      setTimeout(() => {
        setLimitReached(false);
      }, 3000);

      return; // Don't update anything if limit exceeded
    }

    // Clear limit reached state if we're under the limit
    if (limitReached) {
      setLimitReached(false);
    }

    setCounter(plainLen);
    setRows(calcRows(plainLen));

    // Оновлюємо Formik значення
    if (name && formikSetFieldValue) {
      formikSetFieldValue(name, formatted);
    }

    // Викликаємо кастомний onChange якщо є
    if (onChange) {
      onChange(formatted);
    }
  };

  const handleOnBlur = () => {
    // Позначаємо поле як touched в Formik
    if (name && formikSetFieldTouched) {
      formikSetFieldTouched(name, true);
    }
  };

  const renderTextarea = () => {
    const defaultProps = {
      id: fieldId,
      placeholder,
      disabled,
      value: inputValue,
      onChange: handleOnChange,
      onBlur: handleOnBlur,
      "aria-invalid": inputError ? "true" : "false",
      "aria-describedby": inputError ? `${fieldId}-error` : undefined,
      rows: rows,
    };

    // Якщо є Formik context і name, додаємо required з валідації
    if (formikContext && name) {
      const fieldMeta = formikContext.getFieldMeta?.(name);
      defaultProps.required = required || fieldMeta?.required;
    }

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
        defaultMaxLength && css.withExtra,
        disabled && css.disabled
      )}
    >
      {label && (
        <label htmlFor={fieldId}>
          {label}
          {required && <span aria-label="required"> *</span>}
        </label>
      )}

      <div
        className={clsx(css.inputWrapper, defaultMaxLength && css.withExtra)}
      >
        {renderTextarea()}
        {defaultMaxLength && <div className={css.extra}>{renderExtra()}</div>}
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
