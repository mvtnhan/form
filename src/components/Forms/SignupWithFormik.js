import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import React from "react";
import { location } from "../../location.js";

import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@material-ui/core";

function SignupForm(props) {
  return (
    <Form>
      <Grid container justify="center" alignContent="center">
        <Grid item xs={6} md={4}>
          <Paper
            elevation={4}
            style={{ padding: "20px 15px", marginTop: "30px" }}
          >
            <Typography gutterBottom>Signup</Typography>
            <Grid container direction="row" spacing={5}>
              {/* firstName */}
              <Grid item xs={6}>
                <FormControl
                  fullWidth
                  margin="normal"
                  error={props.touched.firstName && !!props.errors.firstName}
                >
                  <InputLabel>First Name</InputLabel>
                  <Field name="firstName">
                    {({ field }) => <Input fullWidth {...field} />}
                  </Field>
                  {props.touched.firstName && (
                    <FormHelperText>{props.errors.firstName}</FormHelperText>
                  )}
                </FormControl>
              </Grid>

              {/* lastName */}
              <Grid item xs={6}>
                <FormControl
                  fullWidth
                  margin="normal"
                  error={props.touched.lastName && !!props.errors.lastName}
                >
                  <InputLabel>Last Name</InputLabel>
                  <Field name="lastName">
                    {({ field }) => <Input fullWidth {...field} />}
                  </Field>
                  {props.touched.lastName && (
                    <FormHelperText>{props.errors.lastName}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
            </Grid>

            {/* date */}
            <FormControl
              fullWidth
              margin="normal"
              error={props.touched.date && !!props.errors.date}
            >
              <InputLabel>{props.values.date === "" ? "" : "Date"}</InputLabel>
              <Field name="date">
                {({ field }) => (
                  <Input
                    fullWidth
                    type="date"
                    placeholder="YYYY-MM-DD"
                    pattern="[1-9]{4}-[1-12]{2}-[1-31]{2}"
                    {...field}
                  />
                )}
              </Field>
              {props.touched.date && (
                <FormHelperText>{props.errors.date}</FormHelperText>
              )}
            </FormControl>
            <Grid container direction="row" spacing={5}>
              <Grid item xs={6}>
                <FormControl fullWidth margin="normal">
                  <InputLabel>City/ Province</InputLabel>
                  <Select
                    name="city"
                    value={props.values.city}
                    onChange={props.handleChange}
                  >
                    {Object.keys(location).map((city) => (
                      <MenuItem key={city} value={city}>
                        {city}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl
                  fullWidth
                  margin="normal"
                  disabled={!props.values.city}
                >
                  <InputLabel>District</InputLabel>
                  <Select
                    name="district"
                    value={props.values.district}
                    onChange={props.handleChange}
                  >
                    {props.values.city &&
                      location[props.values.city].map((district) => (
                        <MenuItem key={district} value={district}>
                          {district}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <FormControl
              fullWidth
              margin="normal"
              error={props.touched.email && !!props.errors.email}
            >
              <InputLabel>Email</InputLabel>
              <Field name="email">
                {({ field }) => <Input fullWidth {...field} />}
              </Field>
              {props.touched.email && (
                <FormHelperText>{props.errors.email}</FormHelperText>
              )}
            </FormControl>

            <FormControl
              fullWidth
              margin="normal"
              error={props.touched.password && !!props.errors.password}
            >
              <InputLabel>Password</InputLabel>
              <Field name="password">
                {({ field }) => <Input fullWidth type="password" {...field} />}
              </Field>
              {props.touched.password && (
                <FormHelperText>{props.errors.password}</FormHelperText>
              )}
            </FormControl>

            <FormControl
              fullWidth
              margin="normal"
              error={
                props.touched.changepassword && !!props.errors.changepassword
              }
            >
              <InputLabel>Confirm Password</InputLabel>
              <Field name="changepassword">
                {({ field }) => <Input fullWidth type="password" {...field} />}
              </Field>
              {props.touched.changepassword && (
                <FormHelperText>{props.errors.changepassword}</FormHelperText>
              )}
            </FormControl>

            <Field name="receiveLetter" type="checkbox">
              {({ field }) => (
                <FormControlLabel
                  control={<Checkbox {...field} />}
                  label="I accept the Terms of Use & Privacy Policy"
                />
              )}
            </Field>

            <FormControl fullWidth margin="normal">
              <Button color="primary" type="submit">
                Signup
              </Button>
            </FormControl>
          </Paper>
        </Grid>
      </Grid>
    </Form>
  );
}

const FormikForm = withFormik({
  mapPropsToValues() {
    return {
      firstName: "",
      lastName: "",
      date: "",
      email: "",
      password: "",
      changepassword: "",
      receiveLetter: true,
      city: "",
      district: "",
    };
  },

  validationSchema: Yup.object().shape({
    firstName: Yup.string().required("Username is required"),
    lastName: Yup.string().required("Username is required"),
    date: Yup.date()
      .required("Date is required")
      .nullable()
      .min(new Date(1900, 0, 1)),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must have min 8 characters"),
    changepassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password")], "Both password need to be the same"),
    city: Yup.string().required("City/ Province is required"),
    district: Yup.string().required("District is required"),
  }),
})(SignupForm);

export default FormikForm;
