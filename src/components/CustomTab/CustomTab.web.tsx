import React from "react";
import { Tab, Tabs } from "@material-ui/core";
import { Colors } from "../../Constants/Colors";

import "./CustomTab.web.css";

interface customTabProps {
  value: number;
  handleChange: any;
  tabs: any;
}

const CustomTab = ({ value, handleChange, tabs }: customTabProps) => {
  return (
    <Tabs
      value={value}
      onChange={handleChange}
      aria-label="basic tabs example"
      className="tabs"
      TabIndicatorProps={{
        style: {
          backgroundColor: Colors.white,
          fontFamily: Colors.fontFamily,
          textTransform: "capitalize",
        },
      }}
    >
      {tabs.map((tab: any) => (
        <Tab
          label={tab.label}
          className="tab"
          style={{ maxWidth: `${100 / tabs.length}%` }}
        />
      ))}
    </Tabs>
  );
};
export default CustomTab;
