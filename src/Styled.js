import styled from "styled-components";
import { FormHelperText, Paper, Typography } from "@material-ui/core";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

export const StyledPaper = styled(Paper)`
  padding: 20px 15px;
  margin-top: 30px;
`;

export const StyledTypography = styled(Typography)`
  text-align: center;
  & a {
    cursor: pointer;
    &:hover {
      color: blue;
    }
  }
`;

export const StyledFormHelperText = styled(FormHelperText)`
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
