import { Formik, Form, Field } from "formik";
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

const SignupFormik = () => (
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
      }}
      validationSchema={Yup.object().shape({
        firstName: Yup.string().required("Username is required"),
        lastName: Yup.string().required("Username is required"),
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
      })}
      onSubmit={(values) => {
        localStorage.setItem(values.email, JSON.stringify(values));
        // localStorage.setItem("lastName", values.lastName);
        // localStorage.setItem("date", values.date);
        // localStorage.setItem("email", values.email);
        // localStorage.setItem("password", values.password);
        // localStorage.setItem("city", values.city);
        // localStorage.setItem("district", values.district);
      }}
    >
      {(formik) => (
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
                      error={
                        formik.touched.firstName && !!formik.errors.firstName
                      }
                    >
                      <InputLabel>First Name</InputLabel>
                      <Field name="firstName">
                        {({ field }) => <Input fullWidth {...field} />}
                      </Field>

                      {formik.touched.firstName && (
                        <FormHelperText>
                          {formik.errors.firstName}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>

                  {/* lastName */}
                  <Grid item xs={6}>
                    <FormControl
                      fullWidth
                      margin="normal"
                      error={
                        formik.touched.lastName && !!formik.errors.lastName
                      }
                    >
                      <InputLabel>Last Name</InputLabel>
                      <Field name="lastName">
                        {({ field }) => <Input fullWidth {...field} />}
                      </Field>
                      {formik.touched.lastName && (
                        <FormHelperText>
                          {formik.errors.lastName}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                </Grid>

                {/* date */}
                <FormControl
                  fullWidth
                  margin="normal"
                  error={formik.touched.date && !!formik.errors.date}
                >
                  <InputLabel>
                    {formik.values.date === "" ? "" : "Date"}
                  </InputLabel>
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
                  {formik.touched.date && (
                    <FormHelperText>{formik.errors.date}</FormHelperText>
                  )}
                </FormControl>
                <Grid container direction="row" spacing={5}>
                  <Grid item xs={6}>
                    <FormControl fullWidth margin="normal">
                      <InputLabel>City/ Province</InputLabel>
                      <Select
                        name="city"
                        value={formik.values.city}
                        onChange={formik.handleChange}
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
                      disabled={!formik.values.city}
                    >
                      <InputLabel>District</InputLabel>
                      <Select
                        name="district"
                        value={formik.values.district}
                        onChange={formik.handleChange}
                      >
                        {formik.values.city &&
                          location[formik.values.city].map((district) => (
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

                <FormControl
                  fullWidth
                  margin="normal"
                  error={
                    formik.touched.changepassword &&
                    !!formik.errors.changepassword
                  }
                >
                  <InputLabel>Confirm Password</InputLabel>
                  <Field name="changepassword">
                    {({ field }) => (
                      <Input fullWidth type="password" {...field} />
                    )}
                  </Field>
                  {formik.touched.changepassword && (
                    <FormHelperText>
                      {formik.errors.changepassword}
                    </FormHelperText>
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
      )}
    </Formik>
  </div>
);

export default SignupFormik;
