import { useEffect, useId, useState, useMemo } from "react";
import clsx from "clsx";
import { FaMinus, FaPlus } from "react-icons/fa6";
import css from "../Fields.module.css";
import { ButtonIcon } from "../../ButtonIcon/ButtonIcon";
import { ErrorField } from "../ErrorField/ErrorField";
import { useFormContext } from "react-hook-form";

export const FieldCount = ({
  label,
  name,
  strong,
  onChange,
  error,
  value,
  step = 10,
  className = "",
}) => {
  const [count, setCount] = useState(value);
  const formContext = useFormContext();
  const getValues = formContext?.getValues;

  const fieldId = useId();
  const values = useMemo(() => {
    return getValues ? getValues() : {};
  }, [getValues]);

  const handleOnChange = (value) => () => {
    const currentValue = count + value;
    if (currentValue >= 0) {
      onChange(currentValue);
      setCount(currentValue);
    }
  };

  useEffect(() => {
    if (
      name &&
      values &&
      count !== values[name] &&
      values[name] !== undefined
    ) {
      setCount(values[name]);
    }
  }, [count, name, values]);

  return (
    <div
      className={clsx(
        css.field,
        className,
        strong && css.strong,
        error && css.error
      )}
    >
      {label && <label htmlFor={fieldId}>{label}</label>}
      <div className={clsx(css.inputCountWrapper)}>
        <ButtonIcon onClick={handleOnChange(-step)}>
          <FaMinus />
        </ButtonIcon>
        <div className={css.step}>{count} min</div>
        <ButtonIcon onClick={handleOnChange(step)}>
          <FaPlus />
        </ButtonIcon>
      </div>

      {error && <ErrorField>{error}</ErrorField>}
    </div>
  );
};
