import React from "react";
import clsx from "clsx";
import { FiLoader } from "react-icons/fi";
import { Link } from "react-router-dom";
import css from "./Button.module.css";

/**
 * Universal Button component for Foodies design system
 *
 * @param {Object} props - Component props
 * @param {Function} props.onClick - Click handler function
 * @param {React.ReactNode} props.children - Button content
 * @param {string} props.href - External link URL (creates <a> tag)
 * @param {string} props.to - Internal route path (creates React Router Link)
 * @param {string} props.variant - Button variant (primary, secondary, secondary-reversed)
 * @param {string} props.className - Additional CSS classes for customization
 * @param {boolean} props.isLoading - Shows loading spinner when true
 * @param {string} props.type - Button type (button, submit, reset)
 * @param {boolean} props.disabled - Disables button when true
 *
 * @example
 * // Basic usage
 * <Button variant={Button.variants.PRIMARY} onClick={handleClick}>
 *   Click me
 * </Button>
 *
 * @example
 * // Submit button
 * <Button variant={Button.variants.PRIMARY} type="submit">
 *   Submit Form
 * </Button>
 *
 * @example
 * // Custom width
 * <Button
 *   variant={Button.variants.SECONDARY}
 *   className="full-width"
 *   style={{ minWidth: "200px" }}
 * >
 *   Custom Width
 * </Button>
 */

const VARIANTS = {
  PRIMARY: "primary",
  SECONDARY: "secondary",
  SECONDARY_REVERSED: "secondary-reversed",
};

const Button = ({
  onClick,
  children,
  href,
  to,
  variant,
  className,
  isLoading,
  type = "button",
  disabled = false,
}) => {
  const clickHandler = (event) => {
    if (onClick) {
      event.preventDefault();
      onClick(event);
    }
  };

  const classNames = clsx(css.button, variant && css[variant], className);

  if (href) {
    return (
      <a
        href={href}
        className={classNames}
        rel="nofollow noopener"
        target="_blank"
      >
        {children}
      </a>
    );
  } else if (to) {
    return (
      <Link to={to} className={classNames}>
        {children}
      </Link>
    );
  }

  return (
    <button
      className={classNames}
      type={type}
      onClick={clickHandler}
      disabled={disabled}
    >
      {isLoading ? <FiLoader className={css.iconLoading} /> : children}
    </button>
  );
};

Button.variants = Object.assign({}, VARIANTS);

export { Button };
