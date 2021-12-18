import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

function Sidebar(props) {
  const {
    departmentTitle,
    department,
    joinDateTitle,
    joinDate,
    emailTitle,
    email,
    social,
  } = props;

  return (
    <Grid item xs={12} md={4}>
      <Paper elevation={0} sx={{ p: 2, bgcolor: "grey.300", mb: "10px" }}>
        <Typography variant="h6" gutterBottom>
          {departmentTitle}
        </Typography>
        <Typography>{department}</Typography>
      </Paper>
      <Paper elevation={0} sx={{ p: 2, bgcolor: "grey.300", mb: "10px" }}>
        <Typography variant="h6" gutterBottom>
          {joinDateTitle}
        </Typography>
        <Typography>{joinDate}</Typography>
      </Paper>
      <Paper elevation={0} sx={{ p: 2, bgcolor: "grey.300", mb: "10px" }}>
        <Typography variant="h6" gutterBottom>
          {emailTitle}
        </Typography>
        <Typography>{email}</Typography>
      </Paper>
      <Paper elevation={0} sx={{ p: 2, bgcolor: "grey.300", mb: "10px" }}>
        <Typography variant="h6" gutterBottom>
          Social
        </Typography>
        <Typography>
          {social === "" ? (
            "No Social."
          ) : (
            <a href={social} alt="eventLink">
              {" "}
              {social}
            </a>
          )}
        </Typography>
      </Paper>
    </Grid>
  );
}

export default Sidebar;
