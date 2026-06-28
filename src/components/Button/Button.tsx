import React from 'react'
import styles from './Button.module.css'
import { ButtonVariant, ButtonSize } from '../../types'
import Spinner from '../Spinner/Spinner'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  fullWidth?: boolean
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  disabled,
  className = '',
  ...rest
}) => {
  const classes = [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth ? styles.fullWidth : '',
    isLoading ? styles.loading : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button className={classes} disabled={disabled || isLoading} {...rest}>
      {isLoading ? (
        <Spinner size="sm" color="inherit" />
      ) : (
        <>
          {leftIcon && <span className={styles.leftIcon}>{leftIcon}</span>}
          {children}
          {rightIcon && <span className={styles.rightIcon}>{rightIcon}</span>}
        </>
      )}
    </button>
  )
}

export default Button
