import { createSlice } from "@reduxjs/toolkit"
import { setClearDataTemporal, setCreditCardState, setCustomerInfoState, setCvcState, setModalState, setModalSuccess, setTemporalCardCredit, setTemporalCustomerInfo, setTemporalProductInfo } from '../actions/payment.action'
import { PaymentModel } from "../models/payment.models";

export const INITIAL_STATE_PAYMENT: PaymentModel = {
  modalPayment: false,
  modalSuccess:false,
  creditCard: {
    cardHolderName: '',
    cardNumber: '',
    cvc: '',
    expires: '',
    numberCuotes: ''
  },
  customerInfo: {
    email: '',
    name: '',
    lastname: '',
    phone: '',
    address: '',
    deparment: '',
    city: '',
  },
  productInfo: {
    description: '',
    id: '',
    images: [],
    name: '',
    price: 0,
    stock: 0,
    size: 0
  }
}

export const paymentSlice = createSlice({
  name: 'payment',
  initialState: INITIAL_STATE_PAYMENT,
  reducers: {
    setModalState,
    setModalSuccess,
    setCreditCardState,
    setCustomerInfoState,
    setCvcState,
    setTemporalCardCredit,
    setTemporalCustomerInfo,
    setTemporalProductInfo,
    setClearDataTemporal
  }
})

export const {
  setModalState: setModalStateSlice,
  setModalSuccess: setModalSuccessSlice,
  setCreditCardState: setCreditCardStateSlice,
  setCustomerInfoState: setCustomerInfoStateSlice,
  setCvcState: setCvcStateSlice,
  setTemporalCardCredit: setTemporalCardCreditSlice,
  setTemporalCustomerInfo: setTemporalCustomerInfoSlice,
  setTemporalProductInfo: setTemporalProductInfoSlice,
  setClearDataTemporal: setClearDataTemporalSlice
} = paymentSlice.actions;
