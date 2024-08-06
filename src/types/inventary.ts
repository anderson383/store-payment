export interface ProductType {
  id: string;
  name: string;
  description: string;
  stock: number;
  price: number;
  images: string[];
  size?: number;
  quantity?:number;
}