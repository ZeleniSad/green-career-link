import { Grid } from "@mui/system";
import { Button, Typography } from "@mui/material";
import styles from "../../app/home.module.css";

export const HomeFooter = () => {
  return (
    <Grid container className={styles.footer}>
      <Grid
        container
        sx={{
          width: "100%",
          height: "100%",
          justifyContent: "space-between",
          alignItems: "space-between",
          pl: 30,
          pr: 30,
        }}
        id="contact"
      >
        <Grid
          container
          sx={{
            width: "100%",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Grid>
            <Typography variant="h1" fontWeight={500}>
              LET&apos;S TALK
            </Typography>
          </Grid>
          <Grid sx={{ display: "flex", gap: 3 }}>
            <Button
              color="primary"
              variant="outlined"
              href="mailto:ekoloskoudruzenjezelenisad@gmail.com"
            >
              Contact Us
            </Button>
            <Button color="primary" variant="contained" href="/register">
              Get Started
            </Button>
          </Grid>
        </Grid>
        <Grid
          container
          sx={{
            justifyContent: "flex-end",
            alignItems: "center",
          }}
          size={12}
        >
          <Typography
            variant="h1"
            textAlign="right"
            color="primary"
            fontWeight={500}
          >
            YOUR <br />
            GREEN <br />
            PARTNER
          </Typography>
        </Grid>
        <Grid
          container
          sx={{
            width: "100%",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <Grid container sx={{ flexDirection: "column" }}>
            <Typography variant="body1" fontWeight={500}>
              GREEN CAREER LINK / YES DO IT
            </Typography>
            <Typography variant="body2" textAlign="center" fontWeight={500}>
              © 2025 Green Career Link. All rights reserved.
            </Typography>
          </Grid>
          <Grid sx={{ display: "flex", gap: 2 }}>
            <Typography variant="body1" fontWeight={500}>
              Privacy Policy
            </Typography>
            <Typography variant="body1" fontWeight={500}>
              Terms
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
