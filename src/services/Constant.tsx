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
export const Get_Shop_Categories_END_POINT = "rd_admin/shop_categories";
export const Get_Commission_Types_END_POINT = "rd_admin/commissiontypes";
export const Get_Product_Types_END_POINT = "rd_admin/product/types";

export const userLoginEndPoint = BASE_URL + Login_END_POINT;

export const getPlacesEndPoint = BASE_URL + Get_Places_END_POINT;

export const getShopCategoriesEndPoint =
  BASE_URL + Get_Shop_Categories_END_POINT;

export const getCommissionTypesEndPoint =
  BASE_URL + Get_Commission_Types_END_POINT;

export const getProductTypesEndPoint = BASE_URL + Get_Product_Types_END_POINT;
