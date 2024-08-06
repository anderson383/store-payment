
import { Button } from 'components/ui/atoms/button/Button';
import styles from './detail.module.scss'
import Slider from "react-slick";
import { ButtonIcon } from 'components/ui/atoms/button-icon/ButtonIcon';
import { IconArrowLeft } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import { ROUTES } from 'constants/routes';
import { useState } from 'react';
import { ModalPayment } from 'components/features/modal-payment/ModalPayment';
import { RootStateType } from 'redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { setModalStateSlice } from '../../redux/payment/slices/payment-slice';


export const DetailPage = () => {
  const dispatch = useDispatch()
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


  const handleModal = () => {
    dispatch(setModalStateSlice(!modalPayment))
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
              <div>
                <img src='https://static.dafiti.com.co/p/adidas-performance-7127-2407752-4-zoom.jpg'/>
              </div>
              <div>
                <img src='https://static.dafiti.com.co/p/adidas-performance-7127-2407752-4-zoom.jpg'/>
              </div>
              <div>
                <img src='https://static.dafiti.com.co/p/adidas-performance-7127-2407752-4-zoom.jpg'/>
              </div>
              <div>
                <img src='https://static.dafiti.com.co/p/adidas-performance-7127-2407752-4-zoom.jpg'/>
              </div>
              <div>
                <img src='https://static.dafiti.com.co/p/adidas-performance-7127-2407752-4-zoom.jpg'/>
              </div>
              <div>
                <img src='https://static.dafiti.com.co/p/adidas-performance-7127-2407752-4-zoom.jpg'/>
              </div>
            </Slider>
          </div>
          <div className="slider">
            <div className={styles.detailProduct}>
              <caption>Aldo</caption>
              <p>Reid Lace-Up Shoes Multi</p>
              <p>$250.000</p>
            </div>
            <div className={styles.info}>
              <caption>Stock 23</caption>
              <p>$250.000</p>
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
              <input type="text" value={1}/>
              <Button text="COMPRAR" size='fullwidth' onClick={() => handleModal()} />
            </div>
          </div>
        </section>
        <ModalPayment />
      </div>
    </div>
  )
}