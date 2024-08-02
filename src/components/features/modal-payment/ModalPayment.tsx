import * as Yup from 'yup';
import Modal from "components/ui/molecules/modal/modal"
import { Formik } from "formik"
import { useDispatch, useSelector } from "react-redux";
import { TextField } from 'components/ui/molecules/text-field/TextField';
import { CardCredit } from 'components/features/card-credit/CardCredit';
import { formatCreditCardNumber } from 'helper/formatCreditCardNumber.herlper';
import { formatExpiryDate } from 'helper/formatExpiryDate.helper';
import { cardHolderNameRequired, creditCardMaxDigit, creditCardRequired, cvcMaxDigit, cvcRequired, expiresRequired } from 'constants/messages-validator';
import { Button } from 'components/ui/atoms/button/Button';
import { RootStateType } from 'redux/store';
import { setModalStateSlice } from '../../../redux/payment/slices/payment-slice';
import { useState } from 'react';

interface ModalPaymentProps {
}

export const ModalPayment:React.FC<ModalPaymentProps> = () => {

  const [step, setStep] = useState(0)
  const dispatch = useDispatch()
  const { modalPayment } = useSelector(({ paymentReducer }: RootStateType) => paymentReducer.payment)

  const initialValuesForm = {
    cardHolderName: '',
    expires: '',
    cardNumber: '',
    cvc: ''
  }

  const validationSchema =  Yup.object({
    cardNumber: Yup.string()
      .required(creditCardRequired)
      .test(
        'len',
        creditCardMaxDigit,
        (val) => val && val.replace(/\s+/g, '')?.length === 16
      )
      .matches(/^[0-9\s]+$/, 'El número de tarjeta invalida'),
      
      cardHolderName: Yup.string().required(cardHolderNameRequired),
    expires: Yup.string()
      .required(expiresRequired)
      .matches(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, 'La fecha de expiración no es válida'),
      cvc: Yup.string()
      .required(cvcRequired)
      .matches(/^[0-9]{3,4}$/, cvcMaxDigit),
  })

  const handleModal = () => {
    dispatch(setModalStateSlice(!modalPayment))
  }

  const onSubmitCardCredit = (values: typeof initialValuesForm) => {
    console.log(values.cardHolderName)

    setStep(1)
  }

  return (
    <Modal
      openModal={modalPayment} 
      setOpenModal={() => handleModal()}
      closeOutClick={true}
      title={step === 1 ? 'Address' : 'Payment'}
    >
      {
        step === 1 ? (
          <Formik
            initialValues={initialValuesForm}
            validationSchema={validationSchema}
            onSubmit={() => {}}
            enableReinitialize
          >
            {
              ({ handleSubmit, isValid, dirty, getFieldProps, setFieldValue, setValues, setFormikState }) => (
                <form action="" onSubmit={handleSubmit}>
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
                  <div className="d-flex justify-between">
                    <b>TOTAL: $ 100</b>
                      <Button
                        text='Proceed to pay'
                        color='primary'
                        size='sm'
                        type='rounded'
                      />
                  </div>
                </form>
              )
            }
          </Formik>
        ) : <Formik
            initialValues={initialValuesForm}
            validationSchema={validationSchema}
            onSubmit={onSubmitCardCredit}
            enableReinitialize
          >
            {
              ({ handleSubmit, isValid, dirty, getFieldProps, setFieldValue, setValues, setFormikState }) => (
                <form action="" onSubmit={handleSubmit}>
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
                  <div className="group-form mb-3">
                    <TextField name='cardHolderName' label='CARD HOLDER NAME'  placeholder='FULL NAME' />
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
                      type='rounded_outlined'
                    />
                    <Button
                      text='Add address'
                      color='primary'
                      size='sm'
                      type='rounded'
                    />
                  </div>
                </form>
              )
            }
          </Formik>
      }
    </Modal>
  )
}