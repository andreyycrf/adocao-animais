import React, { createContext, useCallback, useEffect, useState } from 'react'
import { IAnimal } from '../interfaces/IAnimal'
import { animalService } from '../services/animalService'

interface AnimalsContextData {
  animals: IAnimal[]
  isLoading: boolean
  refresh: () => void
  addAnimal: (animal: Omit<IAnimal, 'id' | 'createdAt' | 'updatedAt'>) => IAnimal
  updateAnimal: (id: string, data: Partial<IAnimal>) => IAnimal | undefined
  removeAnimal: (id: string) => boolean
  getAnimalById: (id: string) => IAnimal | undefined
}

export const AnimalsContext = createContext<AnimalsContextData>({} as AnimalsContextData)

interface AnimalsProviderProps {
  children: React.ReactNode
}

export const AnimalsProvider: React.FC<AnimalsProviderProps> = ({ children }) => {
  const [animals, setAnimals] = useState<IAnimal[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const refresh = useCallback((): void => {
    setIsLoading(true)
    const data = animalService.getAll()
    setAnimals(data)
    setIsLoading(false)
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  const addAnimal = useCallback(
    (animal: Omit<IAnimal, 'id' | 'createdAt' | 'updatedAt'>): IAnimal => {
      const newAnimal = animalService.create(animal)
      setAnimals((prev) => [...prev, newAnimal])
      return newAnimal
    },
    []
  )

  const updateAnimal = useCallback(
    (id: string, data: Partial<IAnimal>): IAnimal | undefined => {
      const updated = animalService.update(id, data)
      if (updated) {
        setAnimals((prev) => prev.map((a) => (a.id === id ? updated : a)))
      }
      return updated
    },
    []
  )

  const removeAnimal = useCallback((id: string): boolean => {
    const result = animalService.remove(id)
    if (result) {
      setAnimals((prev) => prev.filter((a) => a.id !== id))
    }
    return result
  }, [])

  const getAnimalById = useCallback(
    (id: string): IAnimal | undefined => {
      return animals.find((a) => a.id === id)
    },
    [animals]
  )

  return (
    <AnimalsContext.Provider
      value={{
        animals,
        isLoading,
        refresh,
        addAnimal,
        updateAnimal,
        removeAnimal,
        getAnimalById,
      }}
    >
      {children}
    </AnimalsContext.Provider>
  )
}
