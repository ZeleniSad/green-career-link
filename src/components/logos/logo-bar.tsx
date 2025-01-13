import { Box } from "@mui/material";
import Image from "next/image";
import { Grid } from "@mui/system";

export const LogoBar = () => {
  return (
    <Grid
      container
      sx={{
        width: "100%",
        justifyContent: "space-between",
        alignItems: "flex-start",
        height: "100px",
      }}
    >
      <Box>
        <Image
          src="/images/eu-logo.png"
          alt="Green"
          width={341}
          height={0}
          layout="intrinsic"
        />
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Image
          src="/images/evropski_omladinski_centar_vojvodine.png"
          alt="Green"
          width={95}
          height={0}
          layout="intrinsic"
        />
        <Image
          src="/images/ekolosko_udruzenje_zeleni_sad.png"
          alt="Green"
          width={95}
          height={0}
          layout="intrinsic"
        />
        <Image
          src="/images/centar_za_mlade_dali.png"
          alt="Green"
          width={95}
          height={0}
          layout="intrinsic"
        />
      </Box>
    </Grid>
  );
};
