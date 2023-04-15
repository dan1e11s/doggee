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
  const [isFocus, setIsFocus] = useState(!!props.value ?? false);

  return (
    <>
      <div
        onClick={() => {
          inputRef.current?.focus();
          setIsFocus(true);
        }}
        className={`${inputStyles.input_container} ${
          isError ? inputStyles.input_container : ''
        } ${isFocus ? inputStyles.focused : ''}`}
      >
        <label htmlFor="" className={inputStyles.input_label}>
          {label}
        </label>
        <input
          type={showPasswordToggle && showPassword ? 'text' : 'password'}
          ref={inputRef}
          className={inputStyles.input}
          {...props}
          onBlur={() => !props.value && setIsFocus(false)}
        />
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
