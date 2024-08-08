import { IconLoader2 } from '@tabler/icons-react';
import styles from './Button.module.scss'
interface ButtonProps {
  text: string
  onClick?: () => void;
  variant?: 'outlined' | 'simple' | 'rounded' | 'rounded_outlined';
  color?: 'primary' | 'secondary'
  size?: 'fullwidth' | 'md' | 'sm'
  type?: 'button' | 'submit' | 'reset';
  icon?: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
}

export const Button:React.FC<ButtonProps> = ({
  type = 'button',
  text,
  variant = ' simple',
  color = 'primary',
  size = 'md',
  icon,
  loading =false,
  disabled = false,
  onClick = () => {} }
) => {
  return (
    <button
      role='button'
      disabled={disabled || loading}
      type={type}
      onClick={onClick}
      className={
        `
        ${styles.button}
        ${styles['button__' +variant]}
        ${styles['button__' +size]}
        ${styles['button__' + color]}
        ${icon ? styles.button_icon : ''}
        ${loading ? styles.loading : ''}
        `
      }
    >
      {text}
      {
        icon && loading ? (
          <IconLoader2 />
        ): icon
      }
    </button>
  )
}