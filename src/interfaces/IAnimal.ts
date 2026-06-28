export interface IAnimal {
  id: string
  name: string
  species: 'dog' | 'cat' | 'rabbit' | 'bird' | 'other'
  breed: string
  age: number
  ageUnit: 'months' | 'years'
  sex: 'male' | 'female'
  size: 'small' | 'medium' | 'large'
  color: string
  city: string
  state: string
  description: string
  images: string[]
  vaccinated: boolean
  neutered: boolean
  dewormed: boolean
  microchipped: boolean
  status: 'available' | 'adopted' | 'pending'
  organizationId: string
  organizationName: string
  organizationPhone: string
  organizationEmail: string
  createdAt: string
  updatedAt: string
}

export interface IAdoptionForm {
  name: string
  email: string
  phone: string
  city: string
  state: string
  message: string
  animalId: string
  animalName: string
}
