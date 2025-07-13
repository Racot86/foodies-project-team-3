import clsx from "clsx";
import { useId, useState, useCallback } from "react";
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
                             type = "text",
                             className = "",
                             helperText,
                             disabled = false,
                             ...rest // для додаткових пропсів (наприклад, ref)
                           }) => {
  const [defaultType, setDefaultType] = useState(type);
  const fieldId = useId();
  const defaultMaxLength = maxLength && parseInt(maxLength, 10);
  const withExtra = type === "password" || !!maxLength;

  // Formik integration
  const formikContext = useFormikContext();
  const formikValue = formikContext?.values?.[name];
  const formikSetFieldValue = formikContext?.setFieldValue;
  const formikSetFieldTouched = formikContext?.setFieldTouched;
  const formikTouched = formikContext?.touched?.[name];
  const formikError = formikContext?.errors?.[name];

  // Визначаємо фінальне значення
  const inputValue = formikValue || value || "";
  // Визначаємо фінальну помилку
  const inputError = error || (formikTouched && formikError);

  const handleOnChange = useCallback(
      (event) => {
        const { value } = event.target;

        // Оновлюємо Formik значення
        if (name && formikSetFieldValue) {
          formikSetFieldValue(name, value);
        }

        // Викликаємо кастомний onChange якщо є
        if (onChange) {
          onChange(value);
        }
      },
      [name, formikSetFieldValue, onChange]
  );

  // FIXED: Add onFocus handler to clear errors
  const handleOnFocus = useCallback(() => {
    // Clear error on focus - same as FieldTextarea
    if (name && formikSetFieldTouched) {
      formikSetFieldTouched(name, false);
    }
  }, [name, formikSetFieldTouched]);

  // FIXED: Update onBlur handler
  const handleOnBlur = useCallback(() => {
    // Set field as touched to show validation errors
    if (name && formikSetFieldTouched) {
      formikSetFieldTouched(name, true);
    }
  }, [name, formikSetFieldTouched]);


  const renderInput = () => {
    const defaultProps = {
      placeholder,
      maxLength: defaultMaxLength,
      disabled,
      "aria-invalid": !!inputError,
      "aria-describedby": inputError ? `${fieldId}-error` : undefined,
      id: fieldId,
      type: defaultType,
      value: inputValue,
      name,
      onChange: handleOnChange,
      onFocus: handleOnFocus, // ADDED: Focus handler
      onBlur: handleOnBlur,
      required,
      ...rest,
    };
    // ref передається через ...rest
    return <input {...defaultProps} />;
  };

  const isPassword = (type) => type === "password";

  const showPassword = useCallback(() => {
    if (isPassword(defaultType)) {
      setDefaultType("text");
    } else {
      setDefaultType(type);
    }
  }, [defaultType, type]);

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
            {isPassword(defaultType) ? <FiEyeOff /> : <FiEye />}
          </button>
      );
    }

    // ADDED: Character counter for maxLength fields
    if (maxLength) {
      const currentLength = inputValue ? inputValue.length : 0;
      return (
          <span className={css.count}>
          <span
              className={clsx(
                  css.count_active,
                  currentLength > defaultMaxLength && css.count_error
              )}
          >
            {currentLength}
          </span>
            {" / "}
            {defaultMaxLength}
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
