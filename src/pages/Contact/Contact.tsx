import React, { useState } from 'react'
import styles from './Contact.module.css'
import Button from '../../components/Button/Button.tsx'
import Input from '../../components/Input/Input'
import { isValidEmail, isNotEmpty } from '../../utils/validators'

interface ContactForm {
  name: string
  email: string
  subject: string
  message: string
}

interface ContactErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
}

const Contact: React.FC = () => {
  const [form, setForm] = useState<ContactForm>({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [errors, setErrors] = useState<ContactErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const validate = (): boolean => {
    const newErrors: ContactErrors = {}
    if (!isNotEmpty(form.name)) newErrors.name = 'Nome é obrigatório'
    if (!isNotEmpty(form.email)) newErrors.email = 'E-mail é obrigatório'
    else if (!isValidEmail(form.email)) newErrors.email = 'E-mail inválido'
    if (!isNotEmpty(form.subject)) newErrors.subject = 'Assunto é obrigatório'
    if (!isNotEmpty(form.message)) newErrors.message = 'Mensagem é obrigatória'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1200))
    setIsSubmitting(false)
    setIsSuccess(true)
    setForm({ name: '', email: '', subject: '', message: '' })
  }

  const handleChange = (field: keyof ContactForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroContent}>
            <h1 className={styles.title}>Entre em contato</h1>
            <p className={styles.subtitle}>
              Tem dúvidas, sugestões ou quer saber mais sobre o AdotaPet? Estamos aqui para ajudar!
            </p>
          </div>
        </div>
      </section>

      <section className={styles.main}>
        <div className="container">
          <div className={styles.grid}>
            <div className={styles.infoColumn}>
              <h2 className={styles.infoTitle}>Informações de contato</h2>
              <p className={styles.infoDesc}>
                Adoramos ouvir de você! Entre em contato por qualquer um dos canais abaixo.
              </p>

              <div className={styles.contacts}>
                <div className={styles.contactItem}>
                  <div className={styles.contactIcon}>📧</div>
                  <div>
                    <p className={styles.contactLabel}>E-mail</p>
                    <p className={styles.contactValue}>contato@adotapet.com.br</p>
                  </div>
                </div>
                <div className={styles.contactItem}>
                  <div className={styles.contactIcon}>📞</div>
                  <div>
                    <p className={styles.contactLabel}>Telefone</p>
                    <p className={styles.contactValue}>(11) 99999-0000</p>
                  </div>
                </div>
                <div className={styles.contactItem}>
                  <div className={styles.contactIcon}>📍</div>
                  <div>
                    <p className={styles.contactLabel}>Endereço</p>
                    <p className={styles.contactValue}>Rua das Flores, 123, São Paulo - SP</p>
                  </div>
                </div>
                <div className={styles.contactItem}>
                  <div className={styles.contactIcon}>🕐</div>
                  <div>
                    <p className={styles.contactLabel}>Horário de atendimento</p>
                    <p className={styles.contactValue}>Seg–Sex, 9h às 18h</p>
                  </div>
                </div>
              </div>

              <div className={styles.social}>
                <p className={styles.socialTitle}>Redes sociais</p>
                <div className={styles.socialLinks}>
                  <a href="[instagram.com](https://instagram.com)" target="_blank" rel="noopener noreferrer" className={styles.socialBtn}>
                    📷 Instagram
                  </a>
                  <a href="[facebook.com](https://facebook.com)" target="_blank" rel="noopener noreferrer" className={styles.socialBtn}>
                    📘 Facebook
                  </a>
                </div>
              </div>
            </div>

            <div className={styles.formColumn}>
              {isSuccess ? (
                <div className={styles.successState}>
                  <span className={styles.successIcon}>✅</span>
                  <h3 className={styles.successTitle}>Mensagem enviada!</h3>
                  <p className={styles.successDesc}>
                    Obrigado por entrar em contato. Responderemos em até 2 dias úteis.
                  </p>
                  <Button variant="outline" onClick={() => setIsSuccess(false)}>
                    Enviar outra mensagem
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className={styles.form} noValidate>
                  <h2 className={styles.formTitle}>Enviar mensagem</h2>

                  <div className={styles.formFields}>
                    <Input
                      label="Seu nome"
                      placeholder="João da Silva"
                      value={form.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      error={errors.name}
                      required
                    />
                    <Input
                      label="E-mail"
                      type="email"
                      placeholder="joao@email.com"
                      value={form.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      error={errors.email}
                      required
                    />
                    <Input
                      label="Assunto"
                      placeholder="Como posso ajudar?"
                      value={form.subject}
                      onChange={(e) => handleChange('subject', e.target.value)}
                      error={errors.subject}
                      required
                    />
                    <div className={styles.messageField}>
                      <label className={styles.messageLabel}>
                        Mensagem <span style={{ color: 'var(--color-danger)' }}>*</span>
                      </label>
                      <textarea
                        className={[
                          styles.textarea,
                          errors.message ? styles.textareaError : '',
                        ].join(' ')}
                        placeholder="Escreva sua mensagem aqui..."
                        value={form.message}
                        onChange={(e) => handleChange('message', e.target.value)}
                        rows={6}
                      />
                      {errors.message && (
                        <span className={styles.errorText}>{errors.message}</span>
                      )}
                    </div>
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    fullWidth
                    isLoading={isSubmitting}
                  >
                    Enviar mensagem
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
