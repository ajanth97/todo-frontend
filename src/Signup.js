import { Box, Typography, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { Link, useNavigate } from "react-router-dom";
import { isName } from "./utils/isName";
import { validate as validateEmail } from "email-validator";
import { useFormik } from "formik";
import { useState } from "react";
import axios from "axios";

const validate = (values) => {
  const required = "Required !";
  const invalidName = "Please enter a valid name";
  const invalidEmail = "Please enter a valid email";
  const passwordMismatch = "Passwords do not match";
  const passwordShort = "Password should be atleast 8 characters long";
  const errors = {};
  if (!values.firstName) {
    errors.firstName = required;
  } else if (!isName(values.firstName)) {
    errors.firstName = invalidName;
  }

  if (!values.lastName) {
    errors.lastName = required;
  } else if (!isName(values.lastName)) {
    errors.lastName = invalidName;
  }

  if (!values.email) {
    errors.email = required;
  } else if (!validateEmail(values.email)) {
    errors.email = invalidEmail;
  }

  if (!values.password) {
    errors.password = required;
  } else if (values.password.length < 8) {
    errors.password = passwordShort;
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = required;
  } else if (values.confirmPassword !== values.password) {
    errors.password = passwordMismatch;
    errors.confirmPassword = passwordMismatch;
  }

  return errors;
};

const signupEndpoint = "https://todo-project-backend.herokuapp.com/api/signup";

function Signup() {
  const [isLoading, setIsLoading] = useState(false);
  const [postError, setPostError] = useState({});
  const navigate = useNavigate();
  const submit = (values) => {
    const body = values;
    setIsLoading(true);
    axios
      .post(signupEndpoint, body)
      .then(({ data }) => {
        localStorage.setItem("token", data.token);
        navigate("/", { state: { data } });
      })
      .catch((error) => {
        const errorResp = error.response.data;
        const errors = errorResp.errors;
        setPostError(errors);
        setIsLoading(false);
      });
  };
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate,
    onSubmit: submit,
  });
  const emailError = postError.email
    ? postError.email.msg
    : formik.touched.email
    ? formik.errors.email
    : null;
  const passwordError = formik.touched.password ? formik.errors.password : null;
  const confirmPasswordError = formik.touched.confirmPassword
    ? formik.errors.confirmPassword
    : null;
  const firstNameError = formik.touched.firstName
    ? formik.errors.firstName
    : null;
  const lastNameError = formik.touched.lastName ? formik.errors.lastName : null;
  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography component="h1" variant="h5">
        Sign Up
      </Typography>
      <Typography component="h5" variant="h7">
        Let's create a new account.
      </Typography>
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        noValidate
        sx={{ mt: 1 }}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          error={emailError}
          helperText={emailError}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          error={passwordError}
          helperText={passwordError}
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          id="confirmPassword"
          autoComplete="current-password"
          onChange={formik.handleChange}
          value={formik.values.confirmPassword}
          onBlur={formik.handleBlur}
          error={confirmPasswordError}
          helperText={confirmPasswordError}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="firstName"
          label="First Name"
          name="firstName"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={firstNameError}
          helperText={firstNameError}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="lastName"
          label="Last Name"
          name="lastName"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={lastNameError}
          helperText={lastNameError}
        />
        <LoadingButton
          loading={isLoading}
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign Up
        </LoadingButton>
        <Typography component="h4" variant="h7">
          Already have an account ? Please <Link to="/login">Log in</Link>
        </Typography>
      </Box>
    </Box>
  );
}

export default Signup;
