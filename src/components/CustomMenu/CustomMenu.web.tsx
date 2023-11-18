import React, { useEffect, useState } from "react";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import { Box, Typography } from "@material-ui/core";
import { useLocation } from "react-router-dom";
import {
  active_all_icon,
  active_comm_icon,
  active_comm_type_icon,
  active_place_icon,
  active_product_brand,
  active_product_cat_icon,
  active_product_inv,
  active_product_rating,
  active_product_sub_cat_icon,
  active_products_icon,
  active_shop_cat_icon,
  active_shop_icon,
  inactive_all_icon,
  inactive_comm_icon,
  inactive_comm_type_icon,
  inactive_place_icon,
  inactive_product_brand,
  inactive_product_cat_icon,
  inactive_product_inv,
  inactive_product_rating,
  inactive_product_sub_cat_icon,
  inactive_products_icon,
  inactive_shop_cat_icon,
  inactive_shop_icon,
} from "./assets";
import "./CustomMenu.web.css";

const configJSON = require("../../Constants/Dashboard");

interface CustomMenuProps {
  open: boolean;
  handleClose: any;
  tabChangeHandle: any;
}

interface menuProps {
  id: string;
  title: string;
  route: string;
  tabClick?: any;
  img: any;
}

const CustomMenu = ({
  open,
  handleClose,
  tabChangeHandle,
}: CustomMenuProps) => {
  const location = useLocation();
  const [pathRoute, setPathRoute] = useState<string>("");

  useEffect(() => {
    const route = location.pathname.split("/");
    setPathRoute(route[1]);
  }, [location]);

  const menuOptions: menuProps[] = [
    {
      id: "1",
      title: "All",
      route: "dashboard",
      img: (route: string) => {
        return (
          <img
            src={pathRoute === route ? active_all_icon : inactive_all_icon}
            alt={`${route}_icon`}
            className="custommenu_optionIcon"
          />
        );
      },
    },
    {
      id: "2",
      title: "Places",
      route: "places",
      img: (route: string) => {
        return (
          <img
            src={pathRoute === route ? active_place_icon : inactive_place_icon}
            alt={`${route}_icon`}
            className="custommenu_optionIcon"
          />
        );
      },
    },
    {
      id: "3",
      title: "Shop Category",
      route: "shop-categories",
      img: (route: string) => {
        return (
          <img
            src={
              pathRoute === route
                ? active_shop_cat_icon
                : inactive_shop_cat_icon
            }
            alt={`${route}_icon`}
            className="custommenu_optionIcon"
          />
        );
      },
    },
    {
      id: "4",
      title: "Shops",
      route: "shops",
      img: (route: string) => {
        return (
          <img
            src={pathRoute === route ? active_shop_icon : inactive_shop_icon}
            alt={`${route}_icon`}
            className="custommenu_optionIcon"
          />
        );
      },
    },
    {
      id: "5",
      title: "Product Category",
      route: "product-categories",
      img: (route: string) => {
        return (
          <img
            src={
              pathRoute === route
                ? active_product_cat_icon
                : inactive_product_cat_icon
            }
            alt={`${route}_icon`}
            className="custommenu_optionIcon"
          />
        );
      },
    },
    {
      id: "6",
      title: "Product Sub-Categoy",
      route: "product-sub-categories",
      img: (route: string) => {
        return (
          <img
            src={
              pathRoute === route
                ? active_product_sub_cat_icon
                : inactive_product_sub_cat_icon
            }
            alt={`${route}_icon`}
            className="custommenu_optionIcon"
          />
        );
      },
    },
    {
      id: "7",
      title: "Product Brand",
      route: "product-brands",
      img: (route: string) => {
        return (
          <img
            src={
              pathRoute === route
                ? active_product_brand
                : inactive_product_brand
            }
            alt={`${route}_icon`}
            className="custommenu_optionIcon"
          />
        );
      },
    },
    {
      id: "8",
      title: "Product",
      route: "products",
      img: (route: string) => {
        return (
          <img
            src={
              pathRoute === route
                ? active_products_icon
                : inactive_products_icon
            }
            alt={`${route}_icon`}
            className="custommenu_optionIcon"
          />
        );
      },
    },
    {
      id: "9",
      title: "Product Inventory",
      route: "product-inventories",
      img: (route: string) => {
        return (
          <img
            src={
              pathRoute === route ? active_product_inv : inactive_product_inv
            }
            alt={`${route}_icon`}
            className="custommenu_optionIcon"
          />
        );
      },
    },
    {
      id: "10",
      title: "Commission Type",
      route: "commission-types",
      img: (route: string) => {
        return (
          <img
            src={
              pathRoute === route
                ? active_comm_type_icon
                : inactive_comm_type_icon
            }
            alt={`${route}_icon`}
            className="custommenu_optionIcon"
          />
        );
      },
    },
    {
      id: "11",
      title: "Commission",
      route: "commissions",
      img: (route: string) => {
        return (
          <img
            src={pathRoute === route ? active_comm_icon : inactive_comm_icon}
            alt={`${route}_icon`}
            className="custommenu_optionIcon"
          />
        );
      },
    },
    {
      id: "12",
      title: "Product Rating",
      route: "product-ratings",
      img: (route: string) => {
        return (
          <img
            src={
              pathRoute === route
                ? active_product_rating
                : inactive_product_rating
            }
            alt={`${route}_icon`}
            className="custommenu_optionIcon"
          />
        );
      },
    },
  ];

  return (
    <SwipeableDrawer
      anchor="left"
      open={open}
      onClose={handleClose}
      onOpen={function (event: React.SyntheticEvent<{}, Event>): void {
        throw new Error("Function not implemented.");
      }}
    >
      <Box className="custommenu_titleContainer ">
        <Typography className="custommenu_mainTitleText">
          {configJSON.rdAdminTitleText}
        </Typography>
      </Box>
      {menuOptions.map((menu: menuProps, index: number) => (
        <Box
          className={`custommenu_titleContainer ${
            pathRoute === menu.route
              ? "custommenu_ActivetitleContainer"
              : "custommenu_InActivetitleContainer"
          }`}
          onClick={tabChangeHandle.bind(this, menu.route)}
        >
          {menu.img(menu.route)}
          <Typography
            className={`custommenu_titleText ${
              pathRoute === menu.route
                ? "custommenu_ActivetitleText"
                : "custommenu_InActivetitleText"
            }`}
          >
            {menu.title}
          </Typography>
        </Box>
      ))}
    </SwipeableDrawer>
  );
};
export default CustomMenu;
