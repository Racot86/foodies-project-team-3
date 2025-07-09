import React from "react";
import clsx from "clsx";
import styles from "./Heading.module.css";

export const Heading = ({
  children,
  level = 2,
  size,
  color = "default",
  weight = "semibold",
  align = "left",
  className,
  ...props
}) => {
  // Автоматичне визначення розміру на основі рівня, якщо size не вказано
  const getDefaultSize = (level) => {
    const sizeMap = {
      1: "xl",
      2: "lg",
      3: "md",
      4: "sm",
      5: "xs",
      6: "xs",
    };
    return sizeMap[level] || "md";
  };

  const headingSize = size || getDefaultSize(level);
  const Component = `h${Math.min(Math.max(level, 1), 6)}`;

  const headingClasses = clsx(
    styles.heading,
    styles[`level-${level}`],
    styles[`size-${headingSize}`],
    styles[`color-${color}`],
    styles[`weight-${weight}`],
    styles[`align-${align}`],
    className
  );

  return (
    <Component className={headingClasses} {...props}>
      {children}
    </Component>
  );
};

export default Heading;
