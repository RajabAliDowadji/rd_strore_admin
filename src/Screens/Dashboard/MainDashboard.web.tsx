import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@material-ui/core";
import Dashboard from "./Dashboard.web";
import { total_payments, commission_goal, order_count } from "./assets";
import DataTable from "../../components/DataTable/DataTable.web";
import { useDispatch, useSelector } from "react-redux";
import { GET_ADMIN_COMMISSIONS } from "../../Hooks/Saga/Constant";
import "./Dashboard.web.css";
import {
  AdminCommission,
  AdminCommissionResponse,
} from "../../Modal/GetAdminCommission.modal";

const configJSON = require("../../Constants/Commission");

const MainDashboard = (props: any) => {
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state);
  const [totalOrder, setTotalOrder] = useState<number>(0);
  const [totalCommission, setTotalCommission] = useState<number>(0);
  const [totalSell, setTotalSell] = useState<number>(0);
  const [adminCommissions, setAdminCommissions] = useState<
    AdminCommissionResponse[]
  >([]);

  useEffect(() => {
    dispatch({
      type: GET_ADMIN_COMMISSIONS,
    });
  }, [dispatch]);

  useEffect(() => {
    if (
      state &&
      state.get_admin_commissions &&
      state.get_admin_commissions.admin_commissions &&
      state.get_admin_commissions.admin_commissions.length !== 0
    ) {
      let tempArr: AdminCommissionResponse[] = [];
      let total_order: number = 0;
      let total_commission: number = 0;
      let total_sell: number = 0;
      state.get_admin_commissions.admin_commissions.map(
        (admin_commission: AdminCommission) => {
          tempArr.push({
            _id: admin_commission._id,
            shop_name: admin_commission.shop_id.shop_name,
            owner_name: admin_commission.shop_id.owner_name,
            orders_count: admin_commission.orders_count,
            total_payments: admin_commission.total_payments,
            total_commissions: admin_commission.total_commissions,
          });
          total_order += admin_commission.orders_count;
          total_commission += admin_commission.total_commissions;
          total_sell += admin_commission.total_payments;
        }
      );
      setTotalOrder(total_order);
      setTotalCommission(total_commission);
      setTotalSell(total_sell);
      setAdminCommissions(tempArr);
    }
  }, [state, state.get_places]);

  return (
    <Box>
      <Dashboard>
        <Box className="dashboard_subContainer">
          <Box className="dashboard_subMainContainer">
            <Grid container>
              <Grid item xs={4}>
                <Box>
                  <Typography className="dashboard_titleTxt">
                    Total Orders
                  </Typography>
                  <img
                    src={order_count}
                    alt="order_count"
                    className="dashboard_imgIcon"
                  />
                  <Typography className="dashboard_subtitleTxt">
                    {totalOrder}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box>
                  <Typography className="dashboard_titleTxt">
                    Total Sell
                  </Typography>
                  <img
                    src={total_payments}
                    alt="total_payments"
                    className="dashboard_imgIcon"
                  />
                  <Typography className="dashboard_subtitleTxt">
                    {totalSell}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box>
                  <Typography className="dashboard_titleTxt">
                    Total Commissions
                  </Typography>
                  <img
                    src={commission_goal}
                    alt="commission_goal"
                    className="dashboard_imgIcon"
                  />
                  <Typography className="dashboard_subtitleTxt">
                    {totalCommission}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box className="dashboard_dataTableContainer">
            <DataTable
              rows={adminCommissions}
              columns={configJSON.adminCommissionColumns}
              isAction={false}
              onViewClick={undefined}
              onEditClick={undefined}
              onDeleteClick={undefined}
            />
          </Box>
        </Box>
      </Dashboard>
    </Box>
  );
};

export default MainDashboard;
