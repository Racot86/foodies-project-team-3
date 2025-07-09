import React from "react";
import clsx from "clsx";
import styles from "./Text.module.css";

export const Text = ({
  children,
  variant = "body",
  size = "md",
  color = "default",
  weight = "normal",
  align = "left",
  className,
  as = "p",
  ...props
}) => {
  const textClasses = clsx(
    styles.text,
    styles[variant],
    styles[`size-${size}`],
    styles[`color-${color}`],
    styles[`weight-${weight}`],
    styles[`align-${align}`],
    className
  );

  const Component = as;

  return (
    <Component className={textClasses} {...props}>
      {children}
    </Component>
  );
};

export default Text;
