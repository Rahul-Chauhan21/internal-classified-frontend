import {
  FormControl,
  FormControlLabel,
  Checkbox as MuiCheckbox,
} from "@material-ui/core";
import React from "react";

const convertToDefEventPara = (name, value) => ({
  target: {
    name,
    value,
  },
});

const Checkbox = (props) => {
  const { name, label, onChange, value } = props;
  return (
    <FormControl>
      <FormControlLabel
        control={
          <MuiCheckbox
            name={name}
            color="primary"
            checked={value}
            onChange={(e) =>
              onChange(convertToDefEventPara(name, e.target.checked))
            }
          />
        }
        label={label}
      />
    </FormControl>
  );
};

export default Checkbox;
