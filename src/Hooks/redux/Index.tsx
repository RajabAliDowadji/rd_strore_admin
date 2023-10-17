import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./UserLogin.redux";
import getPlacesReducer from "./GetPlaces.redux";
import getPlaceReducer from "./GetPlace.redux";
import getPlaceByIdReducer from "./GetPlaceById.redux";
import addEditPlaceReducer from "./AddEditPlace.redux";
import deletePlaceReducer from "./DeletePlace.redux";
import getShopCategoriesReducer from "./GetShopCategories.redux";
import getShoCategoryByIdReducer from "./GetShopCategoryById.redux";
import deleteShopCategoryReducer from "./DeleteShopCategory.redux";
import addEditShopCategoryReducer from "./AddEditShopCategory.redux";
import getCommissionTypesReducer from "./GetCommissionTypes.redux";
import getCommissionTypeByIdReducer from "./GetCommissionTypeById.redux";
import deleteCommissionTypeReducer from "./DeleteCommissionType.redux";
import addEditCommissionTypeReducer from "./AddEditCommissionType.redux";
import getProductTypesReducer from "./GetProductTypes.redux";
import getProductTypeByIdReducer from "./GetProductTypeById.redux";
import deleteProductTypeReducer from "./DeleteProductType.redux";
import addEditProductTypeReducer from "./AddEditProductType.redux";
import getProductCategoriesReducer from "./GetProductCategories.redux";
import getProductCategoryByIdReducer from "./GetProductCategoryById.redux";
import deleteProductCategoryReducer from "./DeleteProductCategory.redux";
import addEditProductCategoryReducer from "./AddEditProductCategory.redux";
import getProductSubCategoriesReducer from "./GetProductSubCategories.redux";
import getProductSubCategoryByIdReducer from "./GetProductSubCategoryById.redux";
import deleteProductSubCategoryReducer from "./DeleteProductSubCategory.redux";
import addEditProductSubCategoryReducer from "./AddEditProductSubCategory.redux";
import getProductBrandsReducer from "./GetProductBrands.redux";
import getProductBrandByIdReducer from "./GetProductBrandById.redux";
import addEditProductBrandReducer from "./AddEditProductBrand.reddux";
import deleteProductBrandReducer from "./DeleteProductBrand.redux";
import getShopsReducer from "./GetShops.redux";
import getShopByIdReducer from "./GetShopById.redux";
import deleteShopReducer from "./DeleteShop.redux";
import addEditShopReducer from "./AddEditShop.redux";
import addEditFileReducer from "./AddEditFile.redux";
import addEditFilesReducer from "./AddEditFiles.redux";
import deleteFileReducer from "./DeleteFile.redux";
import getProductsReducer from "./GetProducts.redux";
import addEditProductReducer from "./AddEditProduct.redux";
import getProductByIdReducer from "./GetProductById.redux";
import deleteProductReducer from "./DeleteProduct.redux";
import getProductInventoriesReducer from "./GetProductInventories.redux";
import addEditProductInventoryReducer from "./AddEditProductInventory.redux";
import deleteProductInventoryReducer from "./DeleteProductSubCategory.redux";
import getProductInventoryByIdReducer from "./GetProductInventoryById.redux";
import getCommissionsReducer from "./GetCommissions.redux";
import getCommissionByIdReducer from "./GetCommissionById.redux";
import addEditCommissionReducer from "./AddEditCommission.redux";
import deleteCommissionReducer from "./DeleteCommission.redux";
import getAdminCommissionsReducer from "./GetAdminCommission.redux";

import getProductRatingsReducer from "./GetProductRatings.redux";

const rootReducers = combineReducers({
  login_user: userReducer,

  //Place Reducer Start
  get_places: getPlacesReducer,
  get_place: getPlaceReducer,
  get_place_by_id: getPlaceByIdReducer,
  add_edit_place: addEditPlaceReducer,
  delete_place: deletePlaceReducer,
  //Place Reducer End

  //Shop Category Reducer Start
  get_shop_categories: getShopCategoriesReducer,
  get_shop_category_by_id: getShoCategoryByIdReducer,
  delete_shop_category: deleteShopCategoryReducer,
  add_edit_shop_category: addEditShopCategoryReducer,
  //Shop Category Reducer End

  //Shop Reducer Start
  get_shops: getShopsReducer,
  get_shop_by_id: getShopByIdReducer,
  delete_shop: deleteShopReducer,
  add_edit_shop: addEditShopReducer,
  //Shop Reducer End

  //Commission Type Reducer Start
  get_commission_types: getCommissionTypesReducer,
  get_commission_type_by_id: getCommissionTypeByIdReducer,
  delete_commission_type: deleteCommissionTypeReducer,
  add_edit_commission_type: addEditCommissionTypeReducer,
  //Commission Type Reducer End

  //Product Type Reducer Start
  get_product_types: getProductTypesReducer,
  get_product_type_by_id: getProductTypeByIdReducer,
  delete_product_type: deleteProductTypeReducer,
  add_edit_product_type: addEditProductTypeReducer,
  //Product Type Reducer End

  //Product Category Reducer Start
  get_product_categories: getProductCategoriesReducer,
  get_product_category_by_id: getProductCategoryByIdReducer,
  delete_product_category: deleteProductCategoryReducer,
  add_edit_product_category: addEditProductCategoryReducer,
  //Product Category Reducer End

  //Product Sub-Category Reducer Start
  get_product_sub_categories: getProductSubCategoriesReducer,
  get_product_sub_category_by_id: getProductSubCategoryByIdReducer,
  delete_product_sub_category: deleteProductSubCategoryReducer,
  add_edit_product_sub_category: addEditProductSubCategoryReducer,
  //Product Sub-Category Reducer End

  //Product Brand Reducer Start
  get_product_brands: getProductBrandsReducer,
  get_product_brand_by_id: getProductBrandByIdReducer,
  add_edit_product_brand: addEditProductBrandReducer,
  delete_product_brand: deleteProductBrandReducer,
  //Product Brand Reducer End

  //File Reducer Start
  add_edit_file: addEditFileReducer,
  add_edit_files: addEditFilesReducer,
  delete_file: deleteFileReducer,
  //File Reducer End

  //Product Reducer Start
  get_products: getProductsReducer,
  add_edit_product: addEditProductReducer,
  get_product_by_id: getProductByIdReducer,
  delete_product: deleteProductReducer,
  //Product Reducer Start

  //Product Inventory Reducer Start
  get_product_inventories: getProductInventoriesReducer,
  get_product_inventory_by_id: getProductInventoryByIdReducer,
  add_edit_product_inventory: addEditProductInventoryReducer,
  delete_product_inventory: deleteProductInventoryReducer,
  //Product Inventory Reducer End

  //Commission Reducer Start
  get_commissions: getCommissionsReducer,
  get_commission_by_id: getCommissionByIdReducer,
  delete_commission: deleteCommissionReducer,
  add_edit_commission: addEditCommissionReducer,
  //Commission Reducer End

  //Admin Commission Reducer Start
  get_admin_commissions: getAdminCommissionsReducer,
  //Admin Commission Reducer End

  get_product_ratings: getProductRatingsReducer,
});

export default rootReducers;
