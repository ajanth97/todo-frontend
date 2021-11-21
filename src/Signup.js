import { Box, Typography, TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";

function Signup() {
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
        <TextField
          margin="normal"
          required
          fullWidth
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          id="confirmPassword"
          autoComplete="current-password"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign Up
        </Button>
        <Typography component="h4" variant="h7">
          Already have an account ? Please <Link to="/login">Log in</Link>
        </Typography>
      </Box>
    </Box>
  );
}

export default Signup;
