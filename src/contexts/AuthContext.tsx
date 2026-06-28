import React, { createContext, useCallback, useEffect, useState } from 'react'
import { IAuthState, ILoginCredentials } from '../interfaces/IUser'
import { authService } from '../services/authService'

interface AuthContextData extends IAuthState {
  login: (credentials: ILoginCredentials) => Promise<void>
  logout: () => void
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData)

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, setState] = useState<IAuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true,
  })

  useEffect(() => {
    const token = authService.getStoredToken()
    const user = authService.getStoredUser()
    if (token && user) {
      setState({ user, token, isAuthenticated: true, isLoading: false })
    } else {
      setState((prev) => ({ ...prev, isLoading: false }))
    }
  }, [])

  const login = useCallback(async (credentials: ILoginCredentials): Promise<void> => {
    setState((prev) => ({ ...prev, isLoading: true }))
    const { user, token } = await authService.login(credentials)
    setState({ user, token, isAuthenticated: true, isLoading: false })
  }, [])

  const logout = useCallback((): void => {
    authService.logout()
    setState({ user: null, token: null, isAuthenticated: false, isLoading: false })
  }, [])

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
