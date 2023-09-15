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

export const Login_END_POINT = "user/login";
export const Get_Places_END_POINT = "rd_admin/places";
export const Product_END_POINT = "rd_admin/product/";
export const Get_Shop_Categories_END_POINT = "rd_admin/shop_categories";
export const Get_Commission_Types_END_POINT = "rd_admin/commissiontypes";
export const Get_Product_Types_END_POINT = "types";
export const Get_Product_Categories_END_POINT = "categories";
export const Get_Product_Sub_Categories_END_POINT = "sub_categories";
export const Get_Product_Brands_END_POINT = "brands";
export const Get_Shops_END_POINT = "rd_admin/shops";
export const Get_Commissions_END_POINT = "rd_admin/commissions";
export const Get_Product_END_POINT = "admin/product/";
export const Get_Product_Rating_END_POINT = "product/ratings";
export const Get_Product_Inventories_END_POINT = "inventories";

export const userLoginEndPoint = BASE_URL + Login_END_POINT;

export const getPlacesEndPoint = BASE_URL + Get_Places_END_POINT;

export const getShopCategoriesEndPoint =
  BASE_URL + Get_Shop_Categories_END_POINT;

export const getCommissionTypesEndPoint =
  BASE_URL + Get_Commission_Types_END_POINT;

export const getProductTypesEndPoint =
  BASE_URL + Product_END_POINT + Get_Product_Types_END_POINT;

export const getProductCategoriesEndPoint =
  BASE_URL + Product_END_POINT + Get_Product_Categories_END_POINT;

export const getProductSubCategoriesEndPoint =
  BASE_URL + Product_END_POINT + Get_Product_Sub_Categories_END_POINT;

export const getProductBrandsEndPoint =
  BASE_URL + Product_END_POINT + Get_Product_Brands_END_POINT;

export const getShopsEndPoint = BASE_URL + Get_Shops_END_POINT;
export const getProductsEndPoint = BASE_URL + Get_Product_END_POINT;
export const getCommissionsEndPoint = BASE_URL + Get_Commissions_END_POINT;
export const getProductInventoriesEndPoint =
  BASE_URL + Get_Product_END_POINT + Get_Product_Inventories_END_POINT;
export const getProductRatingsEndPoint =
  BASE_URL + Get_Product_Rating_END_POINT;
