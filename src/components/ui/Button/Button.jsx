import React from "react";
import clsx from "clsx";
import { FiLoader } from "react-icons/fi";
import { Link } from "react-router-dom";
import css from "./Button.module.css";

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
