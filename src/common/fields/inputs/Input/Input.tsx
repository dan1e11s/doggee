import React, { useRef, useState } from 'react';
import styles from '../input.module.css';

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'placeholder'> {
  label: string;
  isError?: boolean;
  helperText?: string;
}

export const Input: React.FC<InputProps> = ({
  isError = false,
  helperText,
  label,
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocus, setIsFocus] = useState(!!props.value ?? false);

  return (
    <>
      <div
        onClick={() => {
          inputRef.current?.focus();
          setIsFocus(true);
        }}
        className={`${styles.input_container} ${
          isError ? styles.input_container : ''
        } ${isFocus ? styles.focused : ''}`}
      >
        <label htmlFor="" className={styles.input_label}>
          {label}
        </label>
        <input
          ref={inputRef}
          className={styles.input}
          {...props}
          onBlur={() => !props.value && setIsFocus(false)}
        />
      </div>
      {isError && helperText && (
        <div className={styles.helper_text}>{helperText}</div>
      )}
    </>
  );
};
