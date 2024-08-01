import 'reflect-metadata';
import { PaymentRepository } from '../repositories/payment.repository';
import { PaymentService } from '../repositories/payment.service';
import { Container } from 'inversify';
import { TYPES } from './types';

const repositoryContainer = new Container();

repositoryContainer.bind<PaymentRepository>(TYPES.PAYMENT_REPOSITORY).to(PaymentService);

export {repositoryContainer};
