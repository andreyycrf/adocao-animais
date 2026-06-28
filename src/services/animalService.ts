import { IAnimal, IAdoptionForm } from '../interfaces/IAnimal'
import cachorroImage from '../assets/cachorro.avif'
import gatosImage from '../assets/gatos.jpg'

const STORAGE_KEY = 'petadoption_animals'
const sharedAnimalImages = [cachorroImage, gatosImage]

const normalizeAnimalImages = (animal: IAnimal): IAnimal => ({
  ...animal,
  images: [...sharedAnimalImages],
})

const defaultAnimals: IAnimal[] = [
  {
    id: '1',
    name: 'Thor',
    species: 'dog',
    breed: 'Labrador Retriever',
    age: 2,
    ageUnit: 'years',
    sex: 'male',
    size: 'large',
    color: 'Amarelo',
    city: 'São Paulo',
    state: 'SP',
    description:
      'Thor é um labrador cheio de energia e muito carinhoso. Ama brincar ao ar livre, é ótimo com crianças e se dá bem com outros pets. Está vacinado, castrado e vermifugado. Procura uma família com espaço e muito amor para oferecer.',
    images: [
      '[images.unsplash.com](https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&h=400&fit=crop)',
      '[images.unsplash.com](https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&h=400&fit=crop)',
    ],
    vaccinated: true,
    neutered: true,
    dewormed: true,
    microchipped: false,
    status: 'available',
    organizationId: '1',
    organizationName: 'ONG Amigos dos Pets',
    organizationPhone: '11999990001',
    organizationEmail: 'contato@amigosdospets.org',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    name: 'Luna',
    species: 'cat',
    breed: 'Siamês',
    age: 3,
    ageUnit: 'years',
    sex: 'female',
    size: 'small',
    color: 'Creme e marrom',
    city: 'Rio de Janeiro',
    state: 'RJ',
    description:
      'Luna é uma gatinha siamesa muito elegante e carinhosa. Gosta de ficar no colo e de ser penteada. É tranquila e se adapta bem a apartamentos. Já está castrada e vacinada.',
    images: [
      'gatos.jpg'
    ],
    vaccinated: true,
    neutered: true,
    dewormed: true,
    microchipped: true,
    status: 'available',
    organizationId: '1',
    organizationName: 'ONG Amigos dos Pets',
    organizationPhone: '11999990001',
    organizationEmail: 'contato@amigosdospets.org',
    createdAt: '2024-01-20T10:00:00Z',
    updatedAt: '2024-01-20T10:00:00Z',
  },
  {
    id: '3',
    name: 'Bob',
    species: 'dog',
    breed: 'Shih Tzu',
    age: 8,
    ageUnit: 'months',
    sex: 'male',
    size: 'small',
    color: 'Branco e marrom',
    city: 'Belo Horizonte',
    state: 'MG',
    description:
      'Bob é um Shih Tzu filhote muito brincalhão e afetivo. Adora atenção e é perfeito para apartamentos. Está vacinado e vermifugado, pronto para sua nova família.',
    images: [
      '[images.unsplash.com](https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&h=400&fit=crop)',
    ],
    vaccinated: true,
    neutered: false,
    dewormed: true,
    microchipped: false,
    status: 'available',
    organizationId: '1',
    organizationName: 'ONG Amigos dos Pets',
    organizationPhone: '11999990001',
    organizationEmail: 'contato@amigosdospets.org',
    createdAt: '2024-02-01T10:00:00Z',
    updatedAt: '2024-02-01T10:00:00Z',
  },
  {
    id: '4',
    name: 'Mia',
    species: 'cat',
    breed: 'SRD',
    age: 1,
    ageUnit: 'years',
    sex: 'female',
    size: 'small',
    color: 'Laranja e branco',
    city: 'São Paulo',
    state: 'SP',
    description:
      'Mia é uma gata SRD muito dócil e independente. Ela se dá bem com outros gatos e é bastante curiosa. Está castrada e vacinada, pronta para um lar amoroso.',
    images: [
      '[images.unsplash.com](https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=600&h=400&fit=crop)',
    ],
    vaccinated: true,
    neutered: true,
    dewormed: true,
    microchipped: false,
    status: 'available',
    organizationId: '1',
    organizationName: 'ONG Amigos dos Pets',
    organizationPhone: '11999990001',
    organizationEmail: 'contato@amigosdospets.org',
    createdAt: '2024-02-10T10:00:00Z',
    updatedAt: '2024-02-10T10:00:00Z',
  },
  {
    id: '5',
    name: 'Rex',
    species: 'dog',
    breed: 'Pastor Alemão',
    age: 4,
    ageUnit: 'years',
    sex: 'male',
    size: 'large',
    color: 'Preto e marrom',
    city: 'Curitiba',
    state: 'PR',
    description:
      'Rex é um pastor alemão inteligente, leal e protetor. É muito obediente e já tem treinamento básico. Precisa de espaço e exercício diário. Ama sua família e é ótimo guarda.',
    images: [
      '[images.unsplash.com](https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=600&h=400&fit=crop)',
    ],
    vaccinated: true,
    neutered: true,
    dewormed: true,
    microchipped: true,
    status: 'available',
    organizationId: '1',
    organizationName: 'ONG Amigos dos Pets',
    organizationPhone: '11999990001',
    organizationEmail: 'contato@amigosdospets.org',
    createdAt: '2024-02-15T10:00:00Z',
    updatedAt: '2024-02-15T10:00:00Z',
  },
  {
    id: '6',
    name: 'Mel',
    species: 'rabbit',
    breed: 'Angorá',
    age: 6,
    ageUnit: 'months',
    sex: 'female',
    size: 'small',
    color: 'Branco',
    city: 'Porto Alegre',
    state: 'RS',
    description:
      'Mel é uma coelha Angorá super fofa e dócil. Ela adora ser acariciada e é muito calma. Ideal para quem quer um pet diferente e carinhoso.',
    images: [
      '[images.unsplash.com](https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=600&h=400&fit=crop)',
    ],
    vaccinated: false,
    neutered: false,
    dewormed: true,
    microchipped: false,
    status: 'available',
    organizationId: '1',
    organizationName: 'ONG Amigos dos Pets',
    organizationPhone: '11999990001',
    organizationEmail: 'contato@amigosdospets.org',
    createdAt: '2024-03-01T10:00:00Z',
    updatedAt: '2024-03-01T10:00:00Z',
  },
  {
    id: '7',
    name: 'Nina',
    species: 'dog',
    breed: 'Poodle',
    age: 5,
    ageUnit: 'years',
    sex: 'female',
    size: 'medium',
    color: 'Bege',
    city: 'Salvador',
    state: 'BA',
    description:
      'Nina é uma poodle muito inteligente e alegre. Ela ama brincar e se dá muito bem com crianças. Está castrada, vacinada e pronta para seu novo lar.',
    images: [
      '[images.unsplash.com](https://images.unsplash.com/photo-1596797882870-8c33db67e0a5?w=600&h=400&fit=crop)',
    ],
    vaccinated: true,
    neutered: true,
    dewormed: true,
    microchipped: false,
    status: 'available',
    organizationId: '1',
    organizationName: 'ONG Amigos dos Pets',
    organizationPhone: '11999990001',
    organizationEmail: 'contato@amigosdospets.org',
    createdAt: '2024-03-10T10:00:00Z',
    updatedAt: '2024-03-10T10:00:00Z',
  },
  {
    id: '8',
    name: 'Simba',
    species: 'cat',
    breed: 'Maine Coon',
    age: 2,
    ageUnit: 'years',
    sex: 'male',
    size: 'medium',
    color: 'Tigrado marrom',
    city: 'Fortaleza',
    state: 'CE',
    description:
      'Simba é um Maine Coon majestoso e muito carinhoso. Apesar do tamanho, é muito gentil e adora brincar. Está vacinado e vermifugado.',
    images: [
      '[images.unsplash.com](https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=600&h=400&fit=crop)',
    ],
    vaccinated: true,
    neutered: true,
    dewormed: true,
    microchipped: false,
    status: 'pending',
    organizationId: '1',
    organizationName: 'ONG Amigos dos Pets',
    organizationPhone: '11999990001',
    organizationEmail: 'contato@amigosdospets.org',
    createdAt: '2024-03-15T10:00:00Z',
    updatedAt: '2024-03-15T10:00:00Z',
  },
]

