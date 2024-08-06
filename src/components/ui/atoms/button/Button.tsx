import styles from './Button.module.scss'
interface ButtonProps {
  text: string
  onClick?: () => void;
  variant?: 'outlined' | 'simple' | 'rounded' | 'rounded_outlined',
  color?: 'primary' | 'secondary'
  size?: 'fullwidth' | 'md' | 'sm'
  type?: 'button' | 'submit' | 'reset'
}

export const Button:React.FC<ButtonProps> = ({ type = 'button', text, variant = ' simple', color = 'primary', size = 'md', onClick = () => {} }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={
        `${styles.button}
        ${styles['button__' +variant]}
        ${styles['button__' +size]}
        ${styles['button__' + color]}
        `
      }
    >
      {text}
    </button>
  )
}