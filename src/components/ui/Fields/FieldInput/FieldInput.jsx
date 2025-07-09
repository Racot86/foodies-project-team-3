import clsx from "clsx";
import { useId, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import css from "../Fields.module.css";
import { ErrorField } from "../ErrorField/ErrorField";

export const FieldInput = ({
  name,
  label,
  register,
  required,
  placeholder,
  maxLength,
  onChange,
  error,
  strong,
  value,
  style = "default",
  type = "text",
  className = "",
  helperText,
  disabled = false,
}) => {
  const [count, setCount] = useState(0);
  const [defaultType, setDefaultType] = useState(type);
  const fieldId = useId();
  const defaultMaxLength = maxLength && parseInt(maxLength, 10);
  const withExtra = type === "password" || !!maxLength;

  const handleOnChange = (event) => {
    const { value } = event.target;
    maxLength && setCount(value.length);
    onChange && onChange(value);
  };

  const renderInput = () => {
    const defaultProps = {
      placeholder,
      maxLength: defaultMaxLength,
      disabled,
      "aria-invalid": error ? "true" : "false",
      "aria-describedby": error ? `${fieldId}-error` : undefined,
      id: fieldId,
    };

    if (register) {
      const { onChange: regOnChange, ...field } = register(name, {
        required,
      });

      return (
        <input
          value={value}
          type={defaultType}
          {...field}
          onChange={(e) => {
            regOnChange(e);
            handleOnChange(e);
          }}
          {...defaultProps}
        />
      );
    }

    return (
      <input
        value={value}
        type={defaultType}
        onChange={handleOnChange}
        {...defaultProps}
      />
    );
  };

  const isPassword = (type) => type === "password";

  const showPassword = () => {
    if (isPassword(defaultType)) {
      setDefaultType("text");
    } else {
      setDefaultType(type);
    }
  };

  const renderExtra = () => {
    if (type === "password") {
      return (
        <button
          type="button"
          onClick={showPassword}
          className={css.showPassword}
          aria-label={
            isPassword(defaultType) ? "Show password" : "Hide password"
          }
        >
          {isPassword(defaultType) ? <FiEye /> : <FiEyeOff />}
        </button>
      );
    }

    if (maxLength) {
      return (
        <span className={css.count}>
          {count} / {defaultMaxLength}
        </span>
      );
    }
  };

  return (
    <div
      className={clsx(
        css.field,
        style && css[style],
        className,
        strong && css.strong,
        error && css.error,
        withExtra && css.withExtra
      )}
    >
      {label && (
        <label htmlFor={fieldId}>
          {label}
          {required && <span aria-label="required"> *</span>}
        </label>
      )}
      <div className={clsx(css.inputWrapper, withExtra && css.withExtra)}>
        {renderInput()}
        {withExtra && <div className={css.extra}>{renderExtra()}</div>}
      </div>
      {helperText && !error && <p className={css.helperText}>{helperText}</p>}
      {error && <ErrorField id={`${fieldId}-error`}>{error}</ErrorField>}
    </div>
  );
};
