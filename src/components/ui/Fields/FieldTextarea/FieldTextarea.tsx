// src/components/ui/FieldTextarea/FieldTextarea.jsx
import clsx from "clsx";
import { useId, useState, useEffect } from "react";
import css from "../Fields.module.css";
import { ErrorField } from "../ErrorField/ErrorField";
import { useFormikContext } from "formik";

export const FieldTextarea = ({
	name,
	label,
	required,
	placeholder,
	maxLength,
	onChange,
	error,
	strong,
	value,
	style = "default",
	className = "",
	helperText,
	disabled = false,
	minRows = 1,
	maxRows = 10,
	expandAt = 60,
}) => {
	const [count, setCount] = useState(0);
	const fieldId = useId();
	const defaultMaxLength = maxLength && parseInt(maxLength, 10);

	// Отримуємо Formik context
	const formikContext = useFormikContext();

	// Визначаємо значення та методи з Formik
	const formikValue = formikContext?.values?.[name];
	const formikSetFieldValue = formikContext?.setFieldValue;
	const formikSetFieldTouched = formikContext?.setFieldTouched;
	const formikTouched = formikContext?.touched?.[name];
	const formikError = formikContext?.errors?.[name];

	// Визначаємо фінальне значення
	const inputValue = value !== undefined ? value : formikValue || "";

	// Визначаємо фінальну помилку
	const inputError = error || (formikTouched && formikError);

	useEffect(() => {
		if (maxLength && inputValue) {
			setCount(inputValue.length);
		}
	}, [maxLength, inputValue]);


	function calcRows(len) {
		return Math.min(maxRows, Math.max(minRows, Math.ceil(len / expandAt)));
	}

	function chunkify(str) {
		const plain = str.replace(/\n/g, "");
		const parts = plain.match(new RegExp(`.{1,${expandAt}}`, "g")) || [""];
		return parts.join("\n");
	}

	const [counter, setCounter] = useState(inputValue.length);
	const [rows, setRows] = useState(calcRows(inputValue.length));


	useEffect(() => {
		const plainLen = inputValue.replace(/\n/g, "").length;
		setCounter(plainLen);
		setRows(calcRows(plainLen));
	}, [inputValue]);

	const handleOnChange = (event) => {
		const raw = event.target.value;
		const formatted = chunkify(raw);

		const plainLen = formatted.replace(/\n/g, "").length;
		setCounter(plainLen);
		setRows(calcRows(plainLen));

		// Оновлюємо Formik значення
		if (name && formikSetFieldValue) {
			formikSetFieldValue(name, formatted);
		}

		// Викликаємо кастомний onChange якщо є
		if (onChange) {
			onChange(formatted);
		}
	};

	const handleOnBlur = () => {
		// Позначаємо поле як touched в Formik
		if (name && formikSetFieldTouched) {
			formikSetFieldTouched(name, true);
		}
	};

	const renderTextarea = () => {
		const defaultProps = {
			id: fieldId,
			placeholder,
			disabled,
			value: inputValue,
			onChange: handleOnChange,
			onBlur: handleOnBlur,
			"aria-invalid": inputError ? "true" : "false",
			"aria-describedby": inputError ? `${fieldId}-error` : undefined,
			maxLength: defaultMaxLength,
			rows: rows,
			style: {
				resize: "none",
				overflow: "hidden",
				whiteSpace: "pre-wrap",
				wordBreak: "break-all",
			}
		};

		// Якщо є Formik context і name, додаємо required з валідації
		if (formikContext && name) {
			const fieldMeta = formikContext.getFieldMeta?.(name);
			defaultProps.required = required || fieldMeta?.required;
		}

		return <textarea {...defaultProps} />;
	};

	const renderExtra = () => {
		if (maxLength) {
			return (
				<span className={css.count}>
					<span
						className={clsx(
							css.count_active,
							counter > defaultMaxLength && css.count_error
						)}
					>
						{counter}
					</span>{" "}
					/ {defaultMaxLength}
				</span>
			);
		}
	};

	return (
		<div
			className={clsx(
				css.field,
				css.fieldTextarea,
				style && css[style],
				className,
				strong && css.strong,
				inputError && css.error,
				defaultMaxLength && css.withExtra,
				disabled && css.disabled
			)}
		>
			{label && (
				<label htmlFor={fieldId}>
					{label}
					{required && <span aria-label="required"> *</span>}
				</label>
			)}

			<div className={clsx(css.inputWrapper, defaultMaxLength && css.withExtra)}>
				{renderTextarea()}
				{defaultMaxLength && <div className={css.extra}>{renderExtra()}</div>}
			</div>

			{helperText && !inputError && (
				<p className={css.helperText}>{helperText}</p>
			)}
			{inputError && (
				<ErrorField id={`${fieldId}-error`}>{inputError}</ErrorField>
			)}
		</div>
	);
};
