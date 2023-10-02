import { ProductBrand } from "./GetProductBrands.modal";
import { ProductSubCategory } from "./GetProductSubCategories.modal";

export interface GetProductsState {
  isLoading: boolean;
  isError: boolean;
  message: string;
  products: Product[];
}

export interface SuccessResponseState {
  status: number;
  message: string;
  data: Product[];
  meta: any; //Work IN Future
}

export interface Product {
  _id: string;
  product_title: string;
  product_size: string;
  product_MRP_price: number;
  product_price: number;
  product_description: string;
  product_images: string[]; //TODO WORK IN FUTURE
  product_sub_category: ProductSubCategory;
  product_brand: ProductBrand;
  search_name: string;
  is_published: boolean;
  is_vegetarian: boolean;
  createdAt?: string;
  updatedAt?: string;
}
export interface GetProductColumns {
  _id: string;
  product_title: string;
  product_size: string;
  product_MRP_price: number;
  product_price: number;
  sub_category_name: string;
  brand_name: string;
  is_published: boolean;
  is_vegetarian: boolean;
}

export interface GetProductQueryPayloads {
  brand_name: string;
  sub_category_name: string;
}
