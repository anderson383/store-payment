import { Link } from 'react-router-dom'
import styles from './CardProduct.module.scss'
import { ProductType } from 'types/inventary';
import { formatPrice } from '../../../../helper/formatPrice';

interface CardProductProps {
  to: string;
  product: ProductType
}
export const CardProduct:React.FC<CardProductProps> = ({to, product}) => {

  return  (
    <Link to={to} className={styles.card}>
      <img src={product.images.length ? product.images[0] : ''} alt={product.name} />

      <div className={styles.content}>
        <caption>Tennis</caption>
        <p>{product.name}</p>
      </div>
      <div className={styles.info}>
        <caption>Stock {product.stock}</caption>
        <p>{formatPrice(product.price)}</p>
      </div>
    </Link >
  )
}