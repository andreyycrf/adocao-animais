import { useState, useCallback, useMemo } from 'react'
import { IAnimal } from '../interfaces/IAnimal'
import { IFilter } from '../interfaces/IFilter'

const defaultFilters: IFilter = {
  search: '',
  species: '',
  size: '',
  ageMin: '',
  ageMax: '',
  sex: '',
  city: '',
  status: '',
}

export const useFilters = (animals: IAnimal[]) => {
  const [filters, setFilters] = useState<IFilter>(defaultFilters)

  const updateFilter = useCallback((key: keyof IFilter, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }, [])

  const resetFilters = useCallback(() => {
    setFilters(defaultFilters)
  }, [])

  const filteredAnimals = useMemo(() => {
    return animals.filter((animal) => {
      if (filters.search) {
        const search = filters.search.toLowerCase()
        const matches =
          animal.name.toLowerCase().includes(search) ||
          animal.breed.toLowerCase().includes(search) ||
          animal.city.toLowerCase().includes(search) ||
          animal.description.toLowerCase().includes(search)
        if (!matches) return false
      }

      if (filters.species && animal.species !== filters.species) return false
      if (filters.size && animal.size !== filters.size) return false
      if (filters.sex && animal.sex !== filters.sex) return false
      if (filters.city && !animal.city.toLowerCase().includes(filters.city.toLowerCase()))
        return false
      if (filters.status && animal.status !== filters.status) return false

      if (filters.ageMin || filters.ageMax) {
        const ageInMonths =
          animal.ageUnit === 'years' ? animal.age * 12 : animal.age
        if (filters.ageMin) {
          const minMonths = parseInt(filters.ageMin) * 12
          if (ageInMonths < minMonths) return false
        }
        if (filters.ageMax) {
          const maxMonths = parseInt(filters.ageMax) * 12
          if (ageInMonths > maxMonths) return false
        }
      }

      return true
    })
  }, [animals, filters])

  const hasActiveFilters = useMemo(() => {
    return Object.values(filters).some((v) => v !== '')
  }, [filters])

  return {
    filters,
    filteredAnimals,
    updateFilter,
    resetFilters,
    hasActiveFilters,
  }
}
