// src/components/ui/FieldTextarea/FieldTextarea.jsx
import clsx from "clsx";
import { useId, useState, useEffect, useRef, useCallback } from "react";
import css from "../Fields.module.css";
import { ErrorField } from "../ErrorField/ErrorField";
import { useFormikContext } from "formik";
import { useBreakpoint } from "../../../../hooks/useBreakpoint";

// Constants
const MOBILE_MAX_HEIGHT = 120;
const DESKTOP_HEIGHT = 56;
const CHARACTER_LIMIT_MESSAGE = "Character limit reached";

/**
 * FieldTextarea - A form textarea component with Formik integration and character counting
 * @param {Object} props - Component props
 * @param {string} props.name - Field name for Formik integration
 * @param {string} [props.label] - Field label
 * @param {string} [props.placeholder] - Textarea placeholder
 * @param {number} [props.maxLength] - Maximum character count (excluding newlines)
 * @param {Function} [props.onChange] - Custom onChange handler
 * @param {string} [props.error] - External error message
 * @param {boolean} [props.strong] - Apply strong styling
 * @param {string} [props.value] - External value (controlled component)
 * @param {string} [props.style] - Style variant ('default', 'rounded')
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.helperText] - Helper text displayed below field
 * @param {boolean} [props.disabled] - Disable the textarea
 */
