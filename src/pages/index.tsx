import { useEffect } from "react";
import usePaymentRepository from "../hooks/use-payment-repository";
import { CardProduct } from "components/ui/molecules/card-product/CardProduct";
import styles from './index.module.scss'

export const IndexPage = () => {

  const repository = usePaymentRepository();

  useEffect(() => {
    repository.testCall()
  }, [])

  return (
    <>
        <div className={styles.titlePage}>
          <p>All products</p>
        </div>
        <div className="container">
          <div className={styles.container_card}>
            {
              [1, 2, 3, 4, 5, 6, 7, 8].map(() => <CardProduct />)
            }
          </div>
        </div>
    </>
  );
};
