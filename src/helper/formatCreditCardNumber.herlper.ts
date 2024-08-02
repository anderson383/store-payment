export const formatCreditCardNumber = (value:string) => {
  if (!value) return value;
  const cleaned = value.replace(/\D+/g, '');
  const match = cleaned.match(/.{1,4}/g);
  return match ? match.join(' ') : value;
};
