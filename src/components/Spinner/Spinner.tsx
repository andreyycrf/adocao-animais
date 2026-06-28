import React from 'react'
import styles from './Spinner.module.css'

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  color?: 'primary' | 'white' | 'inherit'
}

const Spinner: React.FC<SpinnerProps> = ({ size = 'md', color = 'primary' }) => {
  return (
    <span
      className={[styles.spinner, styles[size], styles[color]].join(' ')}
      role="status"
      aria-label="Carregando"
    />
  )
}

export default Spinner
