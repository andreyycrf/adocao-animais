import React from 'react'
import { Outlet } from 'react-router-dom'
import styles from './MainLayout.module.css'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'

const MainLayout: React.FC = () => {
  return (
    <div className={styles.layout}>
      <Navbar />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout
