// src/components/ui/FieldTextarea/FieldTextarea.jsx
import clsx from "clsx";
import {useCallback, useEffect, useId, useRef, useState} from "react";
import css from "../Fields.module.css";
import {ErrorField} from "../ErrorField/ErrorField";

export const FieldTextarea = ({
                                  name,
                                  label,
                                  required,
                                  placeholder,
                                  maxLength,
                                  onChange,
                                  error,
                                  strong,
                                  value = "",
                                  style = "default",
                                  className = "",
                                  helperText,
                                  disabled = false,
                                  minRows = 1,
                                  maxRows = 10,
                                  onBlur,
                              }) => {
    const fieldId = useId();
    const textareaRef = useRef(null);
    const defaultMaxLength = maxLength && parseInt(maxLength, 10);

    const calcRows = useCallback(() => {
        // For all devices, use a more flexible approach that allows for multiline input
        // Start with minRows and let the textarea expand naturally based on content
        return minRows;
    }, [minRows]);

    const [inputValue, setInputValue] = useState(value);
    const [counter, setCounter] = useState(value.length);
    const [rows, setRows] = useState(calcRows());
    const [limitReached, setLimitReached] = useState(false);

    // Use only the direct error prop
    const inputError = error;

    // Update internal state when prop value changes
    useEffect(() => {
        setInputValue(value);
    }, [value]);

    // Function to adjust textarea height based on content
    const adjustHeight = useCallback(() => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        // Reset height to calculate the new height
        textarea.style.height = "auto";

        // Calculate new height based on scrollHeight
        const newHeight = Math.min(
            textarea.scrollHeight,
            // Approximate max height based on maxRows
            // Using 24px as an estimate for line height
            minRows * 24 + (maxRows - minRows) * 24
        );

        textarea.style.height = `${newHeight}px`;
    }, [minRows, maxRows]);

    useEffect(() => {
        const plainLen = inputValue.replace(/\n/g, "").length;
        setCounter(plainLen);
        setRows(calcRows());

        // Adjust height when content changes
        adjustHeight();
    }, [inputValue, calcRows, adjustHeight]);

    // Adjust height on initial render and when ref changes
    useEffect(() => {
        if (textareaRef.current) {
            adjustHeight();
        }
    }, [textareaRef, adjustHeight]);

    const handleOnChange = (event) => {
        // No need to format the text, preserve user input as is
        const formatted = event.target.value;

        // Count characters excluding line breaks for the character limit
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

        // Update internal state
        setInputValue(formatted);
        setCounter(plainLen);
        setRows(calcRows());

        // Call the provided onChange handler
        if (onChange) {
            onChange(formatted);
        }

        // Adjust height after state updates
        setTimeout(adjustHeight, 0);
    };

    const handleOnBlur = () => {
        // Call the provided onBlur handler
        if (onBlur) {
            onBlur();
        }
    };

    const renderTextarea = () => {
        const defaultProps = {
            id: fieldId,
            name, // Pass the name prop to the textarea element
            placeholder,
            disabled,
            value: inputValue,
            onChange: handleOnChange,
            onBlur: handleOnBlur,
            "aria-invalid": inputError ? "true" : "false",
            "aria-describedby": inputError ? `${fieldId}-error` : undefined,
            rows: rows,
            ref: textareaRef,
            style: {overflow: "hidden"}, // Hide scrollbar during auto-resize
            required,
        };

        return <textarea {...defaultProps} />;
    };

    const renderExtra = () => {
        if (maxLength) {
            return (
                <span className={css.count}>
          <span
              className={clsx(
                  counter > 0 && css.count_active,
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
                className={clsx(
                    css.inputWrapper,
                    css.textAreaWrapper,
                    defaultMaxLength && css.withExtra
                )}
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
