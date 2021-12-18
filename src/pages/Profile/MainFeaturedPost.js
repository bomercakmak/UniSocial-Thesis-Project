import * as React from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Main from "./Main";

function MainFeaturedPost(props) {
  const { profile } = props;

  return (
    <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid item md={6}>
        <Paper
          sx={{
            minHeight: "25rem",
            position: "relative",
            backgroundColor: "grey.800",
            color: "#fff",
            mb: 4,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundImage: `url(${profile.image})`,
          }}
        >
          <Grid item md={6}>
            {/* Increase the priority of the hero background image */}
            {
              <img
                style={{ display: "none" }}
                src={profile?.image}
                alt={profile.imageText}
              />
            }
            <Box
              sx={{
                position: "absolute",
                top: 0,
                bottom: 0,
                right: 0,
                left: 0,
              }}
            />
          </Grid>
        </Paper>
      </Grid>
      <Grid item md={6}>
        <Main title={`About`} description={profile?.description} />
      </Grid>
    </Grid>
  );
}

export default MainFeaturedPost;
