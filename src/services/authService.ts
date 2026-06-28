import { IUser, ILoginCredentials } from '../interfaces/IUser'

const AUTH_KEY = 'petadoption_auth'
const USER_KEY = 'petadoption_user'

const mockUser: IUser = {
  id: '1',
  name: 'Admin ONG',
  email: 'admin@ong.com',
  organizationName: 'ONG Amigos dos Pets',
  phone: '11999990001',
  city: 'São Paulo',
  state: 'SP',
  description:
    'Somos uma ONG dedicada ao resgate e adoção responsável de animais abandonados desde 2010.',
  website: '[amigosdospets.org](https://amigosdospets.org)',
  createdAt: '2024-01-01T10:00:00Z',
}

const login = async (credentials: ILoginCredentials): Promise<{ user: IUser; token: string }> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (credentials.email === 'admin@ong.com' && credentials.password === 'admin123') {
        const token = 'mock-jwt-token-' + Date.now()
        localStorage.setItem(AUTH_KEY, token)
        localStorage.setItem(USER_KEY, JSON.stringify(mockUser))
        resolve({ user: mockUser, token })
      } else {
        reject(new Error('Email ou senha incorretos'))
      }
    }, 800)
  })
}

const logout = (): void => {
  localStorage.removeItem(AUTH_KEY)
  localStorage.removeItem(USER_KEY)
}

const getStoredToken = (): string | null => {
  return localStorage.getItem(AUTH_KEY)
}

const getStoredUser = (): IUser | null => {
  const stored = localStorage.getItem(USER_KEY)
  return stored ? (JSON.parse(stored) as IUser) : null
}

const isAuthenticated = (): boolean => {
  return !!getStoredToken()
}

export const authService = {
  login,
  logout,
  getStoredToken,
  getStoredUser,
  isAuthenticated,
}
