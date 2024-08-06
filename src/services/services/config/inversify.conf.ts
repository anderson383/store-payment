import 'reflect-metadata';
import { Container } from 'inversify';
import { TYPES } from './types';
import { InventaryRepository } from '../repositories/inventary.repository';
import { InventaryService } from '../repositories/inventary.service';
import { PaymentRepository } from '../repositories/payment.repository';
import { PaymentService } from '../repositories/payment.service';

const repositoryContainer = new Container();

repositoryContainer.bind<PaymentRepository>(TYPES.PAYMENT_REPOSITORY).to(PaymentService);
repositoryContainer.bind<InventaryRepository>(TYPES.INVENTARY_REPOSITORY).to(InventaryService);
export {repositoryContainer};
