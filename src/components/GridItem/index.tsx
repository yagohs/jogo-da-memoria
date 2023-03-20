import { GridItemType } from '../../types/GridItemType';
import styles from './GridItem.module.css';
import hS from '../../svgs/hs.png'
import { items } from '../../data/items'

type Props = {
    item: GridItemType,
    onClick: () => void,
    //showBackground: any,  
}


export const GridItem = ({item, onClick}: Props) => {
    return (
        <div className={styles.container}
            onClick={onClick}
            
            //showBackground={item.permanentShown || item.shown}
            // olhar isso aqui depois
            //adicionar opacidade na imagem do hS depois com função
        >
            
            {item.permanentShown === false && item.shown === false &&
                
                <img src={hS} alt="" />

            }
            {(item.permanentShown || item.shown) && item.item !== null &&
                <img src={items[item.item].icon} alt="" />
            }          
        </div>
    )
}

