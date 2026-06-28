import React, { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import styles from './AnimalDetail.module.css'
import Button from '../../components/Button/Button.tsx'
import Badge from '../../components/Badge/Badge'
import Modal from '../../components/Modal/Modal'
import Input from '../../components/Input/Input'
import { useAnimals } from '../../hooks/useAnimals'
import {
  formatSpecies,
  formatSize,
  formatAge,
  formatStatus,
  formatPhone,
} from '../../utils/formatters'
import { animalService } from '../../services/animalService'
import { IAdoptionForm } from '../../interfaces/IAnimal'
import { BadgeVariant } from '../../types'
import { isValidEmail, isValidPhone, isNotEmpty } from '../../utils/validators'

const statusVariantMap: Record<string, BadgeVariant> = {
  available: 'success',
  pending: 'warning',
  adopted: 'default',
}

interface FormState {
  name: string
  email: string
  phone: string
  city: string
  state: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  phone?: string
  city?: string
  state?: string
  message?: string
}

const AnimalDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { animals } = useAnimals()
  const [selectedImage, setSelectedImage] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    city: '',
    state: '',
    message: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})

  const animal = animals.find((a) => a.id === id)

  if (!animal) {
    return (
      <div className={styles.notFound}>
        <span className={styles.notFoundIcon}>🐾</span>
        <h2>Animal não encontrado</h2>
        <p>O animal que você procura não existe ou foi removido.</p>
        <Button variant="primary" onClick={() => navigate('/animals')}>
          Ver todos os animais
        </Button>
      </div>
    )
  }

  const validate = (): boolean => {
    const newErrors: FormErrors = {}
    if (!isNotEmpty(form.name)) newErrors.name = 'Nome é obrigatório'
    if (!isNotEmpty(form.email)) newErrors.email = 'E-mail é obrigatório'
    else if (!isValidEmail(form.email)) newErrors.email = 'E-mail inválido'
    if (!isNotEmpty(form.phone)) newErrors.phone = 'Telefone é obrigatório'
    else if (!isValidPhone(form.phone)) newErrors.phone = 'Telefone inválido'
    if (!isNotEmpty(form.city)) newErrors.city = 'Cidade é obrigatória'
    if (!isNotEmpty(form.state)) newErrors.state = 'Estado é obrigatório'
    if (!isNotEmpty(form.message)) newErrors.message = 'Mensagem é obrigatória'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setIsSubmitting(true)
    const adoptionForm: IAdoptionForm = {
      ...form,
      animalId: animal.id,
      animalName: animal.name,
    }
    await animalService.submitAdoptionForm(adoptionForm)
    setIsSubmitting(false)
    setIsSuccess(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setIsSuccess(false)
    setForm({ name: '', email: '', phone: '', city: '', state: '', message: '' })
    setErrors({})
  }

  const handleInputChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const relatedAnimals = animals
    .filter((a) => a.id !== animal.id && a.species === animal.species && a.status === 'available')
    .slice(0, 3)

  return (
    <div className={styles.page}>
      <div className="container">
        <nav className={styles.breadcrumb} aria-label="Caminho de navegação">
          <Link to="/" className={styles.breadcrumbLink}>Início</Link>
          <span className={styles.breadcrumbSep}>›</span>
          <Link to="/animals" className={styles.breadcrumbLink}>Animais</Link>
          <span className={styles.breadcrumbSep}>›</span>
          <span className={styles.breadcrumbCurrent}>{animal.name}</span>
        </nav>

        <div className={styles.layout}>
          <div className={styles.gallery}>
            <div className={styles.mainImage}>
              <img
                src={animal.images[selectedImage]}
                alt={`${animal.name} - foto ${selectedImage + 1}`}
              />
              <div className={styles.mainImageBadge}>
                <Badge variant={statusVariantMap[animal.status] ?? 'default'}>
                  {formatStatus(animal.status)}
                </Badge>
              </div>
            </div>
            {animal.images.length > 1 && (
              <div className={styles.thumbnails}>
                {animal.images.map((img, index) => (
                  <button
                    key={index}
                    className={[
                      styles.thumbnail,
                      selectedImage === index ? styles.thumbnailActive : '',
                    ].join(' ')}
                    onClick={() => setSelectedImage(index)}
                    aria-label={`Foto ${index + 1}`}
                  >
                    <img src={img} alt={`Miniatura ${index + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className={styles.info}>
            <div className={styles.nameRow}>
              <h1 className={styles.name}>{animal.name}</h1>
              <span className={styles.sex}>{animal.sex === 'male' ? '♂' : '♀'}</span>
            </div>

            <p className={styles.breed}>
              {animal.breed} · <Badge variant="primary">{formatSpecies(animal.species)}</Badge>
            </p>

            <div className={styles.details}>
              <div className={styles.detailItem}>
                <span className={styles.detailIcon}>🎂</span>
                <span className={styles.detailLabel}>Idade</span>
                <span className={styles.detailValue}>{formatAge(animal.age, animal.ageUnit)}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailIcon}>📏</span>
                <span className={styles.detailLabel}>Porte</span>
                <span className={styles.detailValue}>{formatSize(animal.size)}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailIcon}>🎨</span>
                <span className={styles.detailLabel}>Cor</span>
                <span className={styles.detailValue}>{animal.color}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailIcon}>📍</span>
                <span className={styles.detailLabel}>Localização</span>
                <span className={styles.detailValue}>{animal.city}, {animal.state}</span>
              </div>
            </div>

            <div className={styles.health}>
              <h3 className={styles.healthTitle}>Saúde</h3>
              <div className={styles.healthGrid}>
                <div className={[styles.healthItem, animal.vaccinated ? styles.healthOk : styles.healthNo].join(' ')}>
                  {animal.vaccinated ? '✓' : '✗'} Vacinado
                </div>
                <div className={[styles.healthItem, animal.neutered ? styles.healthOk : styles.healthNo].join(' ')}>
                  {animal.neutered ? '✓' : '✗'} Castrado
                </div>
                <div className={[styles.healthItem, animal.dewormed ? styles.healthOk : styles.healthNo].join(' ')}>
                  {animal.dewormed ? '✓' : '✗'} Vermifugado
                </div>
                <div className={[styles.healthItem, animal.microchipped ? styles.healthOk : styles.healthNo].join(' ')}>
                  {animal.microchipped ? '✓' : '✗'} Microchip
                </div>
              </div>
            </div>

            <div className={styles.description}>
              <h3 className={styles.descTitle}>Sobre {animal.name}</h3>
              <p className={styles.descText}>{animal.description}</p>
            </div>

            <div className={styles.org}>
              <h3 className={styles.orgTitle}>Responsável pela adoção</h3>
              <div className={styles.orgCard}>
                <div className={styles.orgAvatar}>
                  {animal.organizationName.charAt(0)}
                </div>
                <div className={styles.orgDetails}>
                  <p className={styles.orgName}>{animal.organizationName}</p>
                  <p className={styles.orgContact}>📞 {formatPhone(animal.organizationPhone)}</p>
                  <p className={styles.orgContact}>📧 {animal.organizationEmail}</p>
                </div>
              </div>
            </div>

            {animal.status === 'available' && (
              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={() => setIsModalOpen(true)}
              >
                🐾 Quero adotar {animal.name}
              </Button>
            )}

            {animal.status === 'pending' && (
              <div className={styles.pendingNotice}>
                <span>⏳</span>
                <p>Este animal está em processo de adoção. Em breve poderá estar disponível novamente.</p>
              </div>
            )}

            {animal.status === 'adopted' && (
              <div className={styles.adoptedNotice}>
                <span>🎉</span>
                <p>{animal.name} já foi adotado! Veja outros animais disponíveis.</p>
              </div>
            )}
          </div>
        </div>

        {relatedAnimals.length > 0 && (
          <section className={styles.related}>
            <h2 className={styles.relatedTitle}>Outros {formatSpecies(animal.species).toLowerCase()}s disponíveis</h2>
            <div className={styles.relatedGrid}>
              {relatedAnimals.map((a) => (
                <Link key={a.id} to={`/animals/${a.id}`} className={styles.relatedCard}>
                  <img src={a.images[0]} alt={a.name} className={styles.relatedImage} />
                  <div className={styles.relatedInfo}>
                    <p className={styles.relatedName}>{a.name}</p>
                    <p className={styles.relatedBreed}>{a.breed}</p>
                    <p className={styles.relatedAge}>{formatAge(a.age, a.ageUnit)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={isSuccess ? 'Interesse enviado!' : `Adotar ${animal.name}`}
        size="lg"
      >
        {isSuccess ? (
          <div className={styles.successState}>
            <span className={styles.successIcon}>🎉</span>
            <h3 className={styles.successTitle}>Interesse enviado com sucesso!</h3>
            <p className={styles.successDesc}>
              A ONG <strong>{animal.organizationName}</strong> receberá suas informações e entrará em contato em breve. Obrigado por querer adotar!
            </p>
            <Button variant="primary" fullWidth onClick={handleCloseModal}>
              Fechar
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={styles.form} noValidate>
            <p className={styles.formIntro}>
              Preencha seus dados e enviaremos seu interesse para a ONG responsável por <strong>{animal.name}</strong>.
            </p>
            <div className={styles.formGrid}>
              <Input
                label="Seu nome completo"
                placeholder="João da Silva"
                value={form.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                error={errors.name}
                required
              />
              <Input
                label="E-mail"
                type="email"
                placeholder="joao@email.com"
                value={form.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                error={errors.email}
                required
              />
              <Input
                label="Telefone / WhatsApp"
                type="tel"
                placeholder="(11) 99999-0000"
                value={form.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                error={errors.phone}
                required
              />
              <div className={styles.locationRow}>
                <div style={{ flex: 1 }}>
                  <Input
                    label="Cidade"
                    placeholder="São Paulo"
                    value={form.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    error={errors.city}
                    required
                  />
                </div>
                <div style={{ width: '5rem' }}>
                  <Input
                    label="UF"
                    placeholder="SP"
                    maxLength={2}
                    value={form.state}
                    onChange={(e) => handleInputChange('state', e.target.value.toUpperCase())}
                    error={errors.state}
                    required
                  />
                </div>
              </div>
              <div className={styles.messageField}>
                <label className={styles.messageLabel}>
                  Mensagem <span style={{ color: 'var(--color-danger)' }}>*</span>
                </label>
                <textarea
                  className={[styles.textarea, errors.message ? styles.textareaError : ''].join(' ')}
                  placeholder="Conte um pouco sobre você, sua moradia e por que deseja adotar..."
                  value={form.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  rows={4}
                />
                {errors.message && <span className={styles.errorText}>{errors.message}</span>}
              </div>
            </div>
            <div className={styles.formActions}>
              <Button type="button" variant="ghost" onClick={handleCloseModal}>
                Cancelar
              </Button>
              <Button type="submit" variant="primary" isLoading={isSubmitting}>
                Enviar interesse
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  )
}

export default AnimalDetail
