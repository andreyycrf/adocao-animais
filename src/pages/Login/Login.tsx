import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import styles from './Login.module.css'
import Button from '../../components/Button/Button.tsx'
import Input from '../../components/Input/Input'
import { useAuth } from '../../hooks/useAuth'
import { isValidEmail, isNotEmpty } from '../../utils/validators'

interface LoginForm {
  email: string
  password: string
}

interface LoginErrors {
  email?: string
  password?: string
}

const Login: React.FC = () => {
  const { login, isAuthenticated, isLoading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname ?? '/admin'

  const [form, setForm] = useState<LoginForm>({ email: '', password: '' })
  const [errors, setErrors] = useState<LoginErrors>({})
  const [apiError, setApiError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true })
    }
  }, [isAuthenticated, navigate, from])

  const validate = (): boolean => {
    const newErrors: LoginErrors = {}
    if (!isNotEmpty(form.email)) newErrors.email = 'E-mail é obrigatório'
    else if (!isValidEmail(form.email)) newErrors.email = 'E-mail inválido'
    if (!isNotEmpty(form.password)) newErrors.password = 'Senha é obrigatória'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setIsSubmitting(true)
    setApiError('')
    try {
      await login(form)
    } catch (err) {
      setApiError(err instanceof Error ? err.message : 'Erro ao fazer login')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (field: keyof LoginForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
    if (apiError) setApiError('')
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.formCard}>
          <div className={styles.header}>
            <span className={styles.logoIcon}>🐾</span>
            <h1 className={styles.title}>Acesso ONG</h1>
            <p className={styles.subtitle}>
              Entre com suas credenciais para acessar o painel administrativo
            </p>
          </div>

          <div className={styles.demoCredentials}>
            <p className={styles.demoTitle}>👀 Credenciais de demonstração</p>
            <p className={styles.demoItem}><strong>E-mail:</strong> admin@ong.com</p>
            <p className={styles.demoItem}><strong>Senha:</strong> admin123</p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form} noValidate>
            {apiError && (
              <div className={styles.apiError} role="alert">
                <span>⚠️</span>
                <span>{apiError}</span>
              </div>
            )}

            <Input
              label="E-mail"
              type="email"
              placeholder="admin@ong.com"
              value={form.email}
              onChange={(e) => handleChange('email', e.target.value)}
              error={errors.email}
              leftIcon={<span>📧</span>}
              autoComplete="email"
              required
            />

            <Input
              label="Senha"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => handleChange('password', e.target.value)}
              error={errors.password}
              leftIcon={<span>🔒</span>}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem' }}
                  aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              }
              autoComplete="current-password"
              required
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              isLoading={isSubmitting || isLoading}
            >
              Entrar
            </Button>
          </form>

          <p className={styles.backLink}>
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault()
                navigate('/')
              }}
              className={styles.link}
            >
              ← Voltar ao site
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
