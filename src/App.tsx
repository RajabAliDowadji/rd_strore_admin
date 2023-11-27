import React from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import LoginPage from "./Screens/LoginPage/LoginPage.web";
import DashboardPage from "./Screens/DashboardPage/DashboardPage.web";
import PlacesPage from "./Screens/PlacePage/PlacesPage.web";
import TodoPlacePage from "./Screens/PlacePage/TodoPlacePage.web";
import ViewPlacePage from "./Screens/PlacePage/ViewPlacePage.web";
import ShopCategoryPage from "./Screens/ShopCategoryPage/ShopCategoryPage.web";
import TodoShopCategoryPage from "./Screens/ShopCategoryPage/TodoShopCategoryPage.web";
import ViewShopCategoryPage from "./Screens/ShopCategoryPage/ViewShopCategoryPage.web";
import ShopsPage from "./Screens/ShopPage/ShopsPage.web";

import CommissionTypes from "./Screens/CommissionType/CommissionTypes.web";
import Commissions from "./Screens/Commission/Commissions.web";
import ProductTypes from "./Screens/ProductType/ProductTypes.web";
import ProductCategories from "./Screens/ProductCategory/ProductCategories.web";
import ProductSubCategories from "./Screens/ProductSubCategory/ProductSubCategories.web";
import ProductBrands from "./Screens/ProductBrand/ProductBrands.web";
import Products from "./Screens/Product/Products.web";
import ProductInventories from "./Screens/ProductInventory/ProductInventories.web";
import ProductRatings from "./Screens/ProductRating/ProductRatings.web";
import Users from "./Screens/User/Users.web";
import TodoShop from "./Screens/Shop/TodoShop.web";
import ViewShop from "./Screens/Shop/ViewShop.web";
import ViewCommissionType from "./Screens/CommissionType/ViewCommissionType.web";
import TodoCommissionType from "./Screens/CommissionType/TodoCommissionType.web";
import ViewCommission from "./Screens/Commission/ViewCommission.web";
import TodoCommission from "./Screens/Commission/TodoCommission.web";
import ViewProductType from "./Screens/ProductType/ViewProductType.web";
import TodoProductType from "./Screens/ProductType/TodoProductType.web";
import ViewProductCategory from "./Screens/ProductCategory/ViewProductCategory.web";
import TodoProductCategory from "./Screens/ProductCategory/TodoProductCategory.web";
import ViewProductSubCategory from "./Screens/ProductSubCategory/ViewProducSubCategory.web";
import TodoProductSubCategory from "./Screens/ProductSubCategory/TodoProductSubCategory.web";
import ViewProductBrand from "./Screens/ProductBrand/ViewProductBrand.web";
import TodoProductBrand from "./Screens/ProductBrand/TodoProductBrand.web";
import TodoProduct from "./Screens/Product/TodoProduct.web";
import ViewProduct from "./Screens/Product/ViewProduct.web";
import ViewProductInventory from "./Screens/ProductInventory/ViewProductInventory.web";
import TodoProductInventory from "./Screens/ProductInventory/TodoProductInventory.web";
import TodoShopAdmin from "./Screens/User/TodoShopAdmin.web";
import "./index.css";

function App() {
  return (
    <React.Fragment>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        {/*  Places Routes Start */}
        <Route path="/places" element={<PlacesPage />} />
        <Route path="/places/create" element={<TodoPlacePage />} />
        <Route path="/places/edit/:id" element={<TodoPlacePage />} />
        <Route path="/places/view/:id" element={<ViewPlacePage />} />
        {/*  Places Routes End */}
        {/*  Shop category Routes Start */}
        <Route path="/shop-categories" element={<ShopCategoryPage />} />
        <Route
          path="/shop-categories/create"
          element={<TodoShopCategoryPage />}
        />
        <Route
          path="/shop-categories/edit/:id"
          element={<TodoShopCategoryPage />}
        />
        <Route
          path="/shop-categories/view/:id"
          element={<ViewShopCategoryPage />}
        />
        {/*  Shop category Routes End */}
        {/* Done */}
        {/*  Shop Routes Start */}
        <Route path="/shops" element={<ShopsPage />} />
        <Route path="/shops/create" element={<TodoShop />} />
        <Route path="/shops/edit/:id" element={<TodoShop />} />
        <Route path="/shops/view/:id" element={<ViewShop />} />
        {/*  Shop  Routes End */}
        {/*  Commission type Routes Start */}
        <Route path="/commission-types" element={<CommissionTypes />} />
        <Route
          path="/commission-types/create"
          element={<TodoCommissionType />}
        />
        <Route
          path="/commission-types/edit/:id"
          element={<TodoCommissionType />}
        />
        <Route
          path="/commission-types/view/:id"
          element={<ViewCommissionType />}
        />
        {/*  Commission type Routes End */}
        {/*  Commissions Routes Start */}
        <Route path="/commissions" element={<Commissions />} />
        <Route path="/commissions/create" element={<TodoCommission />} />
        <Route path="/commissions/view/:id" element={<ViewCommission />} />
        <Route path="/commissions/edit/:id" element={<TodoCommission />} />
        {/*  Commissions Routes End */}
        {/*  Product type Routes Start */}
        <Route path="/product-types" element={<ProductTypes />} />
        <Route path="/product-types/create" element={<TodoProductType />} />
        <Route path="/product-types/view/:id" element={<ViewProductType />} />
        <Route path="/product-types/edit/:id" element={<TodoProductType />} />
        {/*  Product type Routes End */}
        {/*  Product Category Routes Start */}
        <Route path="/product-categories" element={<ProductCategories />} />
        <Route
          path="/product-categories/view/:id"
          element={<ViewProductCategory />}
        />
        <Route
          path="/product-categories/edit/:id"
          element={<TodoProductCategory />}
        />{" "}
        <Route
          path="/product-categories/create"
          element={<TodoProductCategory />}
        />
        {/*  Product Category Routes End */}
        {/*  Product Sub-Category Routes Start */}
        <Route
          path="/product-sub-categories"
          element={<ProductSubCategories />}
        />
        <Route
          path="/product-sub-categories/view/:id"
          element={<ViewProductSubCategory />}
        />
        <Route
          path="/product-sub-categories/edit/:id"
          element={<TodoProductSubCategory />}
        />
        <Route
          path="/product-sub-categories/create"
          element={<TodoProductSubCategory />}
        />
        {/*  Product Sub-Category Routes End */}
        {/*  Product Brand Routes Start */}
        <Route path="/product-brands" element={<ProductBrands />} />
        <Route path="/product-brands/view/:id" element={<ViewProductBrand />} />
        <Route path="/product-brands/edit/:id" element={<TodoProductBrand />} />
        <Route path="/product-brands/create" element={<TodoProductBrand />} />
        {/*  Product Brand Routes End */}
        {/*  Product Routes Start */}
        <Route path="/products" element={<Products />} />
        <Route path="/products/create" element={<TodoProduct />} />
        <Route path="/products/view/:id" element={<ViewProduct />} />
        <Route path="/products/edit/:id" element={<TodoProduct />} />
        {/*  Product Routes End */}
        {/*  Product Inventory Routes Start */}
        <Route path="/product-inventories" element={<ProductInventories />} />
        <Route
          path="/product-inventories/view/:id"
          element={<ViewProductInventory />}
        />
        <Route
          path="/product-inventories/create"
          element={<TodoProductInventory />}
        />
        <Route
          path="/product-inventories/edit/:id"
          element={<TodoProductInventory />}
        />
        {/*  Product Inventory Routes End */}
        {/*  Product Ratings Routes Start */}
        <Route path="/product-ratings" element={<ProductRatings />} />
        {/*  Product Ratings Routes End */}
        {/*  Users Routes Start */}
        <Route path="/users" element={<Users />} />
        <Route path="/users/create" element={<TodoShopAdmin />} />
        <Route path="/users/edit/:id" element={<TodoShopAdmin />} />
        {/*  Users Routes End */}
      </Routes>
    </React.Fragment>
  );
}

export default App;
