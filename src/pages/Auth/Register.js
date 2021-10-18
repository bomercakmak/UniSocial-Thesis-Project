import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import LinkMU from "@mui/material/Link";
import { NavLink } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Copyright from "../../components/Copyright/Copyright";
import BottomRight from "../../components/toastify/BottomRight";
import { toast } from "react-toastify";

const theme = createTheme();

const Register = () => {
  const dispatch = useDispatch();

  let email,
    password,
    rPassword,
    firstName,
    lastName = "";
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    email = data.get("email");
    password = data.get("password");
    firstName = data.get("firstName");
    lastName = data.get("lastName");
    rPassword = data.get("rPassword");
    if (
      !email.trim() ||
      !password.trim() ||
      !rPassword.trim() ||
      !firstName.trim() ||
      !lastName.trim()
    ) {
      toast.error("Please fill in the required fields!");
      return;
    }
    if (password.trim().length < 6) {
      toast.error("Password must be at least 6 characters!");
      return;
    }
    if (password !== rPassword) {
      toast.error("Password and Repeat Password should be the same!");
      return;
    }
    const newUser = {
      email,
      password,
      firstName,
      lastName,
    };
    // dispatch(registerUser(newUser));

    console.log({
      email,
      password,
      firstName,
      lastName,
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <BottomRight />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="rPassword"
                  label="Repeat Password"
                  type="password"
                  id="rPassword"
                  autoComplete="new-password"
                  helperText="Password must be at least 6 characters."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <LinkMU component={NavLink} to="/login" variant="body2">
                  Already have an account? Register
                </LinkMU>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
};
export default Register;
