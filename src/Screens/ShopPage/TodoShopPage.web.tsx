import React, { useEffect, useState } from "react";
import { Box, Typography } from "@material-ui/core";
import { useLocation } from "react-router-dom";
import DashboardPage from "../DashboardPage/DashboardPage.web";
import ShopStepper from "../../components/ShopStepper/ShopStepper.web";
import TodoShopBasicDetails from "./TodoShopBasicDetails.web";
import TodoShopImages from "./TodoShopImages.web";
import "./ShopPage.web.css";
import TodoShopBankDetails from "./TodoShopBankDetails.web";

const configJSON = require("../../Constants/Shop");

const TodoShopPage = () => {
  const location = useLocation();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [activeStep, setActiveStep] = React.useState(0);

  useEffect(() => {
    const route = location.pathname.split("/");
    if (route && route.length > 0) {
      if (route[2] === "create") {
        setIsEdit(false);
      } else {
        setIsEdit(true);
      }
    }
  }, [location]);

  const activeStepChangeHandle = (activeStep: number) => {
    setActiveStep(activeStep);
  };

  return (
    <Box>
      <DashboardPage>
        <Box className="shoppage_mainContainer">
          <Box className="shoppage_titleContainer">
            <Typography className="shoppage_titleText">
              {isEdit
                ? configJSON.editShopTitleText
                : configJSON.createShopTitleText}
            </Typography>
          </Box>
          <ShopStepper activeStep={activeStep} />

          {activeStep === 0 && (
            <TodoShopBasicDetails
              activeStep={activeStep}
              activeStepChangeHandle={activeStepChangeHandle}
            />
          )}

          {activeStep === 1 && (
            <TodoShopImages
              activeStep={activeStep}
              activeStepChangeHandle={activeStepChangeHandle}
            />
          )}

          {activeStep === 2 && (
            <TodoShopBankDetails
              activeStep={activeStep}
              activeStepChangeHandle={activeStepChangeHandle}
            />
          )}
        </Box>
      </DashboardPage>
    </Box>
  );
};
export default TodoShopPage;