export const FieldTextarea = ({
  name,
  label,
  placeholder,
  maxLength,
  onChange,
  error,
  strong = false,
  value,
  style = "default",
  className = "",
  helperText,
  disabled = false,
}) => {
  // Hooks
  const fieldId = useId();
  const { isMobile, isTablet } = useBreakpoint();
  const textareaRef = useRef(null);
  const formikContext = useFormikContext();

  // State
  const [characterCount, setCharacterCount] = useState(0);
  const [isLimitReached, setIsLimitReached] = useState(false);

  // Derived values
  const maxCharacterLimit = maxLength ? parseInt(maxLength, 10) : null;
  const isMobileDevice = isMobile || isTablet;
  const hasCharacterCounter = Boolean(maxCharacterLimit);

  // Formik integration
  const formikValue = formikContext?.values?.[name];
  const formikSetFieldValue = formikContext?.setFieldValue;
  const formikSetFieldTouched = formikContext?.setFieldTouched;
  const formikTouched = formikContext?.touched?.[name];
  const formikError = formikContext?.errors?.[name];

  // Final values
  const currentValue = formikValue || value || "";
  const currentError = error || (formikTouched && formikError);

  // Text processing function
  const processText = useCallback(
    (text) => {
      // On mobile/tablet, return text as-is
      // On desktop, you can add text processing logic here if needed
      return isMobileDevice ? text : text;
    },
    [isMobileDevice]
  );

  // Auto-resize functionality
  const autoResize = useCallback(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    if (isMobileDevice) {
      // Mobile: Dynamic height with auto-grow
      textarea.style.height = "auto";
      textarea.style.overflow = "hidden";

      const scrollHeight = textarea.scrollHeight;
      const maxHeight = MOBILE_MAX_HEIGHT;

      if (scrollHeight <= maxHeight) {
        textarea.style.height = `${Math.max(scrollHeight, DESKTOP_HEIGHT)}px`;
        textarea.style.overflowY = "hidden";
      } else {
        textarea.style.height = `${maxHeight}px`;
        textarea.style.overflowY = "auto";
      }
    } else {
      // Desktop: Fixed height with overflow control
      const scrollHeight = textarea.scrollHeight;

      if (scrollHeight > DESKTOP_HEIGHT) {
        textarea.style.overflowY = "auto";
      } else {
        textarea.style.overflowY = "hidden";
      }
    }
  }, [isMobileDevice]);

  // Character counting logic
  const getCharacterCount = useCallback((text) => {
    return text ? text.replace(/\n/g, "").length : 0;
  }, []);

  // Update character count and auto-resize when value changes
  useEffect(() => {
    const count = getCharacterCount(currentValue);
    setCharacterCount(count);

    requestAnimationFrame(() => {
      autoResize();
    });
  }, [currentValue, getCharacterCount, autoResize]);

  // Auto-resize on mount and breakpoint changes
  useEffect(() => {
    autoResize();
  }, [autoResize]);

  // Event handlers
  const handleChange = useCallback(
    (event) => {
      const rawValue = event.target.value;
      const processedValue = processText(rawValue);
      const characterLength = getCharacterCount(processedValue);

      // Block input if exceeding character limit
      if (maxCharacterLimit && characterLength > maxCharacterLimit) {
        if (processedValue.length >= currentValue.length) {
          setIsLimitReached(true);
          return;
        }
        return;
      }

      // Prevent adding newlines when at character limit
      if (maxCharacterLimit && characterLength === maxCharacterLimit) {
        const previousNewlines = (currentValue.match(/\n/g) || []).length;
        const newNewlines = (processedValue.match(/\n/g) || []).length;

        if (newNewlines > previousNewlines) {
          setIsLimitReached(true);
          return;
        }
      }

      // Clear limit reached state
      if (isLimitReached) {
        setIsLimitReached(false);
      }

      // Update values
      setCharacterCount(characterLength);

      // Update Formik
      if (name && formikSetFieldValue) {
        formikSetFieldValue(name, processedValue);
      }

      // Call custom onChange if provided
      if (onChange) {
        onChange(processedValue);
      }

      // Auto-resize after change
      requestAnimationFrame(() => {
        autoResize();
      });
    },
    [
      processText,
      getCharacterCount,
      maxCharacterLimit,
      currentValue,
      isLimitReached,
      name,
      formikSetFieldValue,
      onChange,
      autoResize,
    ]
  );

  const handleFocus = useCallback(() => {
    // Clear validation error on focus
    if (name && formikSetFieldTouched) {
      formikSetFieldTouched(name, false);
    }
  }, [name, formikSetFieldTouched]);

  const handleBlur = useCallback(() => {
    // Trigger validation on blur
    if (name && formikSetFieldTouched) {
      formikSetFieldTouched(name, true);
    }
  }, [name, formikSetFieldTouched]);

  // Render functions
  const renderTextarea = () => {
    const textareaProps = {
      id: fieldId,
      ref: textareaRef,
      name,
      placeholder,
      disabled,
      value: currentValue,
      onChange: handleChange,
      onFocus: handleFocus,
      onBlur: handleBlur,
      "aria-invalid": currentError ? "true" : "false",
      "aria-describedby": currentError ? `${fieldId}-error` : undefined,
    };

    return <textarea {...textareaProps} />;
  };

  const renderCharacterCounter = () => {
    if (!hasCharacterCounter) return null;

    const isOverLimit = characterCount > maxCharacterLimit;

    return (
      <span className={css.count}>
        <span
          className={clsx(css.count_active, isOverLimit && css.count_error)}
        >
          {characterCount}
        </span>
        {" / "}
        {maxCharacterLimit}
      </span>
    );
  };

  const renderErrorMessage = () => {
    if (isLimitReached) {
      return (
        <ErrorField id={`${fieldId}-error`}>
          {`${CHARACTER_LIMIT_MESSAGE} (${maxCharacterLimit} characters maximum)`}
        </ErrorField>
      );
    }

    if (currentError) {
      return <ErrorField id={`${fieldId}-error`}>{currentError}</ErrorField>;
    }

    return null;
  };

  const renderHelperText = () => {
    if (helperText && !currentError && !isLimitReached) {
      return <p className={css.helperText}>{helperText}</p>;
    }
    return null;
  };

  // Main render
  return (
    <div
      className={clsx(
        css.field,
        css.fieldTextarea,
        style && css[style],
        className,
        strong && css.strong,
        currentError && css.error,
        disabled && css.disabled
      )}
    >
      {label && <label htmlFor={fieldId}>{label}</label>}

      <div
        className={clsx(
          css.textAreaWrapper,
          hasCharacterCounter && css.withExtra
        )}
      >
        {renderTextarea()}
        {hasCharacterCounter && (
          <div className={css.textareaCountWrapper}>
            {renderCharacterCounter()}
          </div>
        )}
      </div>

      {renderHelperText()}
      {renderErrorMessage()}
    </div>
  );
};
