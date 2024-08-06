import Modal from "components/ui/molecules/modal/modal"
import { Formik } from "formik"
import { useDispatch, useSelector } from "react-redux";
import { TextField } from 'components/ui/molecules/text-field/TextField';
import { CardCredit } from 'components/features/card-credit/CardCredit';
import { formatCreditCardNumber } from 'helper/formatCreditCardNumber.herlper';
import { formatExpiryDate } from 'helper/formatExpiryDate.helper';
import { Button } from 'components/ui/atoms/button/Button';
import { RootStateType } from 'redux/store';
import { setCreditCardStateSlice, setCustomerInfoStateSlice, setCvcStateSlice, setModalStateSlice, setTemporalCardCreditSlice, setTemporalCustomerInfoSlice } from '../../../redux/payment/slices/payment-slice';
import { useEffect, useState } from 'react';
import { Select } from 'components/ui/molecules/select/Select';
import { OptionType } from 'types/common';
import { validationSchema, validationSchemaCustomer } from './validations';
import styles from './ModalPayment.module.scss'
interface ModalPaymentProps {
}

export const ModalPayment:React.FC<ModalPaymentProps> = () => {

  const [step, setStep] = useState(0)
  const dispatch = useDispatch()
  const { modalPayment, creditCard: CREDIT_CARD_FORM, customerInfo: CUSTOMER_INFO_FORM } = useSelector(({ paymentReducer }: RootStateType) => paymentReducer.payment)

  const cuotesNumbers:OptionType[] = Array.from({ length: 12 }, (v, i) => ({ value: i+1, label: i+1 }));

  useEffect(() => {
    dispatch(setCreditCardStateSlice())
    dispatch(setCustomerInfoStateSlice())
  }, [modalPayment, sessionStorage.getItem('informationTemporal')])



  const handleModal = () => {
    dispatch(setModalStateSlice(!modalPayment))
  }

  const getInformationTemporal = () => {
    const informationTemporal = sessionStorage.getItem('informationTemporal')
    if (informationTemporal) {
      return JSON.parse(informationTemporal)
    }
    return {}
  }

  const onSubmitCardCredit = (values: typeof CREDIT_CARD_FORM) => {
    dispatch(setCvcStateSlice(values.cvc))
    dispatch(setTemporalCardCreditSlice({
      cardHolderName :values.cardHolderName,
      cardNumber: values.cardNumber,
      cvc:  undefined,
      expires: values.expires,
      numberCuotes: values.numberCuotes
    }))
    setStep(step + 1)
  }

  const onSubmitCustomer = (values: typeof CUSTOMER_INFO_FORM) => {
    setStep(step + 1)
    dispatch(setTemporalCustomerInfoSlice(values))
  }

  const titles = [
    'Payment 1/2',
    'Shipping address 2/2',
    'Resume 3/3'
  ]
  return (
    <Modal
      openModal={modalPayment} 
      setOpenModal={() => handleModal()}
      closeOutClick={true}
      title={titles[step]}
    >
      <Formik
        initialValues={CUSTOMER_INFO_FORM}
        validationSchema={validationSchemaCustomer}
        onSubmit={onSubmitCustomer}
        enableReinitialize
      >
        {
          ({ handleSubmit, isValid, dirty, getFieldProps, setFieldValue, setValues, setFormikState }) => (
            <form action="" onSubmit={handleSubmit} className={`${ step === 1 ? '' : 'd-none' }`}>
              <div className="group-form mb-3">
                <TextField
                  name='email'
                  label='Email'
                  placeholder='user@gmail.com'
                />
              </div>
              <div className="group-form mb-3 gap-3 d-flex justify-between">
                <TextField 
                  name='name' 
                  label='Name' 
                  placeholder='Your name'
                  size='fullwidth'
                />
                <TextField
                  name='lastname'
                  label='Lastname'
                  placeholder='Your lastname'
                  size='fullwidth'
                />
              </div>
              <div className="group-form mb-3 gap-3 d-flex justify-between">
                <TextField 
                  name='phone' 
                  label='Phone number' 
                  placeholder='Your phone'
                    size='fullwidth'
                />
                <TextField
                  name='address'
                  label='address'
                  placeholder='Your address'
                  size='fullwidth'
                />
              </div>
              <div className="group-form mb-3 gap-3 d-flex justify-between">
                <TextField 
                  name='deparment' 
                  label='Department' 
                  placeholder='Your deparment'
                  size='fullwidth'
                />
                <TextField
                  name='city'
                  label='City'
                  placeholder='Your city'
                  size='fullwidth'
                />
              </div>
              <div className="d-flex justify-between">
                  <Button
                    type='button'
                    text='Back'
                    color='primary'
                    size='sm'
                    variant='rounded_outlined'
                    onClick={() => {
                      setStep( step - 1)
                    }}
                  />
                  <Button
                    type='submit'
                    text='Proceed to pay'
                    color='primary'
                    size='sm'
                    variant='rounded'
                  />
              </div>
            </form>
          )
        }
      </Formik>
      <Formik
        initialValues={CREDIT_CARD_FORM}
        validationSchema={validationSchema}
        onSubmit={onSubmitCardCredit}
        enableReinitialize={true}
      >
        {
          ({ handleSubmit, isValid, dirty, getFieldProps, setFieldValue, setValues, setFormikState }) => (
            <form action="" onSubmit={handleSubmit} className={`${ step === 0 ? '' : 'd-none' }`}>
              <div className="">
                <CardCredit
                  cardNumber={getFieldProps('cardNumber').value?.trim() ||  undefined}
                  cardHolderName={getFieldProps('cardHolderName').value?.trim() ||  undefined}
                  expires={getFieldProps('expires').value?.trim() ||  undefined}
                />
              </div>
              <div className="group-form mb-3">
                <TextField
                  name='cardNumber'
                  label='CREDIT CARD NUMBER'
                  placeholder='XXXX XXXX XXXX XXXX'
                  props={{ onChange: () => {
                    const cardNumber = formatCreditCardNumber(getFieldProps('cardNumber').value?.trim())
                    setFieldValue('cardNumber', cardNumber)
                  }}}
                />
              </div>
              <div className="group-form mb-3 d-flex gap-4 justify-between">
                <TextField name='cardHolderName' label='CARD HOLDER NAME'  placeholder='FULL NAME' />
                <Select name='numberCuotes' label='NUMBER CUOTES' placeholder='000' options={cuotesNumbers} />
              </div>
              <div className="group-form mb-3 d-flex gap-4 justify-between">
                <TextField 
                  name='expires' 
                  label='EXPIRY' 
                  placeholder='MM/AA'
                  props={{ onChange: () => {
                    const expires = formatExpiryDate(getFieldProps('expires').value?.trim())
                    setFieldValue('expires', expires)
                  }}}
                />
                <TextField name='cvc' label='CVC' placeholder='000' />
              </div>
                
              <div className="d-flex justify-end gap-2">
                <Button
                  text='Cancel'
                  color='primary'
                  size='sm'
                  variant='rounded_outlined'
                />
                <Button
                  type='submit'
                  text='Add address'
                  color='primary'
                  size='sm'
                  variant='rounded'
                />
              </div>
            </form>
          )
        }
      </Formik>
      <div  className={`${ step === 2 ? '' : 'd-none' }`}>
        <div className={styles.address}>
          <div className="">
            <p className={styles.title}>Address</p>
          </div>
          <div className="">
            <p>{CUSTOMER_INFO_FORM.address}</p>
            <span>{CUSTOMER_INFO_FORM.deparment}, {CUSTOMER_INFO_FORM.city}</span>
          </div>
        </div>

        <div className={styles.address}>
          <div className="">
            <p className={styles.title}>Type payment</p>
          </div>
          <div className="">
            <p>Credit card</p>
            <span>******{CREDIT_CARD_FORM.cardNumber.slice(-4)}</span><span></span>
          </div>
        </div>
        
        <div className="d-flex justify-between">
          <Button
            type='button'
            text='Back'
            color='primary'
            size='sm'
            variant='rounded_outlined'
            onClick={() => {
              setStep( step - 1)
            }}
          />
          <Button
            type='submit'
            text='Pay'
            color='primary'
            size='sm'
            variant='rounded'
          />
        </div>
      </div>
    </Modal>
  )
}