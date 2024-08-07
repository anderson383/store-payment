import { PayloadAction } from "@reduxjs/toolkit"
import { PaymentModel } from "../models/payment.models"
import { INITIAL_STATE_PAYMENT } from "../slices/payment-slice"

export const getInformationTemporal = () => {
  const informationTemporal = sessionStorage.getItem('informationTemporal')
  if (informationTemporal) {
    return JSON.parse(informationTemporal)
  }
  return {}
}

export const setModalState = (state:PaymentModel, { payload }: PayloadAction<boolean>):PaymentModel => {
  sessionStorage.setItem('modalPayment', JSON.stringify(payload))
  return ({
    ...state,
    modalPayment: payload
  })
}


export const setModalSuccess = (state:PaymentModel, { payload }: PayloadAction<boolean>):PaymentModel => {
  return ({
    ...state,
    modalSuccess: payload
  })
}


export const setCreditCardState = (state:PaymentModel, { payload }: PayloadAction<boolean>):PaymentModel => {
  const informationTemporal = getInformationTemporal()
  
  return ({
    ...state,
    creditCard: {
      cardHolderName: informationTemporal?.creditCard?.cardHolderName || '',
      expires: informationTemporal?.creditCard?.expires || '',
      cardNumber: informationTemporal?.creditCard?.cardNumber || '',
      cvc:state.creditCard.cvc,
      numberCuotes: informationTemporal?.creditCard?.numberCuotes
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
    },
    productInfo: {
      description: informationTemporal?.productInfo?.description || '',
      id: informationTemporal?.productInfo?.id || '',
      images: informationTemporal?.productInfo?.images || [],
      name: informationTemporal?.productInfo?.name || '',
      price: informationTemporal?.productInfo?.price || 0,
      stock: informationTemporal?.productInfo?.stock || 0,
      size: informationTemporal?.productInfo?.size || 0,
      quantity: informationTemporal?.productInfo?.quantity || 0
    }
  })
}

export const setTemporalCardCredit = (state:PaymentModel, { payload }: PayloadAction<PaymentModel['creditCard']>):PaymentModel => {
  sessionStorage.setItem('informationTemporal', JSON.stringify({
    ...getInformationTemporal(),
    creditCard: {
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


export const setTemporalProductInfo = (state:PaymentModel, { payload }: PayloadAction<PaymentModel['productInfo']>):PaymentModel => {
  sessionStorage.setItem('informationTemporal', JSON.stringify({
    ...getInformationTemporal(),
    productInfo: payload
  }))

  return ({
    ...state,
    productInfo: payload
  })
}

export const setClearDataTemporal = ():PaymentModel => {
  sessionStorage.setItem('informationTemporal', JSON.stringify(INITIAL_STATE_PAYMENT))

  return INITIAL_STATE_PAYMENT
}