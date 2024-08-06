import { createSlice } from "@reduxjs/toolkit"
import { setCreditCardState, setCustomerInfoState, setCvcState, setModalState, setTemporalCardCredit, setTemporalCustomerInfo } from '../actions/payment.action'
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
    setTemporalCustomerInfo
  }
})

export const {
  setModalState: setModalStateSlice,
  setCreditCardState: setCreditCardStateSlice,
  setCustomerInfoState: setCustomerInfoStateSlice,
  setCvcState: setCvcStateSlice,
  setTemporalCardCredit: setTemporalCardCreditSlice,
  setTemporalCustomerInfo: setTemporalCustomerInfoSlice
} = paymentSlice.actions;
