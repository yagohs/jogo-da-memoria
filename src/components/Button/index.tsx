
import styles from './Button.module.css'

type Props = {
    label: string;
    icon?: any;
    onClick: React.MouseEventHandler<HTMLDivElement>;
}

export const Button = ({label, icon, onClick}: Props) => {
    return (
        <div className={styles.container} onClick= {onClick}>
            {icon &&
                <div className={styles.iconArea}>
                    <img src={icon} alt="" />
                </div>
            }
            <div className={styles.label}>{label}</div>
        </div>
    )
}