import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './NotFound.module.css'
import Button from '../../components/Button/Button.tsx'

const NotFound: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <span className={styles.icon}>🐾</span>
        <h1 className={styles.code}>404</h1>
        <h2 className={styles.title}>Página não encontrada</h2>
        <p className={styles.description}>
          Parece que essa página foi para passear e não voltou. Que tal encontrar um animal para adotar enquanto isso?
        </p>
        <div className={styles.actions}>
          <Button variant="primary" size="lg" onClick={() => navigate('/')}>
            Ir para o início
          </Button>
          <Button variant="outline" size="lg" onClick={() => navigate('/animals')}>
            Ver animais
          </Button>
        </div>
      </div>
    </div>
  )
}

export default NotFound
