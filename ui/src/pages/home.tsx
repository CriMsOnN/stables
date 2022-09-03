import { SaveRounded } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import React from "react";
import Clothe from "../components/Clothe";
import ClothingContainer from "../components/ClothingContainer";
import { debugData } from "../utils/debugData";
import { fetchNui } from "../utils/fetchNui";

interface Component {
  hashname: string;
  category_hashname: string;
  category_hash: number;
  hash: number;
}

debugData(
  [
    {
      action: "setVisible",
      data: true,
    },
  ],
  2000
);

function Home() {
  const [horseAccessories, setHorseAccessories] = React.useState<Component[]>(
    []
  );
  const [horseBedrolls, setHorseBedrolls] = React.useState<Component[]>([]);
  const [horseBlankets, setHorseBlankets] = React.useState<Component[]>([]);
  const [horseSaddlebags, setHorseSaddlebags] = React.useState<Component[]>([]);
  const [horseSaddles, setHorseSaddles] = React.useState<Component[]>([]);
  const [saddleHorns, setSaddleHorns] = React.useState<Component[]>([]);
  const [saddleLanterns, setSaddleLanterns] = React.useState<Component[]>([]);
  const [saddleStirrupts, setSaddleStirrupts] = React.useState<Component[]>([]);

  const handleSaveButton = () => {
    fetchNui("saveHorseComponents");
  };

  React.useEffect(() => {
    fetch("/horseClothes.json")
      .then((res) => res.json())
      .then((data) => {
        setHorseAccessories(data.horse_accessories);
        setHorseBedrolls(data.horse_bedrolls);
        setHorseBlankets(data.horse_blankets);
        setHorseSaddlebags(data.horse_saddlebags);
        setHorseSaddles(data.horse_saddles);
        setSaddleHorns(data.saddle_horns);
        setSaddleLanterns(data.saddle_lanterns);
        setSaddleStirrupts(data.saddle_stirrups);
      });
  }, []);

  return (
    <ClothingContainer>
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          height: "90%",
        }}
      >
        <Clothe data={horseAccessories} name="Accessories" />
        <Clothe data={horseBedrolls} name="Bedrolls" />
        <Clothe data={horseBlankets} name="Blankets" />
        <Clothe data={horseSaddlebags} name="Saddlebags" />
        <Clothe data={horseSaddles} name="Saddles" />
        <Clothe data={saddleHorns} name="Horns" />
        <Clothe data={saddleLanterns} name="Lanterns" />
        <Clothe data={saddleStirrupts} name="Stirrupts" />
        <Box
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            onClick={handleSaveButton}
            variant="contained"
            startIcon={<SaveRounded />}
          >
            Save
          </Button>
        </Box>
      </Box>
    </ClothingContainer>
  );
}

export default Home;
