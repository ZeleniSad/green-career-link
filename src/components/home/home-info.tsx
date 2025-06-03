import { Divider, Grid2, Typography } from "@mui/material";
import { LogoBar } from "@/components/logos/logo-bar";

export const HomeInfo = () => {
  return (
    <Grid2
      container
      sx={{
        width: "100%",
        justifyContent: "flex-start",
        gap: 3.5,
        pl: 30,
        pr: 30,
        color: "#032221",
      }}
    >
      <LogoBar />
      <Divider sx={{ width: "100%" }} color="primary" />

      <Typography variant="h3" color="primary">
        YES DO IT
      </Typography>
      <Grid2 container sx={{ width: "100%", justifyContent: "space-between" }}>
        <Grid2 size={{ xs: 12, lg: 6 }}>
          <Typography variant="body2" fontWeight={700}>
            Naziv projekta i akronim
          </Typography>
          <Typography variant="body2" fontWeight={100} fontStyle="italic">
            Project title and acronym
          </Typography>
        </Grid2>
        <Grid2 container size={{ xs: 12, lg: 6 }}>
          <Typography variant="body2">
            Snaga mladih preduzetnika - UČINITE / DA, UČINITE
          </Typography>
          <Typography variant="body2">
            Young Entrepreneurs Strength - DO IT / YES DO IT
          </Typography>
        </Grid2>
      </Grid2>

      <Grid2
        container
        sx={{
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Grid2 size={{ xs: 12, lg: 6 }}>
          <Typography variant="body2" fontWeight={700}>
            Glavni cilj projekta
          </Typography>
          <Typography variant="body2" fontWeight={100} fontStyle="italic">
            Main objective of the project
          </Typography>
        </Grid2>
        <Grid2 container size={{ xs: 12, lg: 6 }} spacing={1}>
          <Typography variant="body2">
            Glavni cilj projekta DA, UČINITE je stvaranje inovativnog i održivog
            mehanizma podrške zasnovanog na IKT, novim tehnologijama i zelenoj
            ekonomiji za početnike i preduzetnike u ranoj fazi, prvenstveno za
            one koji žive u ruralnom području CBC regiona koji će omogućiti
            njihov rast i razvoj.
          </Typography>
          <Typography variant="body2">
            Main objective of the project YES DO IT is to create innovative and
            sustainable supporting mechanism based on ICT, new technologies and
            green economy for start-ups and early stage entrepreneurs, primarily
            for those living in rural area of CBC region that will enable their
            growth and development.
          </Typography>
        </Grid2>
      </Grid2>

      <Grid2
        container
        sx={{
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Grid2 size={{ xs: 12, lg: 6 }}>
          <Typography variant="body2" fontWeight={700}>
            Ukupan budžet projekta i EU sufinansiranje
          </Typography>
          <Typography variant="body2" fontWeight={100} fontStyle="italic">
            Total project budget and EU co-financing
          </Typography>
        </Grid2>
        <Grid2 container size={{ xs: 12, lg: 6 }} spacing={1}>
          <Typography variant="body2">
            258,866.00 EUR / 220.036, 10 EUR
          </Typography>
        </Grid2>
      </Grid2>

      <Grid2
        container
        sx={{
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Grid2 size={{ xs: 12, lg: 6 }}>
          <Typography variant="body2" fontWeight={700}>
            Trajanje projekta
          </Typography>
          <Typography variant="body2" fontWeight={100} fontStyle="italic">
            Project duration
          </Typography>
        </Grid2>
        <Grid2 container size={{ xs: 12, lg: 6 }} spacing={1}>
          <Typography variant="body2">01/07/2024 - 30/09/2025</Typography>
        </Grid2>
      </Grid2>

      <Grid2
        container
        sx={{
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Grid2 size={{ xs: 12, lg: 6 }}>
          <Typography variant="body2" fontWeight={700}>
            Vodeći partner
          </Typography>
          <Typography variant="body2" fontWeight={100} fontStyle="italic">
            Lead partner
          </Typography>
        </Grid2>
        <Grid2
          container
          sx={{ flexDirection: "column" }}
          size={{ xs: 12, lg: 6 }}
        >
          <Typography variant="body2">
            Evropski omladinski centar Vojvodine
          </Typography>
          <Typography variant="body2">
            European Youth Centre of Vojvodina
          </Typography>
        </Grid2>
      </Grid2>

      <Grid2
        container
        sx={{
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 10,
        }}
      >
        <Grid2 size={{ xs: 12, lg: 10 }}>
          <Typography variant="body2" fontSize={10}>
            Projekt je sufinansiran sredstvima EFRR i IPA III fondova Europske
            unije.
          </Typography>
          <Typography
            variant="body2"
            fontWeight={100}
            fontStyle="italic"
            fontSize={10}
          >
            The project is co-financed by ERDF and IPA Ill funds of the European
            Union.
          </Typography>
        </Grid2>
        <Grid2
          container
          size={{ xs: 12, lg: 2 }}
          sx={{
            width: "100%",
            flexDirection: "column",
          }}
        >
          <Typography variant="body2" fontSize={10}>
            www.eocv.org
          </Typography>
          <Typography variant="body2" fontSize={10}>
            www.interreg-croatia-serbia.eu
          </Typography>
        </Grid2>
      </Grid2>
    </Grid2>
  );
};
