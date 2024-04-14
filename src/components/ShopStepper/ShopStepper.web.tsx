import React from "react";
import {
  makeStyles,
  Theme,
  createStyles,
  withStyles,
} from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import clsx from "clsx";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepConnector from "@material-ui/core/StepConnector";
import { StepIconProps } from "@material-ui/core/StepIcon";
import { Colors, StepperColors } from "../../Constants/Colors";
import {
  shop_details_icon,
  completed_icon,
  bank_details_icon,
  shop_images_icon,
} from "./assets";
import "./ShopStepper.web.css";

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    "& $line": {
      background: StepperColors.activeLine,
    },
  },
  completed: {
    "& $line": {
      background: StepperColors.completedLine,
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: Colors.gray,
    borderRadius: 1,
    margin: "0px 15px",
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    zIndex: 1,
    color: "#fff",
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  active: {
    background: "transparent",
  },
  completed: {
    background: "transparent",
  },
});

function ColorlibStepIcon(props: StepIconProps) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons: { [index: string]: React.ReactElement } = {
    1: (
      <img
        src={shop_details_icon}
        alt="shop_details_icon"
        className="shopstepper_icon"
      />
    ),
    2: (
      <img
        src={shop_images_icon}
        alt="shop_images_icon"
        className="shopstepper_icon"
      />
    ),
    3: (
      <img
        src={bank_details_icon}
        alt="bank_details_icon"
        className="shopstepper_icon"
      />
    ),
  };

  return (
    <>
      {completed ? (
        <img
          src={completed_icon}
          alt="completed_icon"
          className="shopstepper_icon"
        />
      ) : (
        <Box
          className={clsx(classes.root, {
            [classes.active]: active,
            [classes.completed]: completed,
          })}
        >
          {icons[String(props.icon)]}
        </Box>
      )}
    </>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    button: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  })
);

function getSteps() {
  return ["Basic Details", "Images", "Bank Details"];
}

interface ShopStepperProps {
  activeStep: number;
}

const ShopStepper = ({ activeStep }: ShopStepperProps) => {
  const classes = useStyles();
  const steps = getSteps();

  return (
    <Box className={classes.root}>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<ColorlibConnector />}
        className="shopstepper_stepperContainer"
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel
              StepIconComponent={ColorlibStepIcon}
              classes={{
                alternativeLabel: "shopstepper_stepLabel",
              }}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};
export default ShopStepper;
