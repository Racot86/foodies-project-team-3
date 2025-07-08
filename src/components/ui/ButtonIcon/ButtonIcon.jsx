import React from "react";
import clsx from "clsx";
import { FiLoader } from "react-icons/fi";
import css from "./ButtonIcon.module.css";

/**
 * Icon Button component for Foodies design system
 *
 * @param {Object} props - Component props
 * @param {Function} props.onClick - Click handler function
 * @param {React.ReactNode} props.children - Icon content (should be an icon component)
 * @param {string} props.className - Additional CSS classes for customization
 * @param {boolean} props.disabled - Disables button when true
 * @param {string} props.variant - Button variant (default, primary)
 *
 * @example
 * // Basic usage with icon
 * <ButtonIcon onClick={handleClick}>
 *   <FiHeart />
 * </ButtonIcon>
 *
 * @example
 * // Primary variant
 * <ButtonIcon variant={ButtonIcon.variants.PRIMARY} onClick={handleClick}>
 *   <FiTrash />
 * </ButtonIcon>
 */

const VARIANTS = {
  DEFAULT: "default",
  PRIMARY: "primary",
};

const ButtonIcon = ({
  onClick,
  children,
  className,
  disabled = false,
  loading = false,
  variant = VARIANTS.DEFAULT,
}) => {
  const clickHandler = (event) => {
    if (onClick && !disabled && !loading) {
      event.preventDefault();
      onClick(event);
    }
  };

  const classNames = clsx(css.button, css[variant], className);

  return (
    <button
      className={classNames}
      type="button"
      onClick={clickHandler}
      disabled={disabled || loading}
    >
      {loading ? <FiLoader className={css.iconLoading} /> : children}
    </button>
  );
};

// Attach constants to component
ButtonIcon.variants = Object.assign({}, VARIANTS);

export { ButtonIcon };
