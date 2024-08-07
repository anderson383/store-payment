
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
import { ProductType } from 'types/inventary';
import { ModalSuccess } from 'components/features/modal-succes/ModalSucces';
import { formatPrice } from 'helper/formatPrice';

const SIZES = [
  '36',
  '37',
  '38',
  '39',
  '40',
  '41',
  '42',
]

export const DetailPage = () => {
  const dispatch = useDispatch()
  const params = useParams()
  const inventaryRepository = useInventaryRepository()
  const [size, setSize] = useState(0)
  const [quantity, setQuantity] = useState('1')
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
        quantity: parseInt(quantity)
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
          <div className={styles.infoProduct}>
            <div className={styles.description} >
              <div className={styles.detailProduct}>
                <caption>Tennis</caption>
                <p>{product?.name}</p>
                <p className={styles.description}>{product?.description}</p>
              </div>
              <div className={styles.info}>
                <caption>Stock {product?.stock}</caption>
                <p>{formatPrice(product?.price)}</p>
              </div>
              <hr />
              <div className={styles.sizes}>
                <p>Size: {SIZES[size]} US</p>
                <div className={styles.sizeProduct}>
                  <div className="size">
                    <caption>US</caption>
                  </div>
                  <div className={styles.sizesItems}>
                    {
                      SIZES.map((sizeItem, index) => (
                        <Button 
                          variant={ size === index ? 'rounded' : 'rounded_outlined' }
                          size='sm'
                          text={sizeItem}
                          key={`size-${index}`}
                          onClick={() => setSize(index)}
                        />
                      ))
                    }
                  </div>
                </div>
              </div>

              <div className={styles.delivery}>
                <p><span>Llega gratis </span> en 3 días habiles.</p>
                <p><span>Devolución gratis</span> Tienes 30 días desde que lo recibes.</p>
              </div>
            </div>
            <div className={styles.payment}>
              <input
                type="text"
                value={quantity}
                onChange={(e) =>
                  setQuantity(e.target.value ? (parseInt(e.target.value) <= product?.stock)? String(e.target.value) :  String(product?.stock) : '')}
              />
              <Button
                disabled={quantity ? !parseInt(quantity) : false}
                text="COMPRAR"
                size='fullwidth'
                onClick={() => payInProduct()}
              />
            </div>
          </div>
        </section>
        <ModalPayment />
        <ModalSuccess />
      </div>
    </div>
  )
}