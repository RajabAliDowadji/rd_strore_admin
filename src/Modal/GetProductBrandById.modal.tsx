import { ProductBrand } from "./GetProductBrands.modal";

export interface GetProductBrandByIdState {
  isLoading: boolean;
  isError: boolean;
  message: string;
  productBrand: ProductBrand | null;
}
export interface SuccessResponseState {
  status: number;
  message: string;
  data: ProductBrand;
  meta: any; //Work IN Future
}
export interface GetProductBrandByIdPayload {
  id: string;
}
export interface GetProductBrandByIdResponse {
  _id?: string;
  brand_name: string;
  sub_category_ids: any;
}
export interface dropDown {
  label: string;
  value: string | number;
}
