import React, { useRef, useState } from 'react';
import inputStyles from '../input.module.css';
import styles from './PasswordInput.module.css';

export const PasswordInput: React.FC<InputProps> = ({
  isError = false,
  helperText,
  label,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const showPasswordToggle = props.value;

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <div
        onClick={() => {
          inputRef.current?.focus();
        }}
        className={`${inputStyles.input_container} ${
          isError ? inputStyles.input_container : ''
        }`}
      >
        <input
          type={showPasswordToggle && showPassword ? 'text' : 'password'}
          ref={inputRef}
          className={inputStyles.input}
          {...props}
        />
        <label htmlFor="" className={inputStyles.input_label}>
          {label}
        </label>
        {showPasswordToggle && (
          <div
            className={styles.password_toggle_container}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? 'hide' : 'show'}
          </div>
        )}
      </div>
      {isError && helperText && (
        <div className={inputStyles.helper_text}>{helperText}</div>
      )}
    </>
  );
};
