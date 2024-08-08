
export const formatExpiryDate = (input:string) => {
  if (!input) {
    return '';
  }
  const sanitizedInput = input?.replace(/\D/g, '');

  if (sanitizedInput.length < 3) {
    return sanitizedInput;
  }
  const month = sanitizedInput.slice(0, 2);
  const year = sanitizedInput.slice(2, 4);

  return `${month}/${year}`;
};