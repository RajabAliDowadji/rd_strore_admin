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
export const Product_END_POINT = "rd_admin/product/";
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
