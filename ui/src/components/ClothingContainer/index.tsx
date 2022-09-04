import { Typography } from "@mui/material";
import { styled } from "@mui/system";

const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  marginLeft: "3vw",
  justifyContent: "center",
  height: "100vh",
  width: "40vw",
  maxWidth: "40vw",
  minWidth: "40vw",
});

const ClothContainer = styled("div")({
  width: "60%",
  height: "70%",
  background: "rgba(0, 0, 0, 0.9)",
  borderRadius: "7px",
});

const StyledTypography = styled(Typography)({
  width: "100%",
  height: "3vw",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "1.3rem",
  backgroundColor: "red",
  borderRadius: "7px",
});

interface Props {
  children: React.ReactNode;
}

const ClothingContainer: React.FC<Props> = ({ children }) => {
  return (
    <Container>
      <ClothContainer>
        <StyledTypography>Horse Clothing</StyledTypography>
        {children}
      </ClothContainer>
    </Container>
  );
};

export default ClothingContainer;
