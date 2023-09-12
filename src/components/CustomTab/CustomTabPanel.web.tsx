import React from "react";
import { Box } from "@material-ui/core";

import "./CustomTab.web.css";

interface customTabPanelProps {
  children: any;
  value: number;
  index: number;
}

const CustomTabPanel = ({ children, value, index }: customTabPanelProps) => {
  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && (
        <Box sx={{ p: 3 }} className="innerTab">
          {children}
        </Box>
      )}
    </Box>
  );
};
export default CustomTabPanel;
