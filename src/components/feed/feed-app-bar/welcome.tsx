import { Typography } from "@mui/material";
import { format } from "date-fns";
import { Grid } from "@mui/system";

const labels = {
  welcome: "Welcome",
};

export const Welcome = () => {
  return (
    <Grid>
      <Typography variant="h3" color="primary">
        {labels.welcome}
      </Typography>
      <Typography variant="body1">
        {format(new Date(), "EEEE, dd.MM.yyyy")}
      </Typography>
    </Grid>
  );
};
