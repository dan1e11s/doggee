import React, { useRef } from 'react';
import styles from '../input.module.css';

export const Input: React.FC<InputProps> = ({
  isError = false,
  helperText,
  label,
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <div
        className={`${styles.input_container} ${
          isError ? styles.input_container : ''
        }`}
        onClick={() => inputRef.current?.focus()}
      >
        <input ref={inputRef} className={styles.input} {...props} />
        <label htmlFor="" className={styles.input_label}>
          {label}
        </label>
      </div>
      {isError && helperText && (
        <div className={styles.helper_text}>{helperText}</div>
      )}
    </>
  );
};
