import CardComp from "../../components/Card/Card";
import Grid from "@mui/material/Grid";
// import { styled } from "@mui/material/styles";
// import Paper from "@mui/material/Paper";

// // const Item = styled(Paper)(({ theme }) => ({
// //   ...theme.typography.body2,
// //   padding: theme.spacing(1),
// //   textAlign: "center",
// //   color: theme.palette.text.secondary,
// // }));

const HomeCards = () => {
  return (
    <div>
      <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12} md={6} center>
          <CardComp />
        </Grid>
        <Grid item xs={12} md={6}>
          <CardComp />
        </Grid>
        <Grid item xs={12} md={6}>
          <CardComp />
        </Grid>
        <Grid item xs={12} md={6}>
          <CardComp />
        </Grid>
      </Grid>
    </div>
  );
};

export default HomeCards;
