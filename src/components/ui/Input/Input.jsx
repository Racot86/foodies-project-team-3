import React, {forwardRef} from "react";
import styles from "./Input.module.css";

export const Input = forwardRef(
    (
        {
            label,
            placeholder,
            type = "text",
            error,
            helperText,
            disabled = false,
            required = false,
            className = "",
            ...props
        },
        ref
    ) => {
        const inputId =
            props.id || `input-${Math.random().toString(36).substr(2, 9)}`;

        return (
            <div className={styles.inputWrapper}>
                {label && (
                    <label htmlFor={inputId} className={styles.label}>
                        {label}
                        {required && <span className={styles.required}>*</span>}
                    </label>
                )}

                <input
                    ref={ref}
                    id={inputId}
                    type={type}
                    placeholder={placeholder}
                    className={`${styles.input} ${error ? styles.error : ""} ${
                        disabled ? styles.disabled : ""
                    } ${className}`}
                    disabled={disabled}
                    required={required}
                    aria-invalid={error ? "true" : "false"}
                    aria-describedby={
                        error
                            ? `${inputId}-error`
                            : helperText
                                ? `${inputId}-helper`
                                : undefined
                    }
                    {...props}
                />

                {error && (
                    <span
                        id={`${inputId}-error`}
                        className={styles.errorText}
                        role="alert"
                    >
            {error}
          </span>
                )}

                {helperText && !error && (
                    <span id={`${inputId}-helper`} className={styles.helperText}>
            {helperText}
          </span>
                )}
            </div>
        );
    }
);

Input.displayName = "Input";
