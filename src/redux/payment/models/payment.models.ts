import { CreditCardType, CustomerInfoType } from "types/payment";

export interface PaymentModel {
  modalPayment: boolean;
  creditCard: CreditCardType;
  customerInfo: CustomerInfoType;
}