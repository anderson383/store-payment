import { ProductType } from "types/inventary";

export interface InventaryRepository {
  listProducts(): Promise<ProductType[]>;
  detailProduct(id:string): Promise<ProductType>;
}
