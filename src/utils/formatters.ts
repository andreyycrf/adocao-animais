import { Species, Size, Sex, AnimalStatus } from '../types'

export const formatSpecies = (species: Species): string => {
  const map: Record<Species, string> = {
    dog: 'Cachorro',
    cat: 'Gato',
    rabbit: 'Coelho',
    bird: 'Pássaro',
    other: 'Outro',
  }
  return map[species] ?? species
}

export const formatSize = (size: Size): string => {
  const map: Record<Size, string> = {
    small: 'Pequeno',
    medium: 'Médio',
    large: 'Grande',
  }
  return map[size] ?? size
}

export const formatSex = (sex: Sex): string => {
  const map: Record<Sex, string> = {
    male: 'Macho',
    female: 'Fêmea',
  }
  return map[sex] ?? sex
}

export const formatStatus = (status: AnimalStatus): string => {
  const map: Record<AnimalStatus, string> = {
    available: 'Disponível',
    adopted: 'Adotado',
    pending: 'Em análise',
  }
  return map[status] ?? status
}

export const formatAge = (age: number, unit: 'months' | 'years'): string => {
  if (unit === 'months') {
    return age === 1 ? '1 mês' : `${age} meses`
  }
  return age === 1 ? '1 ano' : `${age} anos`
}

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

export const formatPhone = (phone: string): string => {
  const digits = phone.replace(/\D/g, '')
  if (digits.length === 11) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
  }
  if (digits.length === 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`
  }
  return phone
}

export const truncate = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text
  return `${text.slice(0, maxLength).trimEnd()}...`
}
