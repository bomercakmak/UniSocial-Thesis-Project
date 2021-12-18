import * as React from "react";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

function Sidebar(props) {
  const {
    social,
    eventTimeTitle,
    eventTime,
    totalParticipantsTitle,
    totalParticipants,
    eventParticipants,
    eventPlaceTitle,
    eventPlace,
    eventCategoryTitle,
    eventCategory,
    eventFeeTitle,
    eventFee,
    eventCovidRulesTitle,
    eventCovidRules,
    eventFormLink,
    eventContactNumberText,
  } = props;

  return (
    <Grid item xs={12} md={4}>
      <Paper elevation={0} sx={{ p: 2, bgcolor: "grey.300", mb: "10px" }}>
        <Typography variant="h6" gutterBottom>
          {eventTimeTitle}
        </Typography>
        <Typography>{eventTime}</Typography>
      </Paper>
      <Paper elevation={0} sx={{ p: 2, bgcolor: "grey.300", mb: "10px" }}>
        <Typography variant="h6" gutterBottom>
          {eventPlaceTitle}
        </Typography>
        <Typography>{eventPlace}</Typography>
      </Paper>
      <Paper elevation={0} sx={{ p: 2, bgcolor: "grey.300", mb: "10px" }}>
        <Typography variant="h6" gutterBottom>
          {totalParticipantsTitle}
        </Typography>
        <Typography>
          {totalParticipants === "0" || totalParticipants === 0
            ? `${eventParticipants} / Unlimited participants.`
            : `${totalParticipants} / ${eventParticipants}`}
        </Typography>
      </Paper>
      <Paper elevation={0} sx={{ p: 2, bgcolor: "grey.300", mb: "10px" }}>
        <Typography variant="h6" gutterBottom>
          Event application form.
        </Typography>
        <Typography>
          {eventFormLink === "" ? (
            "No event application form."
          ) : (
            <a href={eventFormLink} alt="eventLink">
              {" "}
              Application Link
            </a>
          )}
        </Typography>
      </Paper>
      <Paper elevation={0} sx={{ p: 2, bgcolor: "grey.300", mb: "10px" }}>
        <Typography variant="h6" gutterBottom>
          Event Contact Number
        </Typography>
        <Typography>
          {eventContactNumberText === ""
            ? "No cotnact number"
            : eventContactNumberText}
        </Typography>
      </Paper>
      <Paper elevation={0} sx={{ p: 2, bgcolor: "grey.300", mb: "10px" }}>
        <Typography variant="h6" gutterBottom>
          {eventCategoryTitle}
        </Typography>
        <Typography>
          {eventCategory === "" ? "Category not specified." : eventCategory}
        </Typography>
      </Paper>
      <Paper elevation={0} sx={{ p: 2, bgcolor: "grey.300", mb: "10px" }}>
        <Typography variant="h6" gutterBottom>
          {eventFeeTitle}
        </Typography>
        <Typography>{eventFee}</Typography>
      </Paper>
      <Paper elevation={0} sx={{ p: 2, bgcolor: "grey.300", mb: "10px" }}>
        <Typography variant="h6" gutterBottom>
          {eventCovidRulesTitle}
        </Typography>
        <Typography>
          {eventCovidRules === "" ? "No Rules" : eventCovidRules}
        </Typography>
      </Paper>
      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
        Social
      </Typography>
      <Link
        display="block"
        variant="body1"
        href={social || ""}
        sx={{ mb: 0.5 }}
      >
        <Stack direction="row" spacing={1} alignItems="center">
          <span>Social Media</span>
        </Stack>
      </Link>
    </Grid>
  );
}

export default Sidebar;
