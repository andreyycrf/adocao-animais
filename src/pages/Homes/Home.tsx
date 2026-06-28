import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './Home.module.css'
import AnimalCard from '../../components/AnimalCard/AnimalCard'
import Button from '../../components/Button/Button.tsx'
import { useAnimals } from '../../hooks/useAnimals'
import Spinner from '../../components/Spinner/Spinner'
import cachorroImage from '../../assets/cachorro.avif'

const Home: React.FC = () => {
  const { animals, isLoading } = useAnimals()
  const navigate = useNavigate()

  const featuredAnimals = animals
    .filter((a) => a.status === 'available')
    .slice(0, 4)

  const stats = {
    total: animals.length,
    available: animals.filter((a) => a.status === 'available').length,
    adopted: animals.filter((a) => a.status === 'adopted').length,
    dogs: animals.filter((a) => a.species === 'dog').length,
    cats: animals.filter((a) => a.species === 'cat').length,
  }

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroContent}>
            <span className={styles.heroBadge}>🐾 Adoção Responsável</span>
            <h1 className={styles.heroTitle}>
              Transforme duas vidas com{' '}
              <span className={styles.heroHighlight}>um único gesto</span>
            </h1>
            <p className={styles.heroDescription}>
              Encontre seu companheiro ideal e dê um lar cheio de amor a um animal que mais precisa.
              Cadastramos pets de diversas ONGs parceiras em todo o Brasil.
            </p>
            <div className={styles.heroActions}>
              <Button
                size="lg"
                variant="primary"
                onClick={() => navigate('/animals')}
                rightIcon={<span>→</span>}
              >
                Ver animais disponíveis
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate('/about')}
              >
                Saiba mais
              </Button>
            </div>
          </div>

          <div className={styles.heroVisual}>
            <div className={styles.heroImage}>
              <img src={cachorroImage} alt="Cachorro e gato juntos" />
              <div className={styles.floatingCard}>
                <span className={styles.floatingEmoji}>🏠</span>
                <div>
                  <p className={styles.floatingTitle}>Mais de {stats.adopted} adotados</p>
                  <p className={styles.floatingSubtitle}>e novos a cada dia!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.stats}>
        <div className="container">
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <span className={styles.statNumber}>{stats.total}+</span>
              <span className={styles.statLabel}>Animais cadastrados</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statNumber}>{stats.available}</span>
              <span className={styles.statLabel}>Esperando um lar</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statNumber}>{stats.adopted}+</span>
              <span className={styles.statLabel}>Adoções realizadas</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statNumber}>100%</span>
              <span className={styles.statLabel}>Gratuito e responsável</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.featured}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle}>Animais esperando por você</h2>
              <p className={styles.sectionSubtitle}>
                Conheça alguns dos pets disponíveis para adoção agora
              </p>
            </div>
            <Link to="/animals" className={styles.seeAll}>
              Ver todos →
            </Link>
          </div>

          {isLoading ? (
            <div className={styles.loadingCenter}>
              <Spinner size="lg" />
            </div>
          ) : (
            <div className={styles.animalsGrid}>
              {featuredAnimals.map((animal) => (
                <AnimalCard key={animal.id} animal={animal} />
              ))}
            </div>
          )}

          <div className={styles.featuredCta}>
            <Button variant="primary" size="lg" onClick={() => navigate('/animals')}>
              Ver todos os animais
            </Button>
          </div>
        </div>
      </section>

      <section className={styles.howItWorks}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle}>Como funciona a adoção</h2>
              <p className={styles.sectionSubtitle}>
                Processo simples e responsável em poucos passos
              </p>
            </div>
          </div>
          <div className={styles.stepsGrid}>
            <div className={styles.step}>
              <div className={styles.stepNumber}>1</div>
              <div className={styles.stepIcon}>🔍</div>
              <h3 className={styles.stepTitle}>Busque e filtre</h3>
              <p className={styles.stepDesc}>
                Use nossos filtros para encontrar o pet ideal para o seu perfil e estilo de vida.
              </p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>2</div>
              <div className={styles.stepIcon}>💌</div>
              <h3 className={styles.stepTitle}>Demonstre interesse</h3>
              <p className={styles.stepDesc}>
                Preencha o formulário de interesse e aguarde o contato da ONG responsável.
              </p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>3</div>
              <div className={styles.stepIcon}>🤝</div>
              <h3 className={styles.stepTitle}>Conheça o animal</h3>
              <p className={styles.stepDesc}>
                Visite o animal, conheça sua personalidade e confirme que é a escolha certa.
              </p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>4</div>
              <div className={styles.stepIcon}>🏠</div>
              <h3 className={styles.stepTitle}>Leve para casa</h3>
              <p className={styles.stepDesc}>
                Após aprovação e assinatura do termo, leve seu novo companheiro para o novo lar!
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.categories}>
        <div className="container">
          <h2 className={styles.sectionTitle} style={{ textAlign: 'center', marginBottom: '2rem' }}>
            Buscar por espécie
          </h2>
          <div className={styles.categoriesGrid}>
            <Link to="/animals?species=dog" className={styles.categoryCard}>
              <span className={styles.categoryEmoji}>🐶</span>
              <span className={styles.categoryName}>Cachorros</span>
              <span className={styles.categoryCount}>{stats.dogs} disponíveis</span>
            </Link>
            <Link to="/animals?species=cat" className={styles.categoryCard}>
              <span className={styles.categoryEmoji}>🐱</span>
              <span className={styles.categoryName}>Gatos</span>
              <span className={styles.categoryCount}>{stats.cats} disponíveis</span>
            </Link>
            <Link to="/animals?species=rabbit" className={styles.categoryCard}>
              <span className={styles.categoryEmoji}>🐰</span>
              <span className={styles.categoryName}>Coelhos</span>
              <span className={styles.categoryCount}>
                {animals.filter((a) => a.species === 'rabbit').length} disponíveis
              </span>
            </Link>
            <Link to="/animals?species=bird" className={styles.categoryCard}>
              <span className={styles.categoryEmoji}>🐦</span>
              <span className={styles.categoryName}>Pássaros</span>
              <span className={styles.categoryCount}>
                {animals.filter((a) => a.species === 'bird').length} disponíveis
              </span>
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.cta}>
        <div className="container">
          <div className={styles.ctaBox}>
            <h2 className={styles.ctaTitle}>Sua ONG quer cadastrar animais?</h2>
            <p className={styles.ctaDesc}>
              Crie uma conta gratuita e comece a publicar animais para adoção agora mesmo.
            </p>
            <div className={styles.ctaActions}>
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate('/login')}
              >
                Acessar painel da ONG
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate('/contact')}
              >
                Entre em contato
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
