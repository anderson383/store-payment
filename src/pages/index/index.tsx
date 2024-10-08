import { useEffect, useState } from "react";
import { CardProduct } from "components/ui/molecules/card-product/CardProduct";
import styles from './index.module.scss'
import { ROUTES } from "constants/routes";
import useInventaryRepository from "hooks/use-inventary-repository";
import { ProductType } from "types/inventary";
import { setClearDataTemporalSlice } from "../../redux/payment/slices/payment-slice";
import { useDispatch } from "react-redux";

export const IndexPage = () => {
  const dispatch = useDispatch()
  const [listProducts, setListProducts] = useState<ProductType[]>([])

  const repository = useInventaryRepository()

  useEffect(() => {
    dispatch(setClearDataTemporalSlice())
    repository.listProducts().then(response => {
      if (response) {
        setListProducts(response)
      }
    })
  }, [])

  return (
    <>
      <div className="container">
        <div className={styles.titlePage}>
          <p>All products</p>
        </div>
        <div className={styles.container_card}>
          {
            listProducts.map((product) =>
              <CardProduct key={product.id}
                product={product}
                to={ROUTES.detailproduct.path.replace(':id', product.id)}
                />
              )
          }
        </div>
      </div>
    </>
  );
};
