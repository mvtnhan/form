import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import React from "react";

import { location } from "./location.js";

import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  Input,
  InputLabel,
  Paper,
  Typography,
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

function RegisterFormik() {
  return (
    <div>
      <Formik
        initialValues={{
          firstName: "Mai",
          lastName: "name",
          date: "1994-12-22",
          email: "",
          password: "Nh@n6796",
          changepassword: "Nh@n6796",
          receiveLetter: true,
          city: "",
          district: "",
          phoneNumber: "+84929402895",
          linkss: "",
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
          } else {
            localStorage[values.email] = JSON.stringify(values);
            window.location.href = "./";
          }
        }}
      >
        {({ values, touched, errors, setFieldValue, setTouched }) => (
          <Form>
            {console.log({ ...values })}
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
                        error={touched.firstName && !!errors.firstName}
                      >
                        <InputLabel>First Name</InputLabel>
                        <Field name="firstName">
                          {({ field }) => <Input fullWidth {...field} />}
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
                        <InputLabel>Last Name</InputLabel>
                        <Field name="lastName">
                          {({ field }) => <Input fullWidth {...field} />}
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
                    <InputLabel>{values.date === "" ? "" : "Date"}</InputLabel>
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
                    {touched.date && (
                      <FormHelperText>{errors.date}</FormHelperText>
                    )}
                  </FormControl>

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
                            />
                          )}
                        />
                      )}
                    </Field>
                  </FormControl>

                  <FormControl fullWidth margin="normal">
                    <Field name="district">
                      {({ field }) => (
                        <Autocomplete
                          id="district"
                          options={location[values.city]}
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
                            />
                          )}
                        />
                      )}
                    </Field>
                  </FormControl>

                  <FormControl fullWidth margin="normal">
                    <Field name="phoneNumber">
                      {({ field }) => (
                        <PhoneInput
                          style={{ marginTop: "24px" }}
                          placeholder="Enter phone number"
                          international
                          name="phoneNumber"
                          value={values.phoneNumber}
                          onChange={(value) => setFieldValue(field.name, value)}
                        />
                      )}
                    </Field>
                  </FormControl>

                  <FormControl
                    fullWidth
                    margin="normal"
                    error={touched.email && !!errors.email}
                  >
                    <InputLabel>Email</InputLabel>
                    <Field name="email">
                      {({ field }) => <Input fullWidth {...field} />}
                    </Field>
                    {touched.email && (
                      <FormHelperText>{errors.email}</FormHelperText>
                    )}
                  </FormControl>

                  <FormControl
                    fullWidth
                    margin="normal"
                    error={touched.password && !!errors.password}
                  >
                    <InputLabel>Password</InputLabel>
                    <Field name="password">
                      {({ field }) => (
                        <Input fullWidth type="password" {...field} />
                      )}
                    </Field>
                    {touched.password && (
                      <FormHelperText>{errors.password}</FormHelperText>
                    )}
                  </FormControl>

                  <FormControl
                    fullWidth
                    margin="normal"
                    error={touched.changepassword && !!errors.changepassword}
                  >
                    <InputLabel>Confirm Password</InputLabel>
                    <Field name="changepassword">
                      {({ field }) => (
                        <Input fullWidth type="password" {...field} />
                      )}
                    </Field>
                    {touched.changepassword && (
                      <FormHelperText>{errors.changepassword}</FormHelperText>
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
                    <Button color="primary" type="submit" href="">
                      Register
                    </Button>
                  </FormControl>

                  <FormControl fullWidth margin="normal">
                    <Button color="primary" href="/">
                      Login
                    </Button>
                  </FormControl>
                </Paper>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default RegisterFormik;
