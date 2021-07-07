import { FormControlLabel, Switch as MuiSwitch } from "@material-ui/core";
import React from "react";

const convertToDefEventPara = (name, value) => ({
  target: {
    name,
    value,
  },
});

const Switch = ({ label, value, onChange, name }) => {
  return (
    <FormControlLabel
      control={
        <MuiSwitch
          checked={value}
          onChange={(e) =>
            onChange(convertToDefEventPara(name, e.target.checked))
          }
          name={name}
        />
      }
      label={label}
    />
  );
};

export default Switch;
