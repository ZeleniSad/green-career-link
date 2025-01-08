import { HomeBar } from "@/components/home/home-bar";
import { Grid } from "@mui/system";
import { HomeBanner } from "@/components/home/home-banner";
import { HomeOverview } from "@/components/home/home-overview";
import { HomeWhyJoinsUs } from "@/components/home/home-why-joins-us";
import { HomeHowItWorks } from "@/components/home/home-how-it-works";
import { HomeGetStarted } from "@/components/home/home-get-started";
import { HomeFooter } from "@/components/home/home-footer";

const Home = (): JSX.Element => {
  return (
    <Grid container sx={{ p: 2, gap: 3 }}>
      <HomeBar />
      <HomeBanner />
      <Grid container sx={{ gap: 20, pt: 10 }}>
        <HomeOverview />
        <HomeWhyJoinsUs />
        <HomeHowItWorks />
        <HomeGetStarted />
        <HomeFooter />
      </Grid>
    </Grid>
  );
};

export default Home;
