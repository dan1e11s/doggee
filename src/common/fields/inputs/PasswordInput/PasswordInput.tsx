import React, { useState } from 'react';
import styles from './Input.module.css';

interface InputProps extends Omit<React.HTMLProps<HTMLInputElement>, 'type'> {
  isError?: boolean;
  helperText?: string;
}

export const PasswordInput: React.FC<InputProps> = ({
  isError = false,
  helperText,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const showPasswordToggle = props.value;

  return (
    <div className={styles.input_container}>
      <input
        className={`${styles.input} ${isError ? styles.error : ''}`}
        {...props}
        type={showPasswordToggle && showPassword ? 'text' : 'password'}
      />
      {isError && helperText && (
        <div className={styles.helper_text}>{helperText}</div>
      )}
      {showPasswordToggle && (
        <div
          className={styles.password_toggle_container}
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? 'hide' : 'show'}
        </div>
      )}
    </div>
  );
};
