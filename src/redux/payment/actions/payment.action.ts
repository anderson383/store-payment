import { PayloadAction, createAsyncThunk } from "@reduxjs/toolkit"
import { PaymentModel } from "../models/payment.models"


export const setModalState = (state:PaymentModel, { payload }: PayloadAction<boolean>):PaymentModel => {
  return ({
    ...state,
    modalPayment: payload
  })
}