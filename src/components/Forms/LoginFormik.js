import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import React from "react";

import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  Input,
  InputLabel,
  Paper,
  Typography,
} from "@material-ui/core";

const LoginFomik = () => (
  <div>
    <Formik
      initialValues={{
        email: "",
        password: "",
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
        if (localStorage.getItem(values.email) == null) {
          alert("Email is not registered");
        } else {
          if (
            localStorage.getItem(values.email) != null &&
            localStorage.getItem(values.email.password) != null
          ) {
            alert("ss");
          }
        }
      }}
    >
      {(formik) => (
        <Form>
          <Grid container justify="center" alignContent="center">
            <Paper
              elevation={4}
              style={{ padding: "20px 15px", marginTop: "30px" }}
            >
              <Typography gutterBottom style={{ textAlign: "center" }}>
                Login
              </Typography>

              <FormControl
                fullWidth
                margin="normal"
                error={formik.touched.email && !!formik.errors.email}
              >
                <InputLabel>Email</InputLabel>
                <Field name="email">
                  {({ field }) => <Input fullWidth {...field} />}
                </Field>
                {formik.touched.email && (
                  <FormHelperText>{formik.errors.email}</FormHelperText>
                )}
              </FormControl>

              <FormControl
                fullWidth
                margin="normal"
                error={formik.touched.password && !!formik.errors.password}
              >
                <InputLabel>Password</InputLabel>
                <Field name="password">
                  {({ field }) => (
                    <Input fullWidth type="password" {...field} />
                  )}
                </Field>
                {formik.touched.password && (
                  <FormHelperText>{formik.errors.password}</FormHelperText>
                )}
              </FormControl>

              <FormControl fullWidth margin="normal">
                <Button color="primary" type="submit">
                  Login
                </Button>
              </FormControl>

              <FormControl fullWidth margin="normal">
                <Button color="primary" href="/signup">
                  Sign up
                </Button>
              </FormControl>
            </Paper>
          </Grid>
        </Form>
      )}
    </Formik>
  </div>
);

export default LoginFomik;
