import { useEffect, useState } from 'react';
import styles from './CardCredit.module.scss'
interface CardCreditProps {
  cardHolderName: string;
  expires: string;
  cardNumber: string;
}
export const CardCredit:React.FC<CardCreditProps> = ({
  cardHolderName = 'Your name',
  expires = '09/29',
  cardNumber = 'XXXX XXXX XXXX 1234'
}) => {
  const [logo, setLogo] = useState(null);
  const visaRegEx = /^4[0-9]{3}$/;
  const masterCardRegEx = /^5[1-5][0-9]{2}$/;

  useEffect(() => {
    const firstFourDigits = cardNumber.replace(/\s+/g, '').slice(0, 4);
    let logoUp = '/logo-maestro.svg'
    if (visaRegEx.test(firstFourDigits)) {
      logoUp = '/logo-visa.svg';
    } else if (masterCardRegEx.test(firstFourDigits)) {
      logoUp = '/logo-mastercard.svg';
    }
    setLogo(logoUp)
  }, [cardNumber])

  return (
    <div className={styles.creditCard}>
      <img src={logo} alt="" />
      <div className={styles.content}>
        <p>{cardNumber}</p>

        <div className={styles.infoCard}>
          <div>
            <caption>CARD HOLDER</caption>
            <p>{cardHolderName}</p>
          </div>
          <div>
            <caption>EXPIRES</caption>
            <p>{expires}</p>
          </div>
        </div>
      </div>
    </div>
  )
}