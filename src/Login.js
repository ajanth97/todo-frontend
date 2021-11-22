import { Box, Typography, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useState } from "react";
import axios from "axios";
import LoadingButton from "@mui/lab/LoadingButton";

const loginEndpoint = "https://todo-project-backend.herokuapp.com/api/login";

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [postError, setPostError] = useState({});
  const navigate = useNavigate();
  const submit = (values) => {
    setIsLoading(true);
    const body = values;
    axios
      .post(loginEndpoint, body)
      .then(({ data }) => {
        localStorage.setItem("token", data.token);
        navigate("/", { state: { data } });
      })
      .catch((error) => {
        const errors = error.response.data;
        setPostError(errors);
        setIsLoading(false);
      });
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: submit,
  });
  const loginError = postError.message;

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
        Log in
      </Typography>
      <Typography component="h5" variant="h7">
        Please Log in to access your todos.
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
          value={formik.values.email}
          onChange={formik.handleChange}
          error={loginError}
          helperText={loginError}
          autoFocus
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
          value={formik.values.password}
          onChange={formik.handleChange}
          error={loginError}
          helperText={loginError}
        />

        <LoadingButton
          loading={isLoading}
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Log In
        </LoadingButton>
        <Typography component="h4" variant="h7">
          If you are new here, Please <Link to="/signup">Sign up</Link>
        </Typography>
      </Box>
    </Box>
  );
}

export default Login;
