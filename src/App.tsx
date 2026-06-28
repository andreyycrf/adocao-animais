import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { AnimalsProvider } from './contexts/AnimalsContext'
import AppRoutes from './routes/AppRoutes'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AnimalsProvider>
          <AppRoutes />
        </AnimalsProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
