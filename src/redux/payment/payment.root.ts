import { combineReducers } from "@reduxjs/toolkit";
import { paymentSlice } from "./slices/payment-slice";

const paymentReducer = combineReducers({
  payment: paymentSlice.reducer,
});

export type PaymentState = ReturnType<typeof paymentReducer>;
export default paymentReducer;
