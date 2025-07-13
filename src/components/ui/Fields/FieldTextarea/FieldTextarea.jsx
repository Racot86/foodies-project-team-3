import clsx from "clsx";
import { useId, useState, useEffect, useCallback } from "react";
import css from "../Fields.module.css";
import { ErrorField } from "../ErrorField/ErrorField";
import { useBreakpoint } from "../../../../hooks/useBreakpoint";

export const FieldTextarea = ({
  name,
  label,
  required,
  placeholder,
  maxLength,
  onChange,
  onBlur,
  error,
  strong,
  value = "",
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

  const calcRows = useCallback(
    (len) => {
      if (isMobile || isTablet) return minRows;
      return Math.min(maxRows, Math.max(minRows, Math.ceil(len / expandAt)));
    },
    [maxRows, minRows, expandAt, isMobile, isTablet]
  );

  const [counter, setCounter] = useState(value.length);
  const [rows, setRows] = useState(calcRows(value.length));
  const [limitReached, setLimitReached] = useState(false);

  const chunkify = (str) => {
    if (isMobile || isTablet) return str;
    const plain = str.replace(/\n/g, "");
    const parts = plain.match(new RegExp(`.{1,${expandAt}}`, "g")) || [""];
    return parts.join("\n");
  };

  useEffect(() => {
    const plainLen = value.replace(/\n/g, "").length;
    setCounter(plainLen);
    setRows(calcRows(plainLen));
  }, [value, calcRows]);

  const handleOnChange = (event) => {
    const raw = event.target.value;
    const formatted = chunkify(raw);
    const plainLen = formatted.replace(/\n/g, "").length;

    if (defaultMaxLength && plainLen > defaultMaxLength) {
      setLimitReached(true);
      setTimeout(() => setLimitReached(false), 3000);
      return;
    }

    if (limitReached) setLimitReached(false);

    setCounter(plainLen);
    setRows(calcRows(plainLen));

    if (onChange) onChange(formatted);
  };

  const renderTextarea = () => (
    <textarea
      name={name}
      id={fieldId}
      placeholder={placeholder}
      disabled={disabled}
      value={value}
      onChange={handleOnChange}
      onBlur={onBlur}
      aria-invalid={error ? "true" : "false"}
      aria-describedby={error ? `${fieldId}-error` : undefined}
      rows={rows}
      required={required}
    />
  );

  const renderExtra = () =>
    maxLength && (
      <span className={css.count}>
        <span
          className={clsx(
            css.count_active,
            counter > defaultMaxLength && css.count_error
          )}
        >
          {counter}
        </span>
        / {defaultMaxLength}
      </span>
    );

  return (
    <div
      className={clsx(
        css.field,
        css.fieldTextarea,
        style && css[style],
        className,
        strong && css.strong,
        error && css.error,
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

      {helperText && !error && !limitReached && (
        <p className={css.helperText}>{helperText}</p>
      )}
      {limitReached && (
        <ErrorField id={`${fieldId}-error`}>
          Character limit reached ({defaultMaxLength} characters maximum)
        </ErrorField>
      )}
      {error && <ErrorField id={`${fieldId}-error`}>{error}</ErrorField>}
    </div>
  );
};
