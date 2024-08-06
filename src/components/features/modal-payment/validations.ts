import * as Yup from 'yup';
import { cardHolderNameRequired,
  creditCardMaxDigit,
  creditCardRequired,
  cvcMaxDigit,
  cvcRequired,
  expiresRequired,
  fieldRequired
} from "constants/messages-validator";

export const validationSchema =  Yup.object({
  cardNumber: Yup.string()
    .required(creditCardRequired)
    .test(
      'len',
      creditCardMaxDigit,
      (val) => val && val.replace(/\s+/g, '')?.length === 16
    )
    .matches(/^[0-9\s]+$/, 'El número de tarjeta invalida'),
    
    cardHolderName: Yup.string().required(cardHolderNameRequired),
  expires: Yup.string()
    .required(expiresRequired)
    .matches(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, 'La fecha de expiración no es válida'),
    cvc: Yup.string()
    .required(cvcRequired)
    .matches(/^[0-9]{3,4}$/, cvcMaxDigit),
})


export const validationSchemaCustomer =  Yup.object({
  email: Yup.string().required(fieldRequired),
  name: Yup.string().required(fieldRequired),
  lastname: Yup.string().required(fieldRequired),
  phone: Yup.string().required(fieldRequired),
  address: Yup.string().required(fieldRequired),
  deparment: Yup.string().required(fieldRequired),
  city: Yup.string().required(fieldRequired)
})