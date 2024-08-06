
import { PaymentRepository } from 'services/services/repositories/payment.repository';
import { useRepositoryIoc } from '../services/services/config/context';
import { TYPES } from '../services/services/config/types';

const usePaymentRepository = (): PaymentRepository => {
  const { container } = useRepositoryIoc();

  return container.get(TYPES.PAYMENT_REPOSITORY);
};

export default usePaymentRepository;
