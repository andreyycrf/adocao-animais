import React, { useState } from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import styles from './AdminLayout.module.css'
import { useAuth } from '../../hooks/useAuth'

const AdminLayout: React.FC = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className={styles.layout}>
      <button
        className={styles.sidebarToggle}
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        aria-label="Abrir menu lateral"
      >
        ☰
      </button>

      <aside className={[styles.sidebar, isSidebarOpen ? styles.sidebarOpen : ''].join(' ')}>
        <div className={styles.sidebarHeader}>
          <span className={styles.logoIcon}>🐾</span>
          <span className={styles.logoText}>AdotaPet</span>
        </div>

        <div className={styles.orgInfo}>
          <div className={styles.orgAvatar}>
            {user?.organizationName?.charAt(0) ?? 'O'}
          </div>
          <div className={styles.orgDetails}>
            <p className={styles.orgName}>{user?.organizationName}</p>
            <p className={styles.orgEmail}>{user?.email}</p>
          </div>
        </div>

        <nav className={styles.nav}>
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              [styles.navLink, isActive ? styles.navLinkActive : ''].join(' ')
            }
            end
            onClick={() => setIsSidebarOpen(false)}
          >
            <span className={styles.navIcon}>📊</span>
            Dashboard
          </NavLink>
          <NavLink
            to="/admin/animals"
            className={({ isActive }) =>
              [styles.navLink, isActive ? styles.navLinkActive : ''].join(' ')
            }
            onClick={() => setIsSidebarOpen(false)}
          >
            <span className={styles.navIcon}>🐾</span>
            Gerenciar Animais
          </NavLink>
          <NavLink
            to="/admin/animals/new"
            className={({ isActive }) =>
              [styles.navLink, isActive ? styles.navLinkActive : ''].join(' ')
            }
            onClick={() => setIsSidebarOpen(false)}
          >
            <span className={styles.navIcon}>➕</span>
            Cadastrar Animal
          </NavLink>
        </nav>

        <div className={styles.sidebarFooter}>
          <NavLink to="/" className={styles.backLink} onClick={() => setIsSidebarOpen(false)}>
            ← Voltar ao site
          </NavLink>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            🚪 Sair
          </button>
        </div>
      </aside>

      {isSidebarOpen && (
        <div
          className={styles.overlay}
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  )
}

export default AdminLayout
