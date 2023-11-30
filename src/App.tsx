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
import ViewShopPage from "./Screens/ShopPage/ViewShopPage.web";
import TodoShopPage from "./Screens/ShopPage/TodoShopPage.web";
import ProductCategoryPage from "./Screens/ProductCategoryPage/ProductCategoryPage.web";
import ViewProductCategoryPage from "./Screens/ProductCategoryPage/ViewProductCategoryPage.web";
import TodoProductCategoryPage from "./Screens/ProductCategoryPage/TodoProductCategoryPage.web";
import ProductSubCategotyPage from "./Screens/ProductSubCategoryPage/ProductSubCategoryPage.web";
import ViewProductSubCategoryPage from "./Screens/ProductSubCategoryPage/ViewProductSubCategoryPage.web";
import TodoProductSubCategoryPage from "./Screens/ProductSubCategoryPage/TodoProductSubCategoryPage.web";
import ProductBrandPage from "./Screens/ProductBrandPage/ProductBrandPage.web";
import ViewProductBrandPage from "./Screens/ProductBrandPage/ViewProductBrandPage.web";
import TodoProductBrandPage from "./Screens/ProductBrandPage/TodoProductBrandPage.web";
import ProductPage from "./Screens/ProductPage/ProductPage.web";
import ViewProductPage from "./Screens/ProductPage/ViewProductPage.web";
import TodoProductPage from "./Screens/ProductPage/TodoProductPage.web";
import CommissionCategoryPage from "./Screens/CommissionCategoryPage/CommissionCategoryPage.web";
import ViewCommissionCategoryPage from "./Screens/CommissionCategoryPage/ViewCommissionCategoryPage.web";

import Commissions from "./Screens/Commission/Commissions.web";
import ProductInventories from "./Screens/ProductInventory/ProductInventories.web";
import ProductRatings from "./Screens/ProductRating/ProductRatings.web";
import Users from "./Screens/User/Users.web";
import TodoCommissionType from "./Screens/CommissionType/TodoCommissionType.web";
import ViewCommission from "./Screens/Commission/ViewCommission.web";
import TodoCommission from "./Screens/Commission/TodoCommission.web";
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
        {/*  Shop Routes Start */}
        <Route path="/shops" element={<ShopsPage />} />
        <Route path="/shops/view/:id" element={<ViewShopPage />} />
        <Route path="/shops/create" element={<TodoShopPage />} />
        <Route path="/shops/edit/:id" element={<TodoShopPage />} />
        {/*  Shop  Routes End */}
        {/*  Product Category Routes Start */}
        <Route path="/product-categories" element={<ProductCategoryPage />} />
        <Route
          path="/product-categories/view/:id"
          element={<ViewProductCategoryPage />}
        />
        <Route
          path="/product-categories/edit/:id"
          element={<TodoProductCategoryPage />}
        />{" "}
        <Route
          path="/product-categories/create"
          element={<TodoProductCategoryPage />}
        />
        {/*  Product Category Routes End */}
        {/*  Product Sub-Category Routes Start */}
        <Route
          path="/product-sub-categories"
          element={<ProductSubCategotyPage />}
        />
        <Route
          path="/product-sub-categories/view/:id"
          element={<ViewProductSubCategoryPage />}
        />
        <Route
          path="/product-sub-categories/edit/:id"
          element={<TodoProductSubCategoryPage />}
        />
        <Route
          path="/product-sub-categories/create"
          element={<TodoProductSubCategoryPage />}
        />
        {/*  Product Sub-Category Routes End */}
        {/*  Product Brand Routes Start */}
        <Route path="/product-brands" element={<ProductBrandPage />} />
        <Route
          path="/product-brands/view/:id"
          element={<ViewProductBrandPage />}
        />
        <Route
          path="/product-brands/edit/:id"
          element={<TodoProductBrandPage />}
        />
        <Route
          path="/product-brands/create"
          element={<TodoProductBrandPage />}
        />
        {/*  Product Brand Routes End */}
        {/*  Product Routes Start */}
        <Route path="/products" element={<ProductPage />} />
        <Route path="/products/view/:id" element={<ViewProductPage />} />
        <Route path="/products/create" element={<TodoProductPage />} />
        <Route path="/products/edit/:id" element={<TodoProductPage />} />
        {/*  Product Routes End */}
        {/*  Commission Category Routes Start */}
        <Route
          path="/commission-categories"
          element={<CommissionCategoryPage />}
        />
        <Route
          path="/commission-categories/view/:id"
          element={<ViewCommissionCategoryPage />}
        />
        {/* Done */}
        <Route
          path="/commission-categories/create"
          element={<TodoCommissionType />}
        />
        <Route
          path="/commission-categories/edit/:id"
          element={<TodoCommissionType />}
        />
        {/*  Commission Category Routes End */}
        {/*  Commissions Routes Start */}
        <Route path="/commissions" element={<Commissions />} />
        <Route path="/commissions/create" element={<TodoCommission />} />
        <Route path="/commissions/view/:id" element={<ViewCommission />} />
        <Route path="/commissions/edit/:id" element={<TodoCommission />} />
        {/*  Commissions Routes End */}
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