const initializeStorage = (): void => {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) {
    const animalsWithImages = defaultAnimals.map(normalizeAnimalImages)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(animalsWithImages))
  }
}

const getAll = (): IAnimal[] => {
  initializeStorage()
  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) return []

  const parsed = JSON.parse(stored) as IAnimal[]
  return parsed.map(normalizeAnimalImages)
}

const getById = (id: string): IAnimal | undefined => {
  return getAll().find((a) => a.id === id)
}

const create = (animal: Omit<IAnimal, 'id' | 'createdAt' | 'updatedAt'>): IAnimal => {
  const animals = getAll()
  const newAnimal: IAnimal = {
    ...animal,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  animals.push(newAnimal)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(animals))
  return newAnimal
}

const update = (id: string, data: Partial<IAnimal>): IAnimal | undefined => {
  const animals = getAll()
  const index = animals.findIndex((a) => a.id === id)
  if (index === -1) return undefined
  animals[index] = { ...animals[index], ...data, updatedAt: new Date().toISOString() }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(animals))
  return animals[index]
}

const remove = (id: string): boolean => {
  const animals = getAll()
  const filtered = animals.filter((a) => a.id !== id)
  if (filtered.length === animals.length) return false
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
  return true
}

const submitAdoptionForm = (form: IAdoptionForm): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Adoption form submitted:', form)
      resolve(true)
    }, 1000)
  })
}

export const animalService = {
  getAll,
  getById,
  create,
  update,
  remove,
  submitAdoptionForm,
}
