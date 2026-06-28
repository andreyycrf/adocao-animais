import React from 'react'
import styles from './FilterPanel.module.css'
import Select from '../Select/Select'
import Input from '../Input/Input'
import { IFilter } from '../../interfaces/IFilter'
import { SelectOption } from '../../types'

interface FilterPanelProps {
  filters: IFilter
  onFilterChange: (key: keyof IFilter, value: string) => void
  onReset: () => void
  hasActiveFilters: boolean
  cities: string[]
}

const speciesOptions: SelectOption[] = [
  { value: 'dog', label: 'Cachorro' },
  { value: 'cat', label: 'Gato' },
  { value: 'rabbit', label: 'Coelho' },
  { value: 'bird', label: 'Pássaro' },
  { value: 'other', label: 'Outro' },
]

const sizeOptions: SelectOption[] = [
  { value: 'small', label: 'Pequeno' },
  { value: 'medium', label: 'Médio' },
  { value: 'large', label: 'Grande' },
]

const sexOptions: SelectOption[] = [
  { value: 'male', label: 'Macho' },
  { value: 'female', label: 'Fêmea' },
]

const statusOptions: SelectOption[] = [
  { value: 'available', label: 'Disponível' },
  { value: 'pending', label: 'Em análise' },
  { value: 'adopted', label: 'Adotado' },
]

const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  onFilterChange,
  onReset,
  hasActiveFilters,
  cities,
}) => {
  const cityOptions: SelectOption[] = cities.map((c) => ({ value: c, label: c }))

  return (
    <aside className={styles.panel}>
      <div className={styles.header}>
        <h3 className={styles.title}>Filtros</h3>
        {hasActiveFilters && (
          <button className={styles.resetBtn} onClick={onReset}>
            Limpar filtros
          </button>
        )}
      </div>

      <div className={styles.filters}>
        <Select
          label="Espécie"
          options={speciesOptions}
          placeholder="Todas"
          value={filters.species}
          onChange={(e) => onFilterChange('species', e.target.value)}
        />

        <Select
          label="Porte"
          options={sizeOptions}
          placeholder="Todos"
          value={filters.size}
          onChange={(e) => onFilterChange('size', e.target.value)}
        />

        <Select
          label="Sexo"
          options={sexOptions}
          placeholder="Todos"
          value={filters.sex}
          onChange={(e) => onFilterChange('sex', e.target.value)}
        />

        <div className={styles.ageGroup}>
          <p className={styles.ageLabel}>Idade (anos)</p>
          <div className={styles.ageInputs}>
            <Input
              placeholder="Mín."
              type="number"
              min="0"
              value={filters.ageMin}
              onChange={(e) => onFilterChange('ageMin', e.target.value)}
            />
            <span className={styles.ageSeparator}>até</span>
            <Input
              placeholder="Máx."
              type="number"
              min="0"
              value={filters.ageMax}
              onChange={(e) => onFilterChange('ageMax', e.target.value)}
            />
          </div>
        </div>

        <Select
          label="Cidade"
          options={cityOptions}
          placeholder="Todas"
          value={filters.city}
          onChange={(e) => onFilterChange('city', e.target.value)}
        />

        <Select
          label="Status"
          options={statusOptions}
          placeholder="Todos"
          value={filters.status}
          onChange={(e) => onFilterChange('status', e.target.value)}
        />
      </div>
    </aside>
  )
}

export default FilterPanel
