import styles from './App.module.css';
import logoImage from './assets/devmemory_logo.png';

const App = () => {
  return (
    <div className={styles.container}>
      <div className={styles.Info}>
        <div className={styles.logoLink}>
            <img src={logoImage} alt="" width="200" />
        </div>

        <div className={styles.infoArea}>
          ...
        </div>

        <button>Reiniciar</button>
      </div>

      <div className={styles.gridArea}>
        ...
      </div>
    </div>
  )
}

export default App;