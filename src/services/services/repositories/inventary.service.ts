import { ProductType } from 'types/inventary';
import { InventaryRepository } from './inventary.repository';
import { injectable } from 'inversify';
import axiosInstance from '../config/axios/axios';
@injectable()
export class InventaryService implements InventaryRepository {

  async listProducts(): Promise<ProductType[]> {
    const {data} = await axiosInstance.get<ProductType[]>('/api/product')

    return data
  }

  async detailProduct(id:string): Promise<ProductType> {
    try {
      const {data} = await axiosInstance.get<ProductType>('/api/product/'+id)

      return data
    }catch(err) {
      console.error('Sucedió un error', err)
    }
  }
}
