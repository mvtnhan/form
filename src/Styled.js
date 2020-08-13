import styled from "styled-components";
import { FormHelperText, Paper, Typography, Grid } from "@material-ui/core";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
export const StyledPaper = styled(Paper)`
  padding: 20px 15px;
  margin-top: 30px;
`;

export const StyledGird = styled(Grid)`
  justify-content: center;
  align-content: center;
  text-align: center;
`;

export const StyledTypography = styled(Typography)`
  text-align: center;
  & a {
    cursor: pointer;
    text-decoration: none;
    &:hover {
      color: blue;
    }
  }
`;

export const StyledFormHelperText = styled.p`
  color: red;
  text-align: center;
`;

export const StyledPhoneInput = styled(PhoneInput)`
  padding: 16px;
  border: 1px solid;
  border-radius: 3px;
  border-color: rgba(118, 118, 118, 0.3);
  & input {
    border: none;
  }
`;

export const StyledPageBreak = styled.div`
  border-bottom: 1px solid #dadde1;
`;
