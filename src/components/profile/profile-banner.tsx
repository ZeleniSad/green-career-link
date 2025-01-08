import styles from "@/components/profile/profile.module.css";
import { Grid } from "@mui/system";
import { Avatar, Typography } from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";
import Work from "@mui/icons-material/Work";
import { CompanyInformation, IndividualInformation } from "@/types/interfaces";
import { UserType } from "@/types/enums";

export const ProfileBanner = ({
  profile,
}: {
  profile: CompanyInformation | IndividualInformation;
}) => {
  return (
    <Grid container className={styles.profileBanner}>
      <Grid container sx={{ gap: 3, alignItems: "center" }}>
        <Avatar src={profile.image} sx={{ height: 120, width: 120 }} />
        <Grid container sx={{ flexDirection: "column", gap: 3 }}>
          <Typography variant="h4" color="white">
            {profile?.type === UserType.Company
              ? profile?.companyName
              : profile?.firstName + " " + profile?.lastName}
          </Typography>
          <Grid container sx={{ gap: 1, color: "white" }}>
            {profile?.type === UserType.Company ? (
              <Grid container sx={{ alignItems: "center", gap: 1 }}>
                <LinkIcon />
                <Typography variant="body2">{profile?.website}</Typography>
              </Grid>
            ) : (
              <Grid container sx={{ alignItems: "center", gap: 1 }}>
                <Work />
                <Typography variant="body2">{profile?.title}</Typography>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
      <Grid>
        <Typography variant="body1" color="white">
          {profile?.description}
        </Typography>
      </Grid>
    </Grid>
  );
};
