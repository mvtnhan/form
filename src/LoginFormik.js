import { Formik, Form, Field } from "formik";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import React from "react";

import { StyledPaper, StyledFormHelperText, StyledTypography } from "./Styled";

import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  TextField,
} from "@material-ui/core";

const LoginFomik = () => {
  const history = useHistory();
  return (
    <div>
      <Formik
        initialValues={{
          email: "",
          password: "",
          err: false,
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .required("Email is required")
            .email("Email is invalid"),
          password: Yup.string()
            .required("Password is required")
            .min(8, "Password must have min 8 characters"),
        })}
        onSubmit={(values) => {
          const account = JSON.parse(localStorage.getItem(values.email));

          if (account !== null && account.password === values.password) {
            history.push("/home");
          } else {
            return (values.err = true);
          }
        }}
      >
        {({ values, touched, errors }) => (
          <Form>
            {console.log(values.err)}

            <Grid container justify="center" alignContent="center">
              <StyledPaper elevation={4}>
                <StyledTypography gutterBottom>Login</StyledTypography>

                {/* email */}
                <FormControl
                  fullWidth
                  margin="normal"
                  error={touched.email && !!errors.email}
                >
                  <Field name="email">
                    {({ field }) => (
                      <TextField
                        id="email"
                        label="Email"
                        variant="outlined"
                        {...field}
                      />
                    )}
                  </Field>
                  {touched.email && (
                    <FormHelperText>{errors.email}</FormHelperText>
                  )}
                </FormControl>

                {/* password */}
                <FormControl
                  fullWidth
                  margin="normal"
                  error={touched.password && !!errors.password}
                >
                  <Field name="password">
                    {({ field }) => (
                      <TextField
                        id="password"
                        label="Password"
                        variant="outlined"
                        type="password"
                        {...field}
                      />
                    )}
                  </Field>
                  {touched.password && (
                    <FormHelperText>{errors.password}</FormHelperText>
                  )}
                </FormControl>

                <StyledFormHelperText>
                  {values.err ? "Incorrect information" : ""}
                </StyledFormHelperText>

                <FormControl fullWidth margin="normal">
                  <Button variant="contained" color="primary" type="submit">
                    Login
                  </Button>
                </FormControl>
                <FormControl fullWidth margin="normal">
                  <Button variant="contained" color="primary" href="/register">
                    Register
                  </Button>
                </FormControl>
              </StyledPaper>
            </Grid>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginFomik;
