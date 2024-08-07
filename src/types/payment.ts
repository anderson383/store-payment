import { OptionType } from "./common";

export interface CreditCardType {
  cardHolderName: string,
  expires: string
  cardNumber: string
  cvc: string
  numberCuotes: string | OptionType
}

export interface CustomerInfoType {
  email: string;
  name: string;
  lastname: string;
  phone: string;
  address: string;
  deparment: string;
  city: string;
}