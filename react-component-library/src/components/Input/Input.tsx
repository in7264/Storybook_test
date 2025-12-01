import React, { useState, type InputHTMLAttributes } from "react";
import styles from "./Input.module.css";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  clearable?: boolean;
  error?: string;
  success?: boolean;
}

export const Input: React.FC<InputProps> = ({
  type = "text",
  label,
  clearable,
  value,
  onChange,
  error,
  success,
  disabled,
  ...props
}) => {
  const [inputType, setInputType] = useState(type);
  const [inputValue, setInputValue] = useState(value || "");

  const handleClear = () => {
    setInputValue("");
    if (onChange) {
      onChange({
        target: { value: "" },
      } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (onChange) {
      onChange(e);
    }
  };

  const togglePasswordVisibility = () =>
    setInputType(inputType === "password" ? "text" : "password");

  const getInputClassName = () => {
    let className = styles.field;
    if (error) className += ` ${styles.error}`;
    if (success) className += ` ${styles.success}`;
    if (disabled) className += ` ${styles.disabled}`;
    return className;
  };

  return (
    <div className={styles.input}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles.fieldWrapper}>
        <input
          type={type === "password" ? inputType : type}
          className={getInputClassName()}
          value={inputValue}
          onChange={handleChange}
          disabled={disabled}
          {...props}
        />
        {type === "password" && (
          <button
            type="button"
            className={styles.toggle}
            onClick={togglePasswordVisibility}
            disabled={disabled}
            aria-label={
              inputType === "password" ? "Show password" : "Hide password"
            }
          >
            {inputType === "password" ? "👁️" : "👁️‍🗨️"}
          </button>
        )}
        {clearable && inputValue && !disabled && (
          <button
            type="button"
            className={styles.clear}
            onClick={handleClear}
            aria-label="Clear input"
          >
            ✕
          </button>
        )}
      </div>
      {error && <span className={styles.errorText}>{error}</span>}
      {success && !error && (
        <span className={styles.successText}>✓ Valid input</span>
      )}
    </div>
  );
};
