import React from "react";
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
  const handleChange = (delta) => {
    const newValue = (value ?? 0) + delta;
    if (newValue >= 0) {
      onChange(newValue);
    }
  };

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
          aria-label="Increase value"
        >
          <FaMinus />
        </ButtonIcon>

        <div
          className={clsx(
            styles.step,
            value > 0 && styles.stepActive,
            isInitial && value === 10 && styles.stepInitial
          )}
        >
          {value} min
        </div>

        <ButtonIcon
          className="recipeCount"
          onClick={() => handleChange(step)}
          aria-label="Decrease value"
        >
          <FaPlus />
        </ButtonIcon>
      </div>

      {error && <ErrorField>{error}</ErrorField>}
    </div>
  );
};
