import { Link } from 'react-router-dom'
import styles from './CardProduct.module.scss'

interface CardProductProps {
  to: string
}
export const CardProduct:React.FC<CardProductProps> = ({to}) => {

  return  (
    <Link to={to} className={styles.card}>
      <img src='https://static.dafiti.com.co/p/adidas-performance-7127-2407752-4-zoom.jpg'/>

      <div className={styles.content}>
        <caption>Aldo</caption>
        <p>Reid Lace-Up Shoes Multi</p>
      </div>
      <div className={styles.info}>
        <caption>Stock 14</caption>
        <p>$250.000</p>
      </div>
    </Link >
  )
}