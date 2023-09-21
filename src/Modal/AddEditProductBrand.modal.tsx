import { ProductBrand } from "./GetProductBrands.modal";

export interface AddEditProductBrandState {
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

export interface AddProductBrandPayload {
  category_name: string;
  search_name: string;
  product_type: string;
}

export interface EditProductBrandPayload {
  id: string;
  values: AddProductBrandPayload;
}
