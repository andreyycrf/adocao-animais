import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import styles from './Dashboard.module.css'
import { useAnimals } from '../../../hooks/useAnimals'
import { useAuth } from '../../../hooks/useAuth'
import { formatDate } from '../../../utils/formatters'

const Dashboard: React.FC = () => {
  const { animals } = useAnimals()
  const { user } = useAuth()

  const stats = useMemo(() => {
    return {
      total: animals.length,
      available: animals.filter((a) => a.status === 'available').length,
      pending: animals.filter((a) => a.status === 'pending').length,
      adopted: animals.filter((a) => a.status === 'adopted').length,
      dogs: animals.filter((a) => a.species === 'dog').length,
      cats: animals.filter((a) => a.species === 'cat').length,
      rabbits: animals.filter((a) => a.species === 'rabbit').length,
      others: animals.filter((a) => !['dog', 'cat', 'rabbit'].includes(a.species)).length,
      vaccinated: animals.filter((a) => a.vaccinated).length,
      neutered: animals.filter((a) => a.neutered).length,
    }
  }, [animals])

  const recentAnimals = useMemo(() => {
    return [...animals]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5)
  }, [animals])

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Dashboard</h1>
          <p className={styles.subtitle}>
            Bem-vindo(a) de volta, <strong>{user?.organizationName}</strong>!
          </p>
        </div>
        <Link to="/admin/animals/new" className={styles.addBtn}>
          ➕ Cadastrar animal
        </Link>
      </div>

      <div className={styles.statsGrid}>
        <div className={[styles.statCard, styles.statPrimary].join(' ')}>
          <div className={styles.statIcon}>🐾</div>
          <div className={styles.statInfo}>
            <span className={styles.statNumber}>{stats.total}</span>
            <span className={styles.statLabel}>Total de animais</span>
          </div>
        </div>
        <div className={[styles.statCard, styles.statGreen].join(' ')}>
          <div className={styles.statIcon}>✅</div>
          <div className={styles.statInfo}>
            <span className={styles.statNumber}>{stats.available}</span>
            <span className={styles.statLabel}>Disponíveis</span>
          </div>
        </div>
        <div className={[styles.statCard, styles.statYellow].join(' ')}>
          <div className={styles.statIcon}>⏳</div>
          <div className={styles.statInfo}>
            <span className={styles.statNumber}>{stats.pending}</span>
            <span className={styles.statLabel}>Em análise</span>
          </div>
        </div>
        <div className={[styles.statCard, styles.statBlue].join(' ')}>
          <div className={styles.statIcon}>🏠</div>
          <div className={styles.statInfo}>
            <span className={styles.statNumber}>{stats.adopted}</span>
            <span className={styles.statLabel}>Adotados</span>
          </div>
        </div>
      </div>

      <div className={styles.gridTwo}>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Animais por espécie</h3>
          <div className={styles.speciesList}>
            <div className={styles.speciesItem}>
              <div className={styles.speciesLeft}>
                <span className={styles.speciesEmoji}>🐶</span>
                <span className={styles.speciesName}>Cachorros</span>
              </div>
              <div className={styles.speciesRight}>
                <div
                  className={styles.speciesBar}
                  style={{ width: `${stats.total ? (stats.dogs / stats.total) * 100 : 0}%` }}
                />
                <span className={styles.speciesCount}>{stats.dogs}</span>
              </div>
            </div>
            <div className={styles.speciesItem}>
              <div className={styles.speciesLeft}>
                <span className={styles.speciesEmoji}>🐱</span>
                <span className={styles.speciesName}>Gatos</span>
              </div>
              <div className={styles.speciesRight}>
                <div
                  className={styles.speciesBar}
                  style={{ width: `${stats.total ? (stats.cats / stats.total) * 100 : 0}%` }}
                />
                <span className={styles.speciesCount}>{stats.cats}</span>
              </div>
            </div>
            <div className={styles.speciesItem}>
              <div className={styles.speciesLeft}>
                <span className={styles.speciesEmoji}>🐰</span>
                <span className={styles.speciesName}>Coelhos</span>
              </div>
              <div className={styles.speciesRight}>
                <div
                  className={styles.speciesBar}
                  style={{ width: `${stats.total ? (stats.rabbits / stats.total) * 100 : 0}%` }}
                />
                <span className={styles.speciesCount}>{stats.rabbits}</span>
              </div>
            </div>
            <div className={styles.speciesItem}>
              <div className={styles.speciesLeft}>
                <span className={styles.speciesEmoji}>🐾</span>
                <span className={styles.speciesName}>Outros</span>
              </div>
              <div className={styles.speciesRight}>
                <div
                  className={styles.speciesBar}
                  style={{ width: `${stats.total ? (stats.others / stats.total) * 100 : 0}%` }}
                />
                <span className={styles.speciesCount}>{stats.others}</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Saúde dos animais</h3>
          <div className={styles.healthList}>
            <div className={styles.healthItem}>
              <span className={styles.healthLabel}>Vacinados</span>
              <div className={styles.healthBar}>
                <div
                  className={[styles.healthBarFill, styles.healthBarGreen].join(' ')}
                  style={{ width: `${stats.total ? (stats.vaccinated / stats.total) * 100 : 0}%` }}
                />
              </div>
              <span className={styles.healthCount}>
                {stats.vaccinated}/{stats.total}
              </span>
            </div>
            <div className={styles.healthItem}>
              <span className={styles.healthLabel}>Castrados</span>
              <div className={styles.healthBar}>
                <div
                  className={[styles.healthBarFill, styles.healthBarBlue].join(' ')}
                  style={{ width: `${stats.total ? (stats.neutered / stats.total) * 100 : 0}%` }}
                />
              </div>
              <span className={styles.healthCount}>
                {stats.neutered}/{stats.total}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.tableHeader}>
          <h3 className={styles.cardTitle}>Animais recentes</h3>
          <Link to="/admin/animals" className={styles.viewAll}>
            Ver todos
          </Link>
        </div>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.th}>Animal</th>
                <th className={styles.th}>Espécie</th>
                <th className={styles.th}>Cidade</th>
                <th className={styles.th}>Status</th>
                <th className={styles.th}>Cadastrado em</th>
                <th className={styles.th}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {recentAnimals.map((animal) => (
                <tr key={animal.id} className={styles.tr}>
                  <td className={styles.td}>
                    <div className={styles.animalCell}>
                      <img
                        src={animal.images[0]}
                        alt={animal.name}
                        className={styles.animalThumb}
                      />
                      <div>
                        <p className={styles.animalName}>{animal.name}</p>
                        <p className={styles.animalBreed}>{animal.breed}</p>
                      </div>
                    </div>
                  </td>
                  <td className={styles.td}>
                    <span className={styles.speciesTag}>
                      {animal.species === 'dog' && '🐶'}
                      {animal.species === 'cat' && '🐱'}
                      {animal.species === 'rabbit' && '🐰'}
                      {animal.species === 'bird' && '🐦'}
                      {animal.species === 'other' && '🐾'}
                    </span>
                  </td>
                  <td className={styles.td}>{animal.city}</td>
                  <td className={styles.td}>
                    <span
                      className={[
                        styles.statusBadge,
                        animal.status === 'available'
                          ? styles.statusAvailable
                          : animal.status === 'pending'
                          ? styles.statusPending
                          : styles.statusAdopted,
                      ].join(' ')}
                    >
                      {animal.status === 'available'
                        ? 'Disponível'
                        : animal.status === 'pending'
                        ? 'Em análise'
                        : 'Adotado'}
                    </span>
                  </td>
                  <td className={styles.td}>{formatDate(animal.createdAt)}</td>
                  <td className={styles.td}>
                    <div className={styles.actions}>
                      <Link to={`/animals/${animal.id}`} className={styles.actionBtn} target="_blank">
                        👁️
                      </Link>
                      <Link to={`/admin/animals/${animal.id}/edit`} className={styles.actionBtn}>
                        ✏️
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
