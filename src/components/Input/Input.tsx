import React, { forwardRef } from 'react'
import styles from './Input.module.css'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, leftIcon, rightIcon, className = '', id, ...rest }, ref) => {
    const inputId = id ?? `input-${Math.random().toString(36).slice(2, 9)}`

    return (
      <div className={styles.wrapper}>
        {label && (
          <label htmlFor={inputId} className={styles.label}>
            {label}
            {rest.required && <span className={styles.required}>*</span>}
          </label>
        )}
        <div className={styles.inputWrapper}>
          {leftIcon && <span className={styles.leftIcon}>{leftIcon}</span>}
          <input
            ref={ref}
            id={inputId}
            className={[
              styles.input,
              error ? styles.hasError : '',
              leftIcon ? styles.withLeftIcon : '',
              rightIcon ? styles.withRightIcon : '',
              className,
            ]
              .filter(Boolean)
              .join(' ')}
            {...rest}
          />
          {rightIcon && <span className={styles.rightIcon}>{rightIcon}</span>}
        </div>
        {error && <span className={styles.error}>{error}</span>}
        {hint && !error && <span className={styles.hint}>{hint}</span>}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input
