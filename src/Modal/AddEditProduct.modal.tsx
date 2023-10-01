import { Product } from "./GetProducts.modal";

export interface AddEditProductState {
  isLoading: boolean;
  isError: boolean;
  message: string;
  product: Product | null;
}

export interface SuccessResponseState {
  status: number;
  message: string;
  data: Product;
  meta: any; //Work IN Future
}

export interface AddProductPayload {
  product_title: string;
  product_size: string;
  product_MRP_price: number;
  product_price: number;
  search_name: string;
  product_description: string;
  product_images: string[];
  product_sub_category: string;
  product_brand: string;
}

export interface EditProductPayload {
  id: string;
  values: AddProductPayload;
}
