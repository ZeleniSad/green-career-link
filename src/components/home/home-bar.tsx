import { Button } from "@mui/material";
import Image from "next/image";
import { Grid } from "@mui/system";

export const HomeBar = () => {
  return (
    <Grid
      container
      sx={{
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Grid>
        <Image
          src="/images/eu-logo.png"
          alt="EU Logo"
          width={341}
          height={0}
          layout="intrinsic"
        />
      </Grid>
      <Grid container sx={{ gap: 2, alignItems: "center" }}>
        <Button variant="text" sx={{ borderRadius: 2 }} href="#overview">
          Overview
        </Button>
        <Button variant="text" sx={{ borderRadius: 2 }} href="#whyJoinUs">
          Why join us
        </Button>
        <Button variant="text" sx={{ borderRadius: 2 }} href="#howItWorks">
          How it works
        </Button>
        <Button variant="text" sx={{ borderRadius: 2 }} href="#contact">
          Contact
        </Button>
        <Button
          variant="contained"
          color="success"
          sx={{ borderRadius: 2 }}
          href="/register"
        >
          Get started
        </Button>
      </Grid>
      <Grid sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Image
          src="/images/evropski_omladinski_centar_vojvodine.png"
          alt="Evropski Omladinski Centar Vojvodine"
          width={95}
          height={0}
          layout="intrinsic"
        />
        <Image
          src="/images/ekolosko_udruzenje_zeleni_sad.png"
          alt="Ekološko Udruženje Zeleni Sad"
          width={95}
          height={0}
          layout="intrinsic"
        />
        <Image
          src="/images/centar_za_mlade_dali.png"
          alt="Centar za Mlade Dali"
          width={95}
          height={0}
          layout="intrinsic"
        />
      </Grid>
    </Grid>
  );
};
