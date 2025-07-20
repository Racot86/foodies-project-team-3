import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import { FaMinus, FaPlus } from "react-icons/fa6";
import styles from "../Fields.module.css";
import { ButtonIcon } from "../../ButtonIcon/ButtonIcon";
import { ErrorField } from "../ErrorField/ErrorField";

export const FieldCount = ({
  value = 0,
  onChange,
  label,
  error,
  strong = false,
  step = 10,
  className = "",
  isInitial = false,
}) => {
  // State to track the displayed value during animation
  const [displayValue, setDisplayValue] = useState(value);
  // Ref to track animation frame
  const animationRef = useRef(null);

  // Handle changes from buttons
  const handleChange = (delta) => {
    const newValue = (value ?? 0) + delta;
    if (newValue >= 0) {
      onChange(newValue);
    }
  };

  // Animate value changes
  useEffect(() => {
    // Clear any existing animation
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    // If values are already equal, no need to animate
    if (displayValue === value) return;

    const animateValue = () => {
      setDisplayValue(prevValue => {
        // Determine direction and step size
        const isIncreasing = value > prevValue;
        const animationStep = isIncreasing ? 1 : -1;

        // Calculate new value
        const newValue = prevValue + animationStep;

        // Check if animation should continue
        if ((isIncreasing && newValue <= value) || (!isIncreasing && newValue >= value)) {
          // Continue animation at browser refresh rate (typically 60fps)
          animationRef.current = requestAnimationFrame(animateValue);
          return newValue;
        } else {
          // End animation, ensure exact target value
          return value;
        }
      });
    };

    // Start animation immediately
    animationRef.current = requestAnimationFrame(animateValue);

    // Cleanup animation on unmount or value change
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [value]);

  return (
    <div
      className={clsx(
        styles.field,
        className,
        strong && styles.strong,
        error && styles.error
      )}
    >
      {label && <label>{label}</label>}

      <div className={clsx(styles.inputCountWrapper)}>
        <ButtonIcon
          className="recipeCount"
          onClick={() => handleChange(-step)}
          aria-label="Decrease value"
        >
          <FaMinus />
        </ButtonIcon>

        <div
          className={clsx(
            styles.step,
            displayValue > 0 && styles.stepActive,
            isInitial && displayValue === 10 && styles.stepInitial
          )}
        >
          {displayValue} min
        </div>

        <ButtonIcon
          className="recipeCount"
          onClick={() => handleChange(step)}
          aria-label="Increase value"
        >
          <FaPlus />
        </ButtonIcon>
      </div>

      {error && <ErrorField>{error}</ErrorField>}
    </div>
  );
};
