import React, { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import styles from './Animals.module.css'
import AnimalCard from '../../components/AnimalCard/AnimalCard'
import FilterPanel from '../../components/FilerPanel/FilterPanel'
import Input from '../../components/Input/Input'
import Pagination from '../../components/Pagination/Pagination'
import Spinner from '../../components/Spinner/Spinner'
import Button from '../../components/Button/Button.tsx'
import { useAnimals } from '../../hooks/useAnimals'
import { useFilters } from '../../hooks/useFilters'
import { IFilter } from '../../interfaces/IFilter'

const ITEMS_PER_PAGE = 9

const Animals: React.FC = () => {
  const { animals, isLoading } = useAnimals()
  const [searchParams] = useSearchParams()
  const [currentPage, setCurrentPage] = useState(1)
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const { filters, filteredAnimals, updateFilter, resetFilters, hasActiveFilters } =
    useFilters(animals)

  useEffect(() => {
    const species = searchParams.get('species')
    if (species) {
      updateFilter('species', species)
    }
  }, [])

  const cities = useMemo(() => {
    const citySet = new Set(animals.map((a) => a.city))
    return Array.from(citySet).sort()
  }, [animals])

  const totalPages = Math.ceil(filteredAnimals.length / ITEMS_PER_PAGE)
  const paginatedAnimals = filteredAnimals.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const handleFilterChange = (key: keyof IFilter, value: string) => {
    updateFilter(key, value)
    setCurrentPage(1)
  }

  const handleReset = () => {
    resetFilters()
    setCurrentPage(1)
  }

  const handleSearch = (value: string) => {
    updateFilter('search', value)
    setCurrentPage(1)
  }

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div className="container">
          <h1 className={styles.title}>Animais para adoção</h1>
          <p className={styles.subtitle}>
            Encontre seu novo companheiro entre os {animals.filter((a) => a.status === 'available').length} animais disponíveis
          </p>
        </div>
      </div>

      <div className="container">
        <div className={styles.searchBar}>
          <Input
            placeholder="Buscar por nome, raça, cidade..."
            value={filters.search}
            onChange={(e) => handleSearch(e.target.value)}
            leftIcon={<span>🔍</span>}
          />
          <button
            className={[styles.filterToggle, hasActiveFilters ? styles.filterToggleActive : ''].join(' ')}
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <span>⚙️</span>
            Filtros
            {hasActiveFilters && <span className={styles.filterBadge} />}
          </button>
        </div>

        <div className={styles.content}>
          <div
            className={[styles.filterSidebar, isFilterOpen ? styles.filterSidebarOpen : ''].join(' ')}
          >
            <FilterPanel
              filters={filters}
              onFilterChange={handleFilterChange}
              onReset={handleReset}
              hasActiveFilters={hasActiveFilters}
              cities={cities}
            />
          </div>

          <div className={styles.results}>
            <div className={styles.resultsHeader}>
              <p className={styles.resultCount}>
                {filteredAnimals.length}{' '}
                {filteredAnimals.length === 1 ? 'animal encontrado' : 'animais encontrados'}
              </p>
              {hasActiveFilters && (
                <button className={styles.clearBtn} onClick={handleReset}>
                  Limpar filtros
                </button>
              )}
            </div>

            {isLoading ? (
              <div className={styles.loadingCenter}>
                <Spinner size="lg" />
              </div>
            ) : paginatedAnimals.length === 0 ? (
              <div className={styles.empty}>
                <span className={styles.emptyIcon}>🐾</span>
                <h3 className={styles.emptyTitle}>Nenhum animal encontrado</h3>
                <p className={styles.emptyDesc}>
                  Tente ajustar seus filtros ou realizar uma busca diferente.
                </p>
                <Button variant="outline" onClick={handleReset}>
                  Limpar filtros
                </Button>
              </div>
            ) : (
              <>
                <div className={styles.grid}>
                  {paginatedAnimals.map((animal) => (
                    <AnimalCard key={animal.id} animal={animal} />
                  ))}
                </div>
                <div className={styles.paginationWrapper}>
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Animals
