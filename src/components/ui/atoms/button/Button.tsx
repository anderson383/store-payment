import styles from './Button.module.scss'
interface ButtonProps {
  text: string
  type?: 'outlined' | 'simple' | 'rounded' | 'rounded_outlined',
  color?: 'primary' | 'secondary'
  size?: 'fullwidth' | 'md' | 'sm'
}

export const Button:React.FC<ButtonProps> = ({ text, type = ' simple', color = 'primary', size = 'md' }) => {
  return (
    <button
      className={
        `${styles.button}
        ${styles['button__' +type]}
        ${styles['button__' +size]}
        ${styles['button__' + color]}
        `
      }
    >
      {text}
    </button>
  )
}