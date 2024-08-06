
import { Button } from 'components/ui/atoms/button/Button';
import styles from './detail.module.scss'
import Slider from "react-slick";
import { ButtonIcon } from 'components/ui/atoms/button-icon/ButtonIcon';
import { IconArrowLeft } from '@tabler/icons-react';
import { Link, useParams } from 'react-router-dom';
import { ROUTES } from 'constants/routes';
import { useEffect, useState } from 'react';
import { ModalPayment } from 'components/features/modal-payment/ModalPayment';
import { RootStateType } from 'redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { setModalStateSlice, setTemporalProductInfoSlice } from '../../redux/payment/slices/payment-slice';
import useInventaryRepository from 'hooks/use-inventary-repository';
import usePaymentRepository from 'hooks/use-payment-repository';
import { ProductType } from 'types/inventary';


export const DetailPage = () => {
  const dispatch = useDispatch()
  const params = useParams()
  const inventaryRepository = useInventaryRepository()
  const paymentRepository = usePaymentRepository()
  const [size, setSize] = useState(0)
  const [quantity, setQuantity] = useState(0)
  const [product, setProduct]= useState<ProductType>({
    description: '',
    id: '',
    images: [],
    name: '',
    price: 0,
    stock: 0
  })
  const { modalPayment } = useSelector(({ paymentReducer }: RootStateType) => paymentReducer.payment)

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    adaptiveHeight: true,
  };

  useEffect(() => {
    inventaryRepository.detailProduct(params.id).then(response => {
      if (response) {
        
        setProduct(response)
      }
    })
  }, [])


  const handleModal = () => {
    dispatch(setModalStateSlice(!modalPayment))
  }

  const payInProduct = () => {
    handleModal()
    dispatch(
      setTemporalProductInfoSlice({
        ...product,
        size: size,
        quantity: quantity
      })
    )
  }

  return (
    <div className={styles.detailPage}>
      <div className="container">
        <section className={styles.content}>
          <div className={styles.header_floating}>
            <Link to={ROUTES.index.path}>
              <ButtonIcon icon={<IconArrowLeft /> } />
            </Link>
          </div>
          <div className={styles.galery}>
            <Slider {...settings} >
              {
                product?.images?.map((image, index) => (
                  <div key={`img-${index}`}>
                    <img src={image} alt={product.name + ' ' + index}/>
                  </div>
                ))
              }
            </Slider>
          </div>
          <div className="slider">
            <div className={styles.detailProduct}>
              <caption>Aldo</caption>
              <p>{product?.name}</p>
              <p className={styles.description}>{product?.description}</p>
            </div>
            <div className={styles.info}>
              <caption>Stock {product?.stock}</caption>
              <p>${product?.price}</p>
            </div>
            <hr />
            <div className="description">
              <p>Size: 39 US</p>
              <div className={styles.sizeProduct}>
                <div className="size">
                  <caption>US</caption>
                </div>
                <div className={styles.sizes}>
                  <Button variant='rounded' size='sm'  text="39" />
                  <Button variant='rounded_outlined' size='sm' text="40" />
                  <Button variant='rounded_outlined' size='sm'  text="49" />
                </div>
              </div>
            </div>
            <div className={styles.payment}>
              <input type="text" value={quantity} onChange={(e) => setQuantity(e.target.value ? (parseInt(e.target.value) <= product?.stock )? parseInt(e.target.value) :  product?.stock : 0)}/>
              <Button text="COMPRAR" size='fullwidth' onClick={() => payInProduct()} />
            </div>
          </div>
        </section>
        <ModalPayment />
      </div>
    </div>
  )
}