import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Input from "@mui/material/Input";
import { useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import BottomRight from "../../components/toastify/BottomRight";
import { toast } from "react-toastify";
import ReactLoading from "react-loading";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { storage } from "../../api/firebase";
import profileImg from "../../assets/img/profile.png";
import firebase from "../../api/firebase";
import { confirmAlert } from "react-confirm-alert";

const theme = createTheme();

const EditProfile = () => {
  const { id } = useParams();
  const [currentProfile, setCurrentProfile] = useState();
  const loading = useSelector((state) => state.auth.loading);
  const [loadingIn, setLoadingIn] = useState(false);
  const [profileImageSrc, setProfileImageSrc] = useState(profileImg);
  const currentUser = useSelector((state) => state.auth.userStatus);

  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [about, setAbout] = useState("");
  const [social, setSocial] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [rPassword, setrPassword] = useState("");
  const [profileImgUrl, setProfileImgUrl] = useState("");

  const refUser = firebase.firestore().collection("users");

  useEffect(() => {
    if (currentUser?.userId === id) {
      refUser.where("userId", "==", id).onSnapshot((querySnapshot) => {
        let objectval = null;
        querySnapshot.forEach((doc) => {
          objectval = { ...doc.data() };
        });
        setCurrentProfile(objectval);
        setEmail(objectval.email);
        setDepartment(objectval.department);
        setAbout(objectval.about);
        setSocial(objectval.social);
        setFirstName(objectval.firstName);
        setLastName(objectval.lastName);
        setPassword("aaaaaaa");
        setrPassword("aaaaaaa");
        setProfileImgUrl(objectval.profileImgUrl);
        setProfileImageSrc(objectval.profileImgUrl);
        return () => {};
      });
    }
    // eslint-disable-next-line
  }, []);
  console.log(profileImgUrl);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !email.trim() ||
      !password.trim() ||
      !rPassword.trim() ||
      !firstName.trim() ||
      !lastName.trim() ||
      !about.trim() ||
      !department.trim()
    ) {
      toast.error("Please fill in the required fields!");
      return;
    }
    let varProfileImgUrl;
    varProfileImgUrl = profileImageSrc;
    if (profileImageSrc === profileImg) {
      varProfileImgUrl =
        "https://firebasestorage.googleapis.com/v0/b/unisocial-thesis-project.appspot.com/o/images%2FPikPng.com_profile-icon-png_805068.png?alt=media&token=c473bf53-1207-4acd-a581-0a0516738a99";
    }
    const updatedUser = {
      firstName,
      lastName,
      department,
      social,
      about,
      profileImgUrl: varProfileImgUrl,
    };
    if (currentUser.userId === currentProfile.userId) {
      confirmAlert({
        title: "Confirm to edit profile!",
        message: "Are you sure to edit you profile!.",
        buttons: [
          {
            label: "Yes",
            onClick: () => {
              refUser
                .doc(currentUser.userId)
                .update(updatedUser)
                .catch((err) => {
                  console.log(err);
                });
              return;
            },
          },
          {
            label: "No",
          },
        ],
      });
      return;
    }
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
            marginTop: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            {`Hi ${currentUser?.firstName}, edit your profile`}
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
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  id="firstName"
                  label="First Name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="department"
                  label="Department"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  name="department"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  multiline
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  rows={4}
                  id="about"
                  label="About"
                  name="about"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="social"
                  label="Social Media Link"
                  name="social"
                  value={social}
                  onChange={(e) => setSocial(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled
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
                  value={rPassword}
                  onChange={(e) => setrPassword(e.target.value)}
                  disabled
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
                "Edit Profile"
              ) : (
                <ReactLoading
                  type={"spinningBubbles"}
                  color={"#1976D2"}
                  height={30}
                  width={34}
                />
              )}
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
export default EditProfile;
