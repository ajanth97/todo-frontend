import { Box, Typography, TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";

function Login() {
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
        onSubmit={() => {
          console.log("submit");
        }}
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
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Log In
        </Button>
        <Typography component="h4" variant="h7">
          If you are new here, Please <Link to="/signup">Sign up</Link>
        </Typography>
      </Box>
    </Box>
  );
}

export default Login;
