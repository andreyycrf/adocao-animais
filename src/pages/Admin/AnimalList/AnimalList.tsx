import React, { useState, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './AnimalList.module.css'
import Button from '../../../components/Button/Button.tsx'
import Input from '../../../components/Input/Input'
import Modal from '../../../components/Modal/Modal'
import { useAnimals } from '../../../hooks/useAnimals'
import { formatSpecies, formatSize, formatSex, formatAge, formatDate } from '../../../utils/formatters'
import { IAnimal } from '../../../interfaces/IAnimal'

const AdminAnimalList: React.FC = () => {
  const { animals, removeAnimal, updateAnimal } = useAnimals()
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [deleteTarget, setDeleteTarget] = useState<IAnimal | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return animals.filter(
      (a) =>
        a.name.toLowerCase().includes(q) ||
        a.breed.toLowerCase().includes(q) ||
        a.city.toLowerCase().includes(q)
    )
  }, [animals, search])

  const handleDelete = async () => {
    if (!deleteTarget) return
    setIsDeleting(true)
    await new Promise((r) => setTimeout(r, 500))
    removeAnimal(deleteTarget.id)
    setIsDeleting(false)
    setDeleteTarget(null)
  }

  const handleStatusChange = (animal: IAnimal, status: IAnimal['status']) => {
    updateAnimal(animal.id, { status })
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Gerenciar Animais</h1>
          <p className={styles.subtitle}>{animals.length} animais cadastrados</p>
        </div>
        <Button variant="primary" onClick={() => navigate('/admin/animals/new')}>
          ➕ Novo animal
        </Button>
      </div>

      <div className={styles.toolbar}>
        <Input
          placeholder="Buscar por nome, raça ou cidade..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          leftIcon={<span>🔍</span>}
        />
      </div>

      {filtered.length === 0 ? (
        <div className={styles.empty}>
          <span className={styles.emptyIcon}>🐾</span>
          <p className={styles.emptyText}>Nenhum animal encontrado</p>
        </div>
      ) : (
        <div className={styles.tableCard}>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.th}>Animal</th>
                  <th className={styles.th}>Espécie / Raça</th>
                  <th className={styles.th}>Idade / Porte</th>
                  <th className={styles.th}>Cidade</th>
                  <th className={styles.th}>Status</th>
                  <th className={styles.th}>Cadastrado</th>
                  <th className={styles.th}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((animal) => (
                  <tr key={animal.id} className={styles.tr}>
                    <td className={styles.td}>
                      <div className={styles.animalCell}>
                        <img
                          src={animal.images[0]}
                          alt={animal.name}
                          className={styles.thumb}
                        />
                        <div>
                          <p className={styles.animalName}>{animal.name}</p>
                          <p className={styles.animalSex}>{formatSex(animal.sex)}</p>
                        </div>
                      </div>
                    </td>
                    <td className={styles.td}>
                      <p>{formatSpecies(animal.species)}</p>
                      <p className={styles.subText}>{animal.breed}</p>
                    </td>
                    <td className={styles.td}>
                      <p>{formatAge(animal.age, animal.ageUnit)}</p>
                      <p className={styles.subText}>{formatSize(animal.size)}</p>
                    </td>
                    <td className={styles.td}>{animal.city}, {animal.state}</td>
                    <td className={styles.td}>
                      <select
                        className={[
                          styles.statusSelect,
                          animal.status === 'available'
                            ? styles.statusAvailable
                            : animal.status === 'pending'
                            ? styles.statusPending
                            : styles.statusAdopted,
                        ].join(' ')}
                        value={animal.status}
                        onChange={(e) =>
                          handleStatusChange(animal, e.target.value as IAnimal['status'])
                        }
                      >
                        <option value="available">Disponível</option>
                        <option value="pending">Em análise</option>
                        <option value="adopted">Adotado</option>
                      </select>
                    </td>
                    <td className={styles.td}>{formatDate(animal.createdAt)}</td>
                    <td className={styles.td}>
                      <div className={styles.actions}>
                        <Link
                          to={`/animals/${animal.id}`}
                          target="_blank"
                          className={styles.actionBtn}
                          title="Ver no site"
                        >
                          👁️
                        </Link>
                        <Link
                          to={`/admin/animals/${animal.id}/edit`}
                          className={styles.actionBtn}
                          title="Editar"
                        >
                          ✏️
                        </Link>
                        <button
                          className={[styles.actionBtn, styles.actionDelete].join(' ')}
                          onClick={() => setDeleteTarget(animal)}
                          title="Excluir"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <Modal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title="Confirmar exclusão"
        size="sm"
      >
        <div className={styles.deleteConfirm}>
          <span className={styles.deleteIcon}>⚠️</span>
          <p className={styles.deleteText}>
            Tem certeza que deseja excluir <strong>{deleteTarget?.name}</strong>? Esta ação não pode ser desfeita.
          </p>
          <div className={styles.deleteActions}>
            <Button variant="ghost" onClick={() => setDeleteTarget(null)}>
              Cancelar
            </Button>
            <Button variant="danger" isLoading={isDeleting} onClick={handleDelete}>
              Excluir
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default AdminAnimalList
