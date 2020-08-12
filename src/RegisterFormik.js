import { Formik, Form, Field } from "formik";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import React from "react";

import { location } from "./location.js";
import { StyledPaper, StyledPhoneInput, StyledTypography } from "./Styled";

import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
} from "@material-ui/core";

import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

function RegisterFormik() {
  const history = useHistory();
  return (
    <div>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          date: "",
          email: "",
          password: "",
          changepassword: "",
          receiveLetter: true,
          city: "",
          district: "",
          phoneNumber: "",
        }}
        validationSchema={Yup.object().shape({
          firstName: Yup.string().required("Username is required"),
          lastName: Yup.string().required("Lastname is required"),
          date: Yup.date()
            .required("Date is required")
            .nullable()
            .min(new Date(1900, 0, 1)),
          email: Yup.string()
            .required("Email is required")
            .email("Email is invalid"),
          password: Yup.string()
            .required("Password is required")
            .min(8, "Password must have min 8 characters"),
          changepassword: Yup.string()
            .required("Confirm Password is required")
            .oneOf([Yup.ref("password")], "Both password need to be the same"),
          city: Yup.string().required("City/ Province is required"),
          district: Yup.string().required("District is required"),
          phoneNumber: Yup.string().required("Phone number is required"),
        })}
        onSubmit={(values) => {
          if (localStorage.getItem(values.email) != null) {
            alert("Email is registered");
            return (values.email = "");
          } else {
            localStorage[values.email] = JSON.stringify(values);
            history.push("/");
          }
        }}
      >
        {({ values, touched, errors, setFieldValue, setTouched }) => (
          <Form>
            <Grid container justify="center" alignContent="center">
              <Grid item xs={6} md={4}>
                <StyledPaper elevation={4}>
                  <StyledTypography gutterBottom>Signup</StyledTypography>

                  <Grid container direction="row" spacing={5}>
                    {/* firstName */}
                    <Grid item xs={6}>
                      <FormControl
                        fullWidth
                        margin="normal"
                        error={touched.firstName && !!errors.firstName}
                      >
                        <Field name="firstName">
                          {({ field }) => (
                            <TextField
                              id="firstName"
                              label="First Name"
                              variant="outlined"
                              {...field}
                            />
                          )}
                        </Field>

                        {touched.firstName && (
                          <FormHelperText>{errors.firstName}</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>

                    {/* lastName */}
                    <Grid item xs={6}>
                      <FormControl
                        fullWidth
                        margin="normal"
                        error={touched.lastName && !!errors.lastName}
                      >
                        <Field name="lastName">
                          {({ field }) => (
                            <TextField
                              id="lastName"
                              label="Last Name"
                              variant="outlined"
                              {...field}
                            />
                          )}
                        </Field>
                        {touched.lastName && (
                          <FormHelperText>{errors.lastName}</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                  </Grid>

                  {/* date */}
                  <FormControl
                    fullWidth
                    margin="normal"
                    error={touched.date && !!errors.date}
                  >
                    <Field name="date">
                      {({ field }) => (
                        <TextField
                          id="date"
                          variant="outlined"
                          label="BirthDay"
                          type="date"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          {...field}
                        />
                      )}
                    </Field>
                    {touched.date && (
                      <FormHelperText>{errors.date}</FormHelperText>
                    )}
                  </FormControl>

                  {/* City */}
                  <FormControl fullWidth margin="normal">
                    <Field name="city">
                      {({ field }) => (
                        <Autocomplete
                          id="city"
                          options={Object.keys(location)}
                          getOptionLabel={(city) => city}
                          onChange={(_, value) =>
                            setFieldValue(field.name, value)
                          }
                          onBlur={() => setTouched({ [field.name]: true })}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              name="city"
                              label="City/ Province"
                              variant="outlined"
                            />
                          )}
                        />
                      )}
                    </Field>
                  </FormControl>

                  {/* District */}
                  <FormControl fullWidth margin="normal">
                    <Field name="district">
                      {({ field }) => (
                        <Autocomplete
                          id="district"
                          options={!!values.city ? location[values.city] : []}
                          disabled={!values.city}
                          getOptionLabel={(district) => district}
                          onChange={(_, value) =>
                            setFieldValue(field.name, value)
                          }
                          onBlur={() => setTouched({ [field.name]: true })}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              name="district"
                              label="District"
                              variant="outlined"
                            />
                          )}
                        />
                      )}
                    </Field>
                  </FormControl>

                  {/* Phone */}
                  <FormControl fullWidth margin="normal">
                    <Field name="phoneNumber">
                      {({ field }) => (
                        <StyledPhoneInput
                          placeholder="Enter Phone Number"
                          international
                          name="phoneNumber"
                          value={values.phoneNumber}
                          onChange={(value) => setFieldValue(field.name, value)}
                        />
                      )}
                    </Field>
                  </FormControl>

                  {/* Email */}
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

                  {/* Pass */}
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

                  {/* confirm pass */}
                  <FormControl
                    fullWidth
                    margin="normal"
                    error={touched.changepassword && !!errors.changepassword}
                  >
                    <Field name="changepassword">
                      {({ field }) => (
                        <TextField
                          id="changepassword"
                          label="Confirm Password"
                          variant="outlined"
                          type="password"
                          {...field}
                        />
                      )}
                    </Field>
                    {touched.changepassword && (
                      <FormHelperText>{errors.changepassword}</FormHelperText>
                    )}
                  </FormControl>

                  {/* accept */}
                  <Field name="receiveLetter" type="checkbox">
                    {({ field }) => (
                      <FormControlLabel
                        control={<Checkbox {...field} />}
                        label="I accept the Terms of Use & Privacy Policy"
                      />
                    )}
                  </Field>

                  {/* button */}
                  <FormControl fullWidth margin="normal">
                    <Button variant="contained" color="primary" type="submit">
                      Register
                    </Button>
                  </FormControl>

                  <StyledTypography gutterBottom>
                    <a href="/">Login</a>
                  </StyledTypography>
                </StyledPaper>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default RegisterFormik;
