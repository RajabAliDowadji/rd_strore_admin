export const BASE_URL = "http://localhost:5000/";

export const POST = "post";
export const GET = "get";
export const PUT = "put";
export const DELETE = "delete";

export const publicHeader = { "Content-Type": "application/json" };

export const authHeader = (token: string) => {
  return {
    "Content-Type": "application/json",
    token: token,
  };
};
export const fileHeader = (token: string) => {
  return {
    "Content-Type": "multipart/form-data",
    token: token,
  };
};
export const Login_END_POINT = "user/login";

// Place End Point Start
export const Get_Places_END_POINT = "rd_admin/places";
export const Get_Place_END_POINT = "rd_admin/place";
export const Add_Place_END_POINT = "rd_admin/place/create";
export const Place_By_Id_END_POINT = "rd_admin/place/";
export const getPlacesEndPoint = BASE_URL + Get_Places_END_POINT;
export const getPlaceEndPoint = BASE_URL + Get_Place_END_POINT;
export const addPlaceEndPoint = BASE_URL + Add_Place_END_POINT;
export const placeByIdEndPoint = (id: string) => {
  return BASE_URL + Place_By_Id_END_POINT + id;
};
// Place End Point End

// Shop Category End Point Start
export const Get_Shop_Categories_END_POINT = "rd_admin/shop_categories";
export const Get_Shop_Category_By_Id_END_POINT = "rd_admin/shop_category/";
export const Add_Shop_Category_END_POINT = "rd_admin/shop_category/create";
export const getShopCategoriesEndPoint =
  BASE_URL + Get_Shop_Categories_END_POINT;
export const shopCategoryByIdEndPoint = (id: string) => {
  return BASE_URL + Get_Shop_Category_By_Id_END_POINT + id;
};
export const addShopCategoryEndPoint = BASE_URL + Add_Shop_Category_END_POINT;
// Shop Category End Point End

// Shop End Point Start
export const Get_Shops_END_POINT = "rd_admin/shops";
export const Get_Shop_By_Id_END_POINT = "rd_admin/shop/";
export const Add_Shop_END_POINT = "rd_admin/shop/create";
export const getShopsEndPoint = BASE_URL + Get_Shops_END_POINT;
export const shopByIdEndPoint = (id: string) => {
  return BASE_URL + Get_Shop_By_Id_END_POINT + id;
};
export const addShopEndPoint = BASE_URL + Add_Shop_END_POINT;
// Shop End Point End

// Commission Type End Point Start
export const Get_Commission_Types_END_POINT = "rd_admin/commissiontypes";
export const Get_Commission_Type_By_Id_END_POINT = "rd_admin/commissiontype/";
export const Add_Commission_Type_END_POINT = "rd_admin/commissiontype/create";
export const getCommissionTypesEndPoint =
  BASE_URL + Get_Commission_Types_END_POINT;
export const commissionTypeByIdEndPoint = (id: string) => {
  return BASE_URL + Get_Commission_Type_By_Id_END_POINT + id;
};
export const addCommissionTypeEndPoint =
  BASE_URL + Add_Commission_Type_END_POINT;
// Commission Type End Point Start

// Product Type End Point Start
export const Product_END_POINT = "rd_admin/product/";
export const Get_Product_Types_END_POINT = "types";
export const Add_Product_Type_END_POINT = "type/create";
export const Get_Product_Type_By_Id_END_POINT = "type/";
export const getProductTypesEndPoint =
  BASE_URL + Product_END_POINT + Get_Product_Types_END_POINT;
export const productTypeByIdEndPoint = (id: string) => {
  return BASE_URL + Product_END_POINT + Get_Product_Type_By_Id_END_POINT + id;
};
export const addProductTypeEndPoint =
  BASE_URL + Product_END_POINT + Add_Product_Type_END_POINT;
// Product Type End Point End

// Product Category End Point Start
export const Get_Product_Categories_END_POINT = "categories";
export const Add_Product_Category_END_POINT = "category/create";
export const Get_Product_Category_By_Id_END_POINT = "category/";
export const getProductCategoriesEndPoint =
  BASE_URL + Product_END_POINT + Get_Product_Categories_END_POINT;
export const productCategoryByIdEndPoint = (id: string) => {
  return (
    BASE_URL + Product_END_POINT + Get_Product_Category_By_Id_END_POINT + id
  );
};
export const addProductCategoryEndPoint =
  BASE_URL + Product_END_POINT + Add_Product_Category_END_POINT;
// Product Category End Point End

// Product Sub-Category End Point Start
export const Get_Product_Sub_Categories_END_POINT = "sub_categories";
export const Add_Product_Sub_Category_END_POINT = "sub_category/create";
export const Get_Product_Sub_Category_By_Id_END_POINT = "sub_category/";
export const getProductSubCategoriesEndPoint =
  BASE_URL + Product_END_POINT + Get_Product_Sub_Categories_END_POINT;
export const productSubCategoryByIdEndPoint = (id: string) => {
  return (
    BASE_URL + Product_END_POINT + Get_Product_Sub_Category_By_Id_END_POINT + id
  );
};
export const addProductSubCategoryEndPoint =
  BASE_URL + Product_END_POINT + Add_Product_Sub_Category_END_POINT;
// Product Sub-Category End Point Start

// Product Brand End Point End
export const Get_Product_Brands_END_POINT = "brands";
export const Add_Product_Brand_END_POINT = "brand/create";
export const Get_Product_Brand_By_Id_END_POINT = "brand/";
export const getProductBrandsEndPoint =
  BASE_URL + Product_END_POINT + Get_Product_Brands_END_POINT;
export const productBrandByIdEndPoint = (id: string) => {
  return BASE_URL + Product_END_POINT + Get_Product_Brand_By_Id_END_POINT + id;
};
export const addProductBrandEndPoint =
  BASE_URL + Product_END_POINT + Add_Product_Brand_END_POINT;
// Product Brand End Point End

// File End Point StartEnd
export const Get_File_END_POINT = "file/";
export const Add_File_END_POINT = "upload";
export const addFileENDPOINT =
  BASE_URL + Get_File_END_POINT + Add_File_END_POINT;
export const deleteFileEndPoint = (id: string) => {
  return BASE_URL + Get_File_END_POINT + id;
};
// File End Point End

export const Get_Commissions_END_POINT = "rd_admin/commissions";
export const Get_Product_END_POINT = "admin/product/";
export const Get_Product_Rating_END_POINT = "product/ratings";
export const Get_Product_Inventories_END_POINT = "inventories";

export const userLoginEndPoint = BASE_URL + Login_END_POINT;
export const getProductsEndPoint = BASE_URL + Get_Product_END_POINT;
export const getCommissionsEndPoint = BASE_URL + Get_Commissions_END_POINT;
export const getProductInventoriesEndPoint =
  BASE_URL + Get_Product_END_POINT + Get_Product_Inventories_END_POINT;
export const getProductRatingsEndPoint =
  BASE_URL + Get_Product_Rating_END_POINT;
