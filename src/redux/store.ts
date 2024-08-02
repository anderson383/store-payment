import { combineReducers, configureStore } from '@reduxjs/toolkit';
import paymentReducer from "./payment/payment.root";

export const rootReducer = combineReducers({
  paymentReducer: paymentReducer
});

type RootState = ReturnType<typeof rootReducer>;

const store = configureStore<RootState>({
  reducer: rootReducer
})

export type RootStateType = ReturnType<typeof store.getState>

export default store;
