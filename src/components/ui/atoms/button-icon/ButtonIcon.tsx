import styles from './ButtonIcon.module.scss'
interface ButtonIconProps {
  icon: React.ReactNode
}
export const ButtonIcon:React.FC<ButtonIconProps> = ({icon}) => {
  return (
    <button className={styles.buttonIcon}>
      {icon}
    </button>
  )
}