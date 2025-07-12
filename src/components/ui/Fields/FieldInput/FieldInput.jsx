import clsx from "clsx";
import { useId, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import css from "../Fields.module.css";
import { ErrorField } from "@components/ui/index.js";
import { useFormikContext } from "formik";

export const FieldInput = ({
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
  inputStyle,
  type = "text",
  className = "",
  helperText,
  disabled = false,
}) => {
  const [defaultType, setDefaultType] = useState(type);
  const fieldId = useId();
  const defaultMaxLength = maxLength && parseInt(maxLength, 10);
  const withExtra = type === "password" || !!maxLength;

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

  // Визначаємо фінальну помилку
  const inputError = error || (formikTouched && formikError);

  const handleOnChange = (event) => {
    const { value } = event.target;

    // Оновлюємо Formik значення
    if (name && formikSetFieldValue) {
      formikSetFieldValue(name, value);
    }

    // Викликаємо кастомний onChange якщо є
    if (onChange) {
      onChange(value);
    }
  };

  const handleOnBlur = () => {
    // Позначаємо поле як touched в Formik
    if (name && formikSetFieldTouched) {
      formikSetFieldTouched(name, true);
    }
  };

  const renderInput = () => {
    const defaultProps = {
      placeholder,
      maxLength: defaultMaxLength,
      disabled,
      "aria-invalid": inputError ? "true" : "false",
      "aria-describedby": inputError ? `${fieldId}-error` : undefined,
      id: fieldId,
      value: inputValue,
      type: defaultType,
      onChange: handleOnChange,
      onBlur: handleOnBlur,
    };

    // Якщо є Formik context і name, додаємо required з валідації
    if (formikContext && name) {
      const fieldMeta = formikContext.getFieldMeta?.(name);
      defaultProps.required = required || fieldMeta?.required;
    }

    return <input {...defaultProps} style={inputStyle} />;
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
          tabIndex={disabled ? -1 : 0}
        >
          {isPassword(defaultType) ? <FiEye /> : <FiEyeOff />}
        </button>
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
        inputError && css.error,
        withExtra && css.withExtra,
        disabled && css.disabled
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
      {helperText && !inputError && (
        <p className={css.helperText}>{helperText}</p>
      )}
      {inputError && (
        <ErrorField id={`${fieldId}-error`}>{inputError}</ErrorField>
      )}
    </div>
  );
};
