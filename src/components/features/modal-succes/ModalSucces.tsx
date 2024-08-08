import Modal from "../../../components/ui/molecules/modal/modal"
import styles from './ModalSuccess.module.scss'
import { useDispatch, useSelector } from "react-redux"
import { RootStateType } from "redux/store"
import { setModalSuccessSlice } from "../../../redux/payment/slices/payment-slice"
import { useNavigate } from "react-router-dom"
import { Button } from "../../../components/ui/atoms/button/Button"


export const ModalSuccess = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { modalSuccess } = useSelector(({ paymentReducer }: RootStateType) => paymentReducer.payment)

  const handleModal = () => {
    dispatch(setModalSuccessSlice(!modalSuccess))
  }

  const redirect = () => {
    handleModal()
    navigate('/')
  }
  return (
    <Modal
      openModal={modalSuccess} 
      setOpenModal={() => handleModal()}
      closeOutClick={true}
      title={'Payment Succesful'}
    >
      <div className={styles.styles}>
        <p>You will receive your order in the coming days. <br /> <br /> Thank you for your purchase.</p>
      </div>

      <div className={styles.action}>
        <Button size="fullwidth"  onClick={() => redirect()} text={'Ok'} />
      </div>
    </Modal>
  )
}