import { ProductInventory } from "./GetProductInventories.modal";

export interface AddEditProductInventoryState {
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

export interface AddProductInventoryPayload {
  Inventory_name: string;
  search_name: string;
  product_type: string;
}

export interface EditProductInventoryPayload {
  id: string;
  values: AddProductInventoryPayload;
}
export interface EditProductInventoryResponse {
  quantity: string;
  product: string;
}
