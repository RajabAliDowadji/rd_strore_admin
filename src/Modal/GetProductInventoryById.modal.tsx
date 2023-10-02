import { ProductInventory } from "./GetProductInventories.modal";

export interface GetProductInventoryByIdState {
  isLoading: boolean;
  isError: boolean;
  message: string;
  productInventory: ProductInventory | null;
}
export interface SuccessResponseState {
  status: number;
  message: string;
  data: ProductInventory;
  meta: any; //Work IN Future
}
export interface GetProductInventoryByIdPayload {
  id: string;
}
export interface GetProductInventoryByIdResponse {
  _id?: string;
  quantity: string;
  product_title: string;
  product_size: string;
  product_MRP_price: string;
  product_price: string;
  product_description: string;
  product_sub_category: string;
  product_brand: string;
  product_images: any;
  is_vegetarian: boolean;
}
export interface dropDown {
  label: string;
  value: string | number;
}
