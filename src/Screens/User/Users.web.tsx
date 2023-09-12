import React, { useState } from "react";
import Dashboard from "../Dashboard/Dashboard.web";
import { Box, Typography } from "@material-ui/core";
import CustomTab from "../../components/CustomTab/CustomTab.web";
import CustomTabPanel from "../../components/CustomTab/CustomTabPanel.web";
import DeleteModal from "../../components/Modals/DeleteModal/DeleteModal.web";
import DataTable from "../../components/DataTable/DataTable.web";
import { useNavigate } from "react-router-dom";
import ActiveButton from "../../Ui/Button/ActiveButton.web";
import "./Users.web.css";

const configJSON = require("../../Constants/Users");

const Users = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [value, setValue] = React.useState(0);
  const rows = [
    {
      _id: "64eaf9ba90e02ab2b9ff371b",
      user_name: "abdeali",
      phone_number: "+919979144079",
      email: "abdalivora786@gmail.com",
      user_type: "rd_admin",
    },
    {
      _id: "64eafb5b90e02ab2b9ff371e",
      user_name: "abbas",
      phone_number: "+919727366046",
      email: "abbasvora04@gmail.com",
      user_type: "shop_admin",
    },
  ];
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const modalHandleClose = () => {
    setModalOpen(false);
  };
  const addShopadminUserHandle = () => {
    navigate(`/users/create`);
  };
  const editUserBrandHandle = (id: string) => {
    navigate(`/users/edit/${id}`);
  };
  const viewUserBrandClickHandle = (id: string) => {
    navigate(`/users/view/${id}`);
  };
  const deleteBtnClickHandle = () => {
    setModalOpen(true);
  };
  const onDeleteConfirmHandle = () => {
    setModalOpen(false);
    navigate(`/users`);
    //DELETE RD ADMIN
  };
  return (
    <Box>
      <Dashboard>
        <DeleteModal
          open={modalOpen}
          title="RD Admin"
          onClose={modalHandleClose}
          onConfirmClick={onDeleteConfirmHandle}
        />
        <Box className="user_mainContainer">
          <Box className="user_buttonContainer">
            <ActiveButton
              title={configJSON.shopAdminBtnTxt}
              disabled={false}
              onClick={addShopadminUserHandle}
            />
          </Box>
          <Box className="user_subContainer">
            <CustomTab
              value={value}
              handleChange={handleChange}
              tabs={configJSON.allUserTabs}
            />
            <CustomTabPanel value={value} index={0}>
              <DataTable
                rows={rows}
                columns={configJSON.usersColumns}
                onViewClick={undefined}
                onEditClick={undefined}
                onDeleteClick={undefined}
                isAction={false}
              />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <DataTable
                rows={rows}
                columns={configJSON.usersColumns}
                onViewClick={viewUserBrandClickHandle}
                onEditClick={editUserBrandHandle}
                onDeleteClick={deleteBtnClickHandle}
                isAction={true}
              />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              <DataTable
                rows={rows}
                columns={configJSON.usersColumns}
                onViewClick={undefined}
                onEditClick={undefined}
                onDeleteClick={undefined}
                isAction={false}
              />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={3}>
              <DataTable
                rows={rows}
                columns={configJSON.usersColumns}
                onViewClick={undefined}
                onEditClick={undefined}
                onDeleteClick={undefined}
                isAction={false}
              />
            </CustomTabPanel>
          </Box>
        </Box>
      </Dashboard>
    </Box>
  );
};

export default Users;
