import { createSlice } from "@reduxjs/toolkit"
import { setCreditCardState, setCustomerInfoState, setCvcState, setModalState, setTemporalCardCredit, setTemporalCustomerInfo, setTemporalProductInfo } from '../actions/payment.action'
import { PaymentModel } from "../models/payment.models";

const INITIAL_STATE: PaymentModel = {
  modalPayment: false,
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
  initialState: INITIAL_STATE,
  reducers: {
    setModalState,
    setCreditCardState,
    setCustomerInfoState,
    setCvcState,
    setTemporalCardCredit,
    setTemporalCustomerInfo,
    setTemporalProductInfo
  }
})

export const {
  setModalState: setModalStateSlice,
  setCreditCardState: setCreditCardStateSlice,
  setCustomerInfoState: setCustomerInfoStateSlice,
  setCvcState: setCvcStateSlice,
  setTemporalCardCredit: setTemporalCardCreditSlice,
  setTemporalCustomerInfo: setTemporalCustomerInfoSlice,
  setTemporalProductInfo: setTemporalProductInfoSlice
} = paymentSlice.actions;
