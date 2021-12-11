import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Markdown from "./Markdown";

function Main(props) {
  const { post, title } = props;

  return (
    <Grid
      item
      xs={12}
      md={8}
      sx={{
        "& .markdown": {
          py: 3,
        },
      }}
    >
      <Typography variant="h6" gutterBottom>
        {title ? title : ""}
      </Typography>
      <Divider />
      <Markdown className="markdown" key={post}>
        {post ? post : ""}
      </Markdown>
    </Grid>
  );
}

export default Main;
