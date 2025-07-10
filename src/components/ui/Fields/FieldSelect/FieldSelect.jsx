import clsx from "clsx";
import { useId } from "react";
import css from "../Fields.module.css";
import { ErrorField } from "../ErrorField/ErrorField";

export const FieldSelect = ({
  name,
  label,
  error,
  options = [],
  register,
  required,
  placeholder,
  onChange,
  value,
  className = "",
  helperText,
  disabled = false,
}) => {
  const fieldId = useId();

  const handleChange = (e) => {
    onChange && onChange(e.target.value);
  };

  return (
    <div className={clsx(css.field, className, error && css.error)}>
      {label && (
        <label htmlFor={fieldId}>
          {label}
          {required && <span aria-label="required"> *</span>}
        </label>
      )}
      <div className={css.inputWrapper}>
        <select
          id={fieldId}
          value={value}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={error ? `${fieldId}-error` : undefined}
          {...(register
            ? register(name, { required, onChange: handleChange })
            : { name, onChange: handleChange })}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((item) => (
            <option key={item.id || item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>
      {helperText && !error && <p className={css.helperText}>{helperText}</p>}
      {error && <ErrorField id={`${fieldId}-error`}>{error}</ErrorField>}
    </div>
  );
};
