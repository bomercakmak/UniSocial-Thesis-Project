import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { NavLink } from "react-router-dom";

function FeaturedPost(props) {
  const { title, date, description, image, imageLabel, eventOwnerId } = props;

  return (
    <Grid item xs={12} md={6}>
      <Typography variant="h6" gutterBottom>
        Event Organizer
      </Typography>
      <NavLink
        to={`/profile/${eventOwnerId}`}
        style={{
          color: "inherit",
          textDecoration: "none",
        }}
      >
        <CardActionArea component="a" href="#">
          <Card sx={{ display: "flex" }}>
            <CardContent sx={{ flex: 1 }}>
              <Typography component="h2" variant="h5">
                {title}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {date}
              </Typography>
              <Typography variant="subtitle1" paragraph>
                {description?.length > 110
                  ? `${description?.substring(0, 110)}...`
                  : description}
              </Typography>
              <Typography variant="subtitle1" color="primary">
                Go to profile
              </Typography>
            </CardContent>
            <CardMedia
              component="img"
              sx={{ width: 160, display: { xs: "none", sm: "block" } }}
              image={image}
              alt={imageLabel}
            />
          </Card>
        </CardActionArea>
      </NavLink>
    </Grid>
  );
}

export default FeaturedPost;
