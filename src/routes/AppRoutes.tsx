import React from 'react'
import { Routes, Route } from 'react-router-dom'
import MainLayout from '../components/MainLayout/MainLayout'
import AdminLayout from '../components/AdminLayout/AdminLayout'
import PrivateRoute from './PrivateRoute'

import Home from '../pages/Homes/Home'
import Animals from '../pages/Animals/Animals'
import AnimalDetail from '../pages/AnimalDetail/AnimalDetail'
import About from '../pages/About/About'
import Contact from '../pages/Contact/Contact'
import Login from '../pages/Login/Login'
import NotFound from '../pages/NotFound/NotFound'

import Dashboard from '../pages/Admin/Dashboard/Dashboard'
import AdminAnimalList from '../pages/Admin/AnimalList/AnimalList'

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/animals" element={<Animals />} />
        <Route path="/animals/:id" element={<AnimalDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      <Route
        path="/admin"
        element={
          <PrivateRoute>
            <AdminLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="animals" element={<AdminAnimalList />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
