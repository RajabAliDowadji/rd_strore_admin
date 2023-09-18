import { ProductSubCategory } from "./GetProductSubCategories.modal";

export interface GetProductBrandsState {
  isLoading: boolean;
  isError: boolean;
  message: string;
  productBrands: ProductBrand[];
}
export interface SuccessResponseState {
  status: number;
  message: string;
  data: ProductBrand[];
  meta: any; //Work IN Future
}
export interface ProductBrand {
  _id: string;
  brand_name: string;
  sub_category_ids: SubCategoryIds;
  search_name: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface SubCategoryIds {
  sub_category: ProductSubCategory[];
}
export interface ProductBrandColumns {
  _id: string;
  brand_name: string;
}
