import { ProductType } from "types/inventary";
import { CreditCardType, CustomerInfoType } from "types/payment";

export interface ParamsPayment {
  customer: CustomerInfoType;
  creditCard: CreditCardType;
  product: ProductType
}

export interface PaymentRepository {
  createPayment(params: ParamsPayment): Promise<boolean>;
}
