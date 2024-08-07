import { OptionType } from 'types/common';
import axiosInstance from '../config/axios/axios';
import {ParamsPayment, PaymentRepository} from './payment.repository';
import { injectable } from 'inversify';

interface CallbackPaymentType {
  transactionId: string
  transactionProviderId: string
  productId: string
}

@injectable()
export class PaymentService implements PaymentRepository {
  async createPayment(params: ParamsPayment): Promise<boolean> {

    try {
      const { creditCard, customer, product } = params
      const mount = product?.price * product.quantity
      const {data} = await axiosInstance.post<CallbackPaymentType>('/api/billing/payment', {
        customer: {
          "email":customer.email,
          "name": customer.name,
          "lastname" :customer.lastname,
        },
        shippingAddress: {
          "phone": customer.phone,
          "address": customer.address,
          "deparment": customer.deparment,
          "city": customer.city,
        },
        creditCard: {
          "number": creditCard.cardNumber.replace(/ /g, ''),
          "expiry": creditCard.expires,
          "cvc": creditCard.cvc,
          "name": creditCard.cardHolderName,
          "cuotes": (creditCard.numberCuotes as OptionType).value,
          "amount": mount * 100,
        },
        product: {
          "id": product.id,
          "quantity": product.quantity
        }
      })

      if (data.transactionProviderId) {
        return await this.callbackPayment(data)
      }
      return false
    } catch(err) {
      console.error('Sucedió un error', err)
      return false;
    }
  }

  async callbackPayment(params: CallbackPaymentType): Promise<boolean> {
    try {
      const {data} = await axiosInstance.post<string>('/api/billing/payment/callback', params)

      return data === 'APPROVED'
    } catch(err) {
      console.error('Sucedió un error', err)
      return false;
    }
  }
}
