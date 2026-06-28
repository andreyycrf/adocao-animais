import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './About.module.css'
import Button from '../../components/Button/Button.tsx'
import gatosImage from '../../assets/gatos.jpg'

const About: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroContent}>
            <h1 className={styles.title}>Sobre o AdotaPet</h1>
            <p className={styles.subtitle}>
              Uma plataforma criada para conectar animais que precisam de amor com famílias que têm amor para dar.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.mission}>
        <div className="container">
          <div className={styles.missionGrid}>
            <div className={styles.missionContent}>
              <span className={styles.sectionLabel}>Nossa missão</span>
              <h2 className={styles.sectionTitle}>Cada animal merece um lar</h2>
              <p className={styles.text}>
                O AdotaPet nasceu em 2020 com uma missão simples: facilitar o processo de adoção responsável de animais abandonados em todo o Brasil. Acreditamos que cada pet tem o direito a uma vida digna, cheia de amor e cuidados.
              </p>
              <p className={styles.text}>
                Conectamos ONGs, protetores independentes e adotantes de forma rápida, transparente e segura. Nossa plataforma é gratuita tanto para as organizações quanto para as pessoas que desejam adotar.
              </p>
              <Button variant="primary" onClick={() => navigate('/animals')}>
                Conhecer animais disponíveis
              </Button>
            </div>
            <div className={styles.missionImage}>
              <img src={gatosImage} alt="Gatos em ambiente acolhedor" />
            </div>
          </div>
        </div>
      </section>

      <section className={styles.values}>
        <div className="container">
          <div className={styles.valuesHeader}>
            <h2 className={styles.sectionTitle}>Nossos valores</h2>
            <p className={styles.sectionSubtitle}>
              Os princípios que guiam cada decisão que tomamos
            </p>
          </div>
          <div className={styles.valuesGrid}>
            <div className={styles.valueCard}>
              <span className={styles.valueIcon}>💚</span>
              <h3 className={styles.valueTitle}>Responsabilidade</h3>
              <p className={styles.valueDesc}>
                Promovemos adoção consciente e responsável, garantindo que cada animal encontre o lar certo.
              </p>
            </div>
            <div className={styles.valueCard}>
              <span className={styles.valueIcon}>🤝</span>
              <h3 className={styles.valueTitle}>Transparência</h3>
              <p className={styles.valueDesc}>
                Todas as informações sobre os animais são verdadeiras e completas para facilitar a decisão.
              </p>
            </div>
            <div className={styles.valueCard}>
              <span className={styles.valueIcon}>🔒</span>
              <h3 className={styles.valueTitle}>Segurança</h3>
              <p className={styles.valueDesc}>
                Verificamos as ONGs parceiras e garantimos um processo seguro para todos os envolvidos.
              </p>
            </div>
            <div className={styles.valueCard}>
              <span className={styles.valueIcon}>❤️</span>
              <h3 className={styles.valueTitle}>Amor</h3>
              <p className={styles.valueDesc}>
                Acreditamos que amor é a base de qualquer adoção bem-sucedida e duradoura.
              </p>
            </div>
            <div className={styles.valueCard}>
              <span className={styles.valueIcon}>🌍</span>
              <h3 className={styles.valueTitle}>Impacto Social</h3>
              <p className={styles.valueDesc}>
                Cada adoção reduz o número de animais nas ruas e promove bem-estar animal no Brasil.
              </p>
            </div>
            <div className={styles.valueCard}>
              <span className={styles.valueIcon}>🆓</span>
              <h3 className={styles.valueTitle}>Gratuidade</h3>
              <p className={styles.valueDesc}>
                Nossa plataforma é 100% gratuita para ONGs e adotantes, sem taxas ocultas.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.numbers}>
        <div className="container">
          <div className={styles.numbersGrid}>
            <div className={styles.numberItem}>
              <span className={styles.number}>5k+</span>
              <span className={styles.numberLabel}>Adoções realizadas</span>
            </div>
            <div className={styles.numberItem}>
              <span className={styles.number}>120+</span>
              <span className={styles.numberLabel}>ONGs parceiras</span>
            </div>
            <div className={styles.numberItem}>
              <span className={styles.number}>50+</span>
              <span className={styles.numberLabel}>Cidades atendidas</span>
            </div>
            <div className={styles.numberItem}>
              <span className={styles.number}>4.9</span>
              <span className={styles.numberLabel}>Avaliação média ⭐</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.team}>
        <div className="container">
          <div className={styles.teamHeader}>
            <h2 className={styles.sectionTitle}>Como funciona para ONGs</h2>
            <p className={styles.sectionSubtitle}>
              Processo simples para cadastrar sua organização e publicar animais
            </p>
          </div>
          <div className={styles.teamSteps}>
            <div className={styles.teamStep}>
              <div className={styles.teamStepNumber}>1</div>
              <h3 className={styles.teamStepTitle}>Cadastre sua ONG</h3>
              <p className={styles.teamStepDesc}>
                Acesse o painel administrativo usando suas credenciais e gerencie sua organização.
              </p>
            </div>
            <div className={styles.teamStep}>
              <div className={styles.teamStepNumber}>2</div>
              <h3 className={styles.teamStepTitle}>Publique animais</h3>
              <p className={styles.teamStepDesc}>
                Adicione fotos, informações detalhadas e o histórico de saúde de cada animal.
              </p>
            </div>
            <div className={styles.teamStep}>
              <div className={styles.teamStepNumber}>3</div>
              <h3 className={styles.teamStepTitle}>Receba interessados</h3>
              <p className={styles.teamStepDesc}>
                Candidatos enviam seus dados e você entra em contato para iniciar o processo.
              </p>
            </div>
            <div className={styles.teamStep}>
              <div className={styles.teamStepNumber}>4</div>
              <h3 className={styles.teamStepTitle}>Finalize a adoção</h3>
              <p className={styles.teamStepDesc}>
                Marque o animal como adotado e atualize o status na plataforma.
              </p>
            </div>
          </div>
          <div className={styles.teamCta}>
            <Button variant="primary" size="lg" onClick={() => navigate('/login')}>
              Acessar painel da ONG
            </Button>
            <Button variant="outline" size="lg" onClick={() => navigate('/contact')}>
              Dúvidas? Fale conosco
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
