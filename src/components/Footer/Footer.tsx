import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <Link to="/" className={styles.logo}>
              <span className={styles.logoIcon}>🐾</span>
              <span className={styles.logoText}>AdotaPet</span>
            </Link>
            <p className={styles.tagline}>
              Conectando animais que precisam de lar com famílias cheias de amor.
            </p>
            <div className={styles.social}>
              <a href="[instagram.com](https://instagram.com)" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Instagram">
                📷
              </a>
              <a href="[facebook.com](https://facebook.com)" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Facebook">
                📘
              </a>
              <a href="[twitter.com](https://twitter.com)" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Twitter">
                🐦
              </a>
            </div>
          </div>

          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Navegação</h4>
            <ul className={styles.list}>
              <li><Link to="/" className={styles.link}>Início</Link></li>
              <li><Link to="/animals" className={styles.link}>Animais</Link></li>
              <li><Link to="/about" className={styles.link}>Sobre</Link></li>
              <li><Link to="/contact" className={styles.link}>Contato</Link></li>
            </ul>
          </div>

          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Adoção</h4>
            <ul className={styles.list}>
              <li><Link to="/animals?species=dog" className={styles.link}>Cachorros</Link></li>
              <li><Link to="/animals?species=cat" className={styles.link}>Gatos</Link></li>
              <li><Link to="/animals?species=rabbit" className={styles.link}>Coelhos</Link></li>
              <li><Link to="/animals?species=bird" className={styles.link}>Pássaros</Link></li>
            </ul>
          </div>

          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Contato</h4>
            <ul className={styles.list}>
              <li className={styles.contactItem}>
                <span>📧</span>
                <span>contato@adotapet.com.br</span>
              </li>
              <li className={styles.contactItem}>
                <span>📞</span>
                <span>(11) 99999-0000</span>
              </li>
              <li className={styles.contactItem}>
                <span>📍</span>
                <span>São Paulo, SP</span>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {currentYear} AdotaPet. Todos os direitos reservados.
          </p>
          <p className={styles.madeWith}>
            Feito com ❤️ para os animais
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
