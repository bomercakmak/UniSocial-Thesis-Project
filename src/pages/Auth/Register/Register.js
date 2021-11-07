import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Input from "@mui/material/Input";
import { useDispatch, useSelector } from "react-redux";
import LinkMU from "@mui/material/Link";
import { NavLink } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Copyright from "../../../components/Copyright/Copyright";
import BottomRight from "../../../components/toastify/BottomRight";
import { toast } from "react-toastify";
import { registerUser } from "../../../redux/actions/auth";
import ReactLoading from "react-loading";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { storage } from "../../../api/firebase";
import profileImg from "../../../assets/img/profile.png";

const theme = createTheme();

const Register = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const [loadingIn, setLoadingIn] = useState(false);
  const [profileImageSrc, setProfileImageSrc] = useState(profileImg);
  let email,
    password,
    rPassword,
    firstName,
    profileImgUrl,
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
    profileImgUrl = profileImageSrc;
    if (profileImageSrc === profileImg) {
      profileImgUrl =
        "https://firebasestorage.googleapis.com/v0/b/unisocial-thesis-project.appspot.com/o/images%2FPikPng.com_profile-icon-png_805068.png?alt=media&token=c473bf53-1207-4acd-a581-0a0516738a99";
    }
    const newUser = {
      email,
      password,
      firstName,
      lastName,
      profileImgUrl,
    };
    dispatch(registerUser(newUser));
  };
  const profileImgChange = (e) => {
    if (e.target.files[0]) {
      setLoadingIn(true);
      const uploadTask = storage
        .ref(`images/${e.target.files[0].name}`)
        .put(e.target.files[0]);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          setLoadingIn(false);
          console.log(error);
        },
        () => {
          storage
            .ref("images")
            .child(e.target.files[0].name)
            .getDownloadURL()
            .then((url) => {
              setProfileImageSrc(url);
              setLoadingIn(false);
            });
        }
      );
    } else {
      setProfileImageSrc(
        "https://firebasestorage.googleapis.com/v0/b/unisocial-thesis-project.appspot.com/o/images%2FPikPng.com_profile-icon-png_805068.png?alt=media&token=c473bf53-1207-4acd-a581-0a0516738a99"
      );
    }
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
              <Grid item xs={12} sm={12} align="center" justify="center">
                {loadingIn && (
                  <ReactLoading
                    type={"spinningBubbles"}
                    color={"#1976D2"}
                    height={40}
                    width={49}
                  />
                )}
                <label htmlFor="contained-button-file">
                  <img
                    alt="profile"
                    hidden={loadingIn}
                    style={{ maxHeight: "150px", borderRadius: "50%" }}
                    src={profileImageSrc}
                  />
                  <Input
                    onChange={profileImgChange}
                    style={{ display: "none" }}
                    accept="image/*"
                    id="contained-button-file"
                    multiple
                    type="file"
                  />
                  {!loadingIn && (
                    <ModeEditOutlineIcon
                      color="primary"
                      style={{
                        color: "#286090",
                        background: "#ddd",
                        borderRadius: "50%",
                        marginLeft: "-40px",
                        fontSize: "40px",
                        padding: "7px",
                      }}
                    />
                  )}
                </label>
              </Grid>
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
              disabled={loading}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {!loading ? (
                "Sign Up"
              ) : (
                <ReactLoading
                  type={"spinningBubbles"}
                  color={"#1976D2"}
                  height={30}
                  width={34}
                />
              )}
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
