import { IconButton, Slider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import React from "react";

interface Component {
  hashname: string;
  category_hashname: string;
  category_hash: number;
  hash: number;
}

interface Props {
  data: Component[];
  name: string;
}

const Clothe = ({ data, name }: Props) => {
  const [value, setValue] = React.useState(0);
  const handleSliderChange = (event: any, newValue: number | number[]) => {
    setValue(newValue as number);
  };

  const handleBackIconClick = () => {
    if (value === 0) {
      setValue(data.length - 1);
    } else {
      setValue(value - 1);
    }
  };

  const handleForwardIconClick = () => {
    if (value === data.length) {
      setValue(0);
    } else {
      setValue(value + 1);
    }
  };
  return (
    <Box>
      <Typography textAlign="center" variant="h6">
        {name} - {value}/{data.length}
      </Typography>
      <Box
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          style={{
            width: "95%",
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <IconButton onClick={handleBackIconClick}>
            <ArrowBackIos />
          </IconButton>
          <Box
            style={{
              width: "70%",
            }}
          >
            <Slider
              step={1}
              marks
              size="small"
              defaultValue={0}
              min={0}
              max={data.length}
              value={value}
              onChange={handleSliderChange}
            />
          </Box>
          <IconButton onClick={handleForwardIconClick}>
            <ArrowForwardIos />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Clothe;
