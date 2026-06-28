import React, { forwardRef } from 'react'
import styles from './Select.module.css'
import { SelectOption } from '../../types'

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  hint?: string
  options: SelectOption[]
  placeholder?: string
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, hint, options, placeholder, className = '', id, ...rest }, ref) => {
    const selectId = id ?? `select-${Math.random().toString(36).slice(2, 9)}`

    return (
      <div className={styles.wrapper}>
        {label && (
          <label htmlFor={selectId} className={styles.label}>
            {label}
            {rest.required && <span className={styles.required}>*</span>}
          </label>
        )}
        <div className={styles.selectWrapper}>
          <select
            ref={ref}
            id={selectId}
            className={[styles.select, error ? styles.hasError : '', className]
              .filter(Boolean)
              .join(' ')}
            {...rest}
          >
            {placeholder && <option value="">{placeholder}</option>}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <span className={styles.arrow}>▾</span>
        </div>
        {error && <span className={styles.error}>{error}</span>}
        {hint && !error && <span className={styles.hint}>{hint}</span>}
      </div>
    )
  }
)

Select.displayName = 'Select'

export default Select
