import styled from "styled-components";
import Button from "@mui/material/Button";
import { theme } from "../../_globalStyles/theme";

export const StyledProductDetail = styled.div`
  font-family: 'NEXT ART', sans-serif !important;
  font-weight: 500;
  line-height: 1.5;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  margin: 0 auto;

  button {
    font-family: "Fira Code", monospace;
  }
`;

export const StyledImageGalleryWrapper = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 20px 0;
  display: flex;
`;

export const Title = styled.h2`
  margin: 20px 0;
  font-weight: semi-bold;
`;

export const Price = styled.p`
  font-size: 20px;
  margin: 10px 0;
`;

export const Compound = styled.p`
  margin: 10px 0; 
  font-size: 16px;   /* Сделали текст меньше */
  color: gray;       /* Сделали текст серым */
`;

export const StyledButton = styled(Button)`
  && {
    font-size: 16px;
    background-color: ${theme.mainBackgroundColor};
    color: ${theme.mainTextColor};
    border-radius: 8px;
    padding: 8px 16px;

    &:hover {
      background-color: transparent;
      color: ${theme.secondaryTextColor};
      box-shadow: none;
    }
  }
`;

