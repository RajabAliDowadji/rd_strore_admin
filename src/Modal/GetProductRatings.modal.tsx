import { Product } from "./GetProducts.modal";

export interface GetProductRatingsState {
  isLoading: boolean;
  isError: boolean;
  message: string;
  productRatings: ProductRating[];
}
export interface SuccessResponseState {
  status: number;
  message: string;
  data: ProductRating[];
  meta: any; //Work IN Future
}
export interface ProductRating {
  _id: string;
  rating: number;
  product: Product;
  createdAt?: string;
  updatedAt?: string;
}

export interface GetProductRatingsColumns {
  _id: string;
  rating: number;
  product_title: string;
  product_size: string;
  product_MRP_price: number;
  product_price: number;
  sub_category_name: string;
  brand_name: string;
  is_vegetarian: boolean;
}
