import { useContext } from 'react'
import { AnimalsContext } from '../contexts/AnimalsContext'

export const useAnimals = () => {
  const context = useContext(AnimalsContext)
  if (!context) {
    throw new Error('useAnimals must be used within an AnimalsProvider')
  }
  return context
}
