import { PayloadAction, createAsyncThunk } from "@reduxjs/toolkit"
import { PaymentModel } from "../models/payment.models"

const getInformationTemporal = () => {
  const informationTemporal = sessionStorage.getItem('informationTemporal')
  if (informationTemporal) {
    return JSON.parse(informationTemporal)
  }
  return {}
}

export const setModalState = (state:PaymentModel, { payload }: PayloadAction<boolean>):PaymentModel => {

  
  return ({
    ...state,
    modalPayment: payload
  })
}

export const setCreditCardState = (state:PaymentModel, { payload }: PayloadAction<boolean>):PaymentModel => {
  const informationTemporal = getInformationTemporal()
  
  return ({
    ...state,
    creditCard: {
      cardHolderName: informationTemporal?.cardCredit?.cardHolderName || '',
      expires: informationTemporal?.cardCredit?.expires || '',
      cardNumber: informationTemporal?.cardCredit?.cardNumber || '',
      cvc:state.creditCard.cvc,
      numberCuotes: informationTemporal?.cardCredit?.numberCuotes
    }
  })
}

export const setCvcState = (state:PaymentModel, { payload }: PayloadAction<string>):PaymentModel => {  
  return ({
    ...state,
    creditCard: {
      ...state.creditCard,
      cvc: payload
    }
  })
}

export const setCustomerInfoState = (state:PaymentModel, { payload }: PayloadAction<boolean>):PaymentModel => {
  const informationTemporal = getInformationTemporal()
  
  return ({
    ...state,
    customerInfo: {
      email: informationTemporal?.customer?.email || '',
      name: informationTemporal?.customer?.name || '',
      lastname: informationTemporal?.customer?.lastname || '',
      phone: informationTemporal?.customer?.phone || '',
      address: informationTemporal?.customer?.address || '',
      deparment: informationTemporal?.customer?.deparment || '',
      city: informationTemporal?.customer?.city || '',
    }
  })
}

export const setTemporalCardCredit = (state:PaymentModel, { payload }: PayloadAction<PaymentModel['creditCard']>):PaymentModel => {
  sessionStorage.setItem('informationTemporal', JSON.stringify({
    ...getInformationTemporal(),
    cardCredit: {
      cardHolderName :payload.cardHolderName,
      cardNumber: payload.cardNumber,
      cvc:  undefined,
      expires: payload.expires,
      numberCuotes: payload.numberCuotes
    }
  }))

  return ({
    ...state,
    creditCard: payload
  })
}

export const setTemporalCustomerInfo = (state:PaymentModel, { payload }: PayloadAction<PaymentModel['customerInfo']>):PaymentModel => {
  sessionStorage.setItem('informationTemporal', JSON.stringify({
    ...getInformationTemporal(),
    customer: payload
  }))

  return ({
    ...state,
    customerInfo: payload
  })
}