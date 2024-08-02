import { createSlice } from "@reduxjs/toolkit"
import { setModalState } from '../actions/payment.action'
import { PaymentModel } from "../models/payment.models";

const INITIAL_STATE: PaymentModel = {
  modalPayment: false
}

export const paymentSlice = createSlice({
  name: 'payment',
  initialState: INITIAL_STATE,
  reducers: {
    setModalState,
  }
})

export const {
  setModalState: setModalStateSlice,
} = paymentSlice.actions;
