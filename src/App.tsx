import React from 'react';
import styles from './App.module.css'
import poweredImg from './assets/powered.png'
import { levels, calculateImc, Level } from './helpers/imc'
import GridItem from './components/GridItem/GridItem';
import leftArrowImage from './assets/leftarrow.png'

const App = () => {

  const [heightField, setHeightField] = React.useState<number>(0);
  const [weightField, setWeightField] = React.useState<number>(0);
  const [resultImc, setResultImc] = React.useState<Level | null>(null);

  const handleCalculateButton = () => {
    if (heightField && weightField > 0) {
      setResultImc(calculateImc(heightField, weightField));
      console.log(resultImc?.yourImc)
    } else {
      alert('Preencha todos os campos.')
    }
  }

  const handleBackButton = () => {
    setHeightField(0);
    setWeightField(0);
    setResultImc(null);
  }

  return <div className={styles.main}>
    <header>
      <div className={styles.headerContainer}>
        <img src={poweredImg} alt="logo" width={150} />
      </div>
    </header>
    <div className={styles.container}>
      <div className={styles.leftSide}>
        <h1>Calcule o seu IMC.</h1>
        <p>IMC é o seu Índice de Massa Corpórea, parâmetro adotado pela Organização Mundial da Saúde(OMS) para calcular o peso ideal de cada pessoa.</p>
        <input type="number"
          placeholder='Digite a sua altura. Ex: 1.55 (em metros)'
          value={heightField > 0 ? heightField : ''}
          onChange={event => setHeightField(parseFloat(event.target.value))}
          disabled={resultImc ? true : false}
        />
        <input type="number"
          placeholder='Digite o seu peso. Ex: 80.5 (em kilos)'
          value={weightField > 0 ? weightField : ''}
          onChange={event => setWeightField(parseFloat(event.target.value))}
          disabled={resultImc ? true : false}
        />
        <button disabled={resultImc ? true : false} onClick={handleCalculateButton}>Calcular</button>
      </div>
      <div className={styles.rightSide}>
        {!resultImc && <div className={styles.grid}>
          {levels.map((item, id) => (
            <GridItem item={item} key={id} />
          ))}
        </div>}
        {resultImc && <div className={styles.rightBig}>
          <div className={styles.rightArrow} onClick={handleBackButton}>
            <img src={leftArrowImage} alt="close button" width={25} />
          </div>
          <GridItem item={resultImc} />
        </div>}
      </div>
    </div>
  </div>
}

export default App