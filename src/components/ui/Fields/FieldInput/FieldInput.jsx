import clsx from "clsx";
import {useId, useState} from "react";
import {FiEye, FiEyeOff} from "react-icons/fi";
import css from "../Fields.module.css";
import {ErrorField} from "@components/ui/index.js";

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

    // Визначаємо фінальну помилку
    const inputError = error;

    const renderInput = () => {
        const defaultProps = {
            placeholder,
            maxLength: defaultMaxLength,
            disabled,
            "aria-invalid": !!inputError,
            "aria-describedby": inputError ? `${fieldId}-error` : undefined,
            id: fieldId,
            type: defaultType,
            name,
            onChange,
            required,
            ...rest,
        };
        // value не треба явно передавати, якщо працюємо з react-hook-form
        // ref передається через ...rest
        return <input {...defaultProps} />;
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
                    {isPassword(defaultType) ? <FiEyeOff/> : <FiEye/>}
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
