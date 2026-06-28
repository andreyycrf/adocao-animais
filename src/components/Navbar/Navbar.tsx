import React, { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import styles from './Navbar.module.css'
import Button from '../Button/Button'
import { useAuth } from '../../hooks/useAuth'

const Navbar: React.FC = () => {
  const { isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  const handleLogout = () => {
    logout()
    navigate('/')
    setIsMenuOpen(false)
  }

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header className={[styles.navbar, isScrolled ? styles.scrolled : ''].join(' ')}>
      <div className={`container ${styles.inner}`}>
        <Link to="/" className={styles.logo} onClick={closeMenu}>
          <span className={styles.logoIcon}>🐾</span>
          <span className={styles.logoText}>AdotaPet</span>
        </Link>

        <nav
          className={[styles.nav, isMenuOpen ? styles.navOpen : ''].join(' ')}
          aria-label="Navegação principal"
        >
          <NavLink
            to="/"
            className={({ isActive }) => [styles.navLink, isActive ? styles.navLinkActive : ''].join(' ')}
            onClick={closeMenu}
            end
          >
            Início
          </NavLink>
          <NavLink
            to="/animals"
            className={({ isActive }) => [styles.navLink, isActive ? styles.navLinkActive : ''].join(' ')}
            onClick={closeMenu}
          >
            Animais
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => [styles.navLink, isActive ? styles.navLinkActive : ''].join(' ')}
            onClick={closeMenu}
          >
            Sobre
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) => [styles.navLink, isActive ? styles.navLinkActive : ''].join(' ')}
            onClick={closeMenu}
          >
            Contato
          </NavLink>

          <div className={styles.navActions}>
            {isAuthenticated ? (
              <>
                <NavLink
                  to="/admin"
                  className={({ isActive }) =>
                    [styles.navLink, isActive ? styles.navLinkActive : ''].join(' ')
                  }
                  onClick={closeMenu}
                >
                  Painel Admin
                </NavLink>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  Sair
                </Button>
              </>
            ) : (
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  navigate('/login')
                  closeMenu()
                }}
              >
                Login ONG
              </Button>
            )}
          </div>
        </nav>

        <button
          className={styles.menuBtn}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Abrir menu"
          aria-expanded={isMenuOpen}
        >
          <span className={[styles.menuLine, isMenuOpen ? styles.menuLineOpen1 : ''].join(' ')} />
          <span className={[styles.menuLine, isMenuOpen ? styles.menuLineOpen2 : ''].join(' ')} />
          <span className={[styles.menuLine, isMenuOpen ? styles.menuLineOpen3 : ''].join(' ')} />
        </button>
      </div>
    </header>
  )
}

export default Navbar
