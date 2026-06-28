export interface IUser {
  id: string
  name: string
  email: string
  organizationName: string
  phone: string
  city: string
  state: string
  description: string
  website: string
  createdAt: string
}

export interface ILoginCredentials {
  email: string
  password: string
}

export interface IAuthState {
  user: IUser | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
}
