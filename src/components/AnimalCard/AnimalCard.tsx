import React from 'react'
import { Link } from 'react-router-dom'
import styles from './AnimalCard.module.css'
import Badge from '../Badge/Badge'
import { IAnimal } from '../../interfaces/IAnimal'
import { formatSpecies, formatSize, formatAge, formatStatus } from '../../utils/formatters'
import { BadgeVariant } from '../../types'

interface AnimalCardProps {
  animal: IAnimal
}

const statusVariantMap: Record<string, BadgeVariant> = {
  available: 'success',
  pending: 'warning',
  adopted: 'default',
}

const AnimalCard: React.FC<AnimalCardProps> = ({ animal }) => {
  return (
    <Link to={`/animals/${animal.id}`} className={styles.card}>
      <div className={styles.imageWrapper}>
        <img
          src={animal.images[0]}
          alt={animal.name}
          className={styles.image}
          loading="lazy"
        />
        <div className={styles.statusBadge}>
          <Badge variant={statusVariantMap[animal.status] ?? 'default'}>
            {formatStatus(animal.status)}
          </Badge>
        </div>
        <div className={styles.speciesBadge}>
          <Badge variant="primary">{formatSpecies(animal.species)}</Badge>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.name}>{animal.name}</h3>
          <span className={styles.sex}>{animal.sex === 'male' ? '♂' : '♀'}</span>
        </div>

        <p className={styles.breed}>{animal.breed}</p>

        <div className={styles.meta}>
          <span className={styles.metaItem}>
            <span className={styles.metaIcon}>🎂</span>
            {formatAge(animal.age, animal.ageUnit)}
          </span>
          <span className={styles.metaItem}>
            <span className={styles.metaIcon}>📏</span>
            {formatSize(animal.size)}
          </span>
          <span className={styles.metaItem}>
            <span className={styles.metaIcon}>📍</span>
            {animal.city}, {animal.state}
          </span>
        </div>

        <div className={styles.health}>
          {animal.vaccinated && <span className={styles.healthTag}>Vacinado</span>}
          {animal.neutered && <span className={styles.healthTag}>Castrado</span>}
          {animal.dewormed && <span className={styles.healthTag}>Vermifugado</span>}
        </div>
      </div>
    </Link>
  )
}

export default AnimalCard
