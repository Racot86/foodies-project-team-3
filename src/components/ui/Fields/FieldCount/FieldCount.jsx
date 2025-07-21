import React, {useEffect, useRef, useState} from "react";
import clsx from "clsx";
import {FaMinus, FaPlus} from "react-icons/fa6";
import styles from "../Fields.module.css";
import {ButtonIcon} from "@components/ui/index.js";
import {ErrorField} from "@components/ui/index.js";
import "./FieldCountAnimation.css";

// Component to animate a single digit
const AnimatedDigit = ({digit, animationDirection = null, animationKey}) => {
    const animationClass = animationDirection
        ? animationDirection === 'up'
            ? 'digit-animate-up'
            : 'digit-animate-down'
        : '';

    return (
        <span key={animationKey} className={`animated-digit ${animationClass}`}>
      {digit}
    </span>
    );
};

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
    // State to track the displayed value
    const [displayValue, setDisplayValue] = useState(value);
    // State to track animation direction for each digit
    const [digitAnimations, setDigitAnimations] = useState({});
    // Previous value for comparison
    const prevValueRef = useRef(value);

    // Handle changes from buttons
    const handleChange = (delta) => {
        const newValue = (value ?? 0) + delta;
        if (newValue >= 0) {
            onChange(newValue);
        }
    };

    // Update display value and set animation directions
    useEffect(() => {
        // If values are already equal, no need to animate
        if (displayValue === value) return;

        // Determine animation direction for each digit position
        const prevValueStr = String(prevValueRef.current);
        const newValueStr = String(value);
        const animations = {};

        // Get the maximum length to ensure we animate all digits
        const maxLength = Math.max(prevValueStr.length, newValueStr.length);

        // Pad strings with leading zeros to ensure equal length
        const paddedPrev = prevValueStr.padStart(maxLength, '0');
        const paddedNew = newValueStr.padStart(maxLength, '0');

        // Determine animation direction for each digit
        for (let i = 0; i < maxLength; i++) {
            const prevDigit = parseInt(paddedPrev[i], 10);
            const newDigit = parseInt(paddedNew[i], 10);

            if (prevDigit !== newDigit) {
                // If new digit is greater, animate up, otherwise animate down
                animations[maxLength - i - 1] = newDigit > prevDigit ? 'up' : 'down';
            }
        }

        setDigitAnimations(animations);
        setDisplayValue(value);
        prevValueRef.current = value;
    }, [value]);

    // Render each digit with appropriate animation
    const renderDigits = () => {
        const digits = String(displayValue).split('');

        return digits.map((digit, index) => {
            const position = digits.length - index - 1;
            const animationDirection = digitAnimations[position];

            // Create a unique key that changes when the value changes
            // Include value in the key to force remount and replay animation
            const animationKey = `digit-${position}-${value}-${Date.now()}`;

            return (
                <AnimatedDigit
                    key={animationKey}
                    digit={digit}
                    animationDirection={animationDirection}
                    animationKey={animationKey}
                />
            );
        });
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
                    aria-label="Decrease value"
                >
                    <FaMinus/>
                </ButtonIcon>

                <div
                    className={clsx(
                        styles.step,
                        displayValue > 0 && styles.stepActive,
                        isInitial && displayValue === 10 && styles.stepInitial
                    )}
                >
                    <div className="animated-digits-container">
                        {renderDigits()}
                    </div>
                    <span className="unit-text"> min</span>
                </div>

                <ButtonIcon
                    className="recipeCount"
                    onClick={() => handleChange(step)}
                    aria-label="Increase value"
                >
                    <FaPlus/>
                </ButtonIcon>
            </div>

            {error && <ErrorField>{error}</ErrorField>}
        </div>
    );
};
