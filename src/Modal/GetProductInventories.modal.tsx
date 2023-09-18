import { Product } from "./GetProducts.modal";

export interface GetProductInventoriesState {
  isLoading: boolean;
  isError: boolean;
  message: string;
  productInventories: ProductInventory[];
}

export interface SuccessResponseState {
  status: number;
  message: string;
  data: ProductInventory[];
  meta: any; //Work IN Future
}

export interface ProductInventory {
  _id: string;
  quantity: number;
  product: Product;
  createdAt?: string;
  updatedAt?: string;
}

export interface GetProductInventoriesColumns {
  _id: string;
  quantity: number;
  product_title: string;
  product_size: string;
  product_MRP_price: number;
  product_price: number;
  product_sub_category: string;
  product_brand: string;
  is_vegetarian: boolean;
}
