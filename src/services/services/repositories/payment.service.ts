import {PaymentRepository} from './payment.repository';
import { injectable } from 'inversify';
@injectable()
export class PaymentService implements PaymentRepository {
  async testCall(): Promise<void> {
    console.info('method testCall');
  }
}
