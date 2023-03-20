import { useEffect, useState } from 'react';
import styles from './App.module.css';

import logoImage from './assets/devmemory_logo.png';
import RestartIcon from './svgs/restart.svg';

import { Button } from './components/Button';
import { InfoItem } from './components/InfoItem/index';
import { GridItem } from './components/GridItem';

import { GridItemType } from './types/GridItemType';
import { items } from './data/items'
import { formatTimeElapsed } from './helpers/formatTimeElapsed';



const App = () => {
  const [playing, setPlaying] = useState<boolean>(false);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [moveCount, setMoveCount] = useState<number>(0);
  const [showCount, setShowCount] = useState<number>(0);
  const [gridItems, setGridItems] = useState<GridItemType[]>([]);

  useEffect(() => resetAndCreatGrid(), []);

  useEffect(() => {
    const timer = setInterval(() => {
      if(playing) {
        setTimeElapsed(timeElapsed + 1);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [playing, timeElapsed]);


  useEffect(() => {
    //verificar se os abertos são iguais
    if(showCount === 2) {
      let opened = gridItems.filter(item => item.shown === true);
      if(opened.length === 2) {

        //v1 se eles são iguais, torna-los permanentes
        if(opened[0].item === opened[1].item) {
          let tmpGrid = [...gridItems];
          for (let i in tmpGrid) {
            if(tmpGrid[i].shown) {
              tmpGrid[i].permanentShown = true;
              tmpGrid[i].shown = false;
            }
          }
          setGridItems(tmpGrid);
          setShowCount(0);

        } else {
          // se são diferentes, feche todos
          setTimeout(() => {
            let tmpGrid = [...gridItems];
            for(let i in tmpGrid) {
              tmpGrid[i].shown = false;
            }
            setGridItems(tmpGrid);
            setShowCount(0);
          }, 1000);
        }
        setMoveCount(moveCount => moveCount + 1)
      }
    }
  }, [showCount, gridItems]);
  
  // verificar fim de jogo
  useEffect(()=>{
    if(moveCount > 0 && gridItems.every(item => item.permanentShown === true)) {
      setPlaying(false);
    }
  },[moveCount,gridItems])

  const resetAndCreatGrid = () => {
    // passo 1 - resetar o jogo
    setTimeElapsed(0);
    setMoveCount(0);
    setShowCount(0);

    // passo 2 - crair o grid

    //passo 2.1 - criar um grid vazio
  let tmpGrid: GridItemType[ ] = [];
  for(let i = 0; i < (items.length * 2); i++) {
    tmpGrid.push ({
      item: null,
      shown: false,
      permanentShown: false,
    });
  }

  // 2.2 - preencher o grid

  for(let w = 0; w < 2; w++) {
    for(let i = 0; i < items.length; i++) {
      let pos = -1;
      while(pos < 0 || tmpGrid[pos].item !== null) {
        pos =Math.floor(Math.random() * (items.length * 2));
      }     
      tmpGrid[pos].item = i;
    }
  }
  

  // 2.3 - jogar no state
  setGridItems(tmpGrid);

  //passo 3 - começar o jogo
  setPlaying(true);
  }

  const handleItemClick =(index:number) => {
    if(playing && index !== null && showCount < 2) {
      let tmpGrid = [...gridItems];

      if(tmpGrid[index].permanentShown === false && tmpGrid[index].shown === false) {
        tmpGrid[index].shown = true;
        setShowCount(showCount + 1);
      }

      setGridItems(tmpGrid);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.Info}>
        <div className={styles.logoLink}>
            <img src={logoImage} alt="" width="200" />
        </div>

        <div className={styles.infoArea}>
           <InfoItem label='Tempo' value={formatTimeElapsed(timeElapsed)}/>

           <InfoItem label='Movimento' value={moveCount.toString()}/>
        </div>

        <Button label="Reiniciar" icon={RestartIcon} onClick={resetAndCreatGrid}/>
      </div>

      <div className={styles.gridArea}>
        <div className={styles.grid}>
          {gridItems.map((item, index) => (
            <GridItem 
              key={index}
              item={item}
              onClick={() => handleItemClick(index)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default App;