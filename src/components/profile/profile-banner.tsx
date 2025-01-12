import styles from "@/components/profile/profile.module.css";
import { Grid } from "@mui/system";
import {
  Avatar,
  Box,
  IconButton,
  Link,
  Tooltip,
  Typography,
} from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";
import Work from "@mui/icons-material/Work";
import { CompanyInformation, IndividualInformation } from "@/types/interfaces";
import { UserType } from "@/types/enums";
import { useTheme } from "@mui/material/styles";
import { CloseRounded } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";

const formatWebsiteUrl = (website?: string) => {
  if (!website) return "";
  return website.startsWith("https") ? website : `https://${website}`;
};

export const ProfileBanner = ({
  profile,
  uid,
}: {
  profile: CompanyInformation | IndividualInformation;
  uid: string;
}) => {
  const theme = useTheme();
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    if (!uid) {
      setIsOwner(true);
    } else if (currentUser && currentUser.uid === uid) {
      setIsOwner(true);
    } else {
      setIsOwner(false);
    }
  }, [uid]);

  return (
    <Grid container className={styles.profileBanner}>
      <Grid container sx={{ gap: 3, alignItems: "center" }}>
        <Box sx={{ position: "relative" }}>
          <IconButton disabled={!isOwner}>
            <Tooltip title="Change profile picture">
              <Avatar
                sx={{
                  backgroundColor: theme.palette.common.white,
                  color: theme.palette.primary.main,
                  width: 120,
                  height: 120,
                  fontSize: "3rem",
                }}
                src={profile.profileUrl}
              >
                {profile?.userType === UserType.Company
                  ? profile?.companyName[0]
                  : profile?.firstName[0]}
              </Avatar>
            </Tooltip>
          </IconButton>
          {profile?.profileUrl && (
            <IconButton
              sx={{
                display: isOwner ? "flex" : "none",
                position: "absolute",
                top: 5,
                right: 15,
                backgroundColor: "black",
                color: "white",
              }}
              size="small"
              disableRipple
            >
              <Tooltip title="Remove profile picture" placement="right">
                <CloseRounded fontSize="small" />
              </Tooltip>
            </IconButton>
          )}
        </Box>

        <Grid container sx={{ flexDirection: "column", gap: 3 }}>
          <Typography variant="h3" color="white">
            {profile?.userType === UserType.Company
              ? profile?.companyName
              : profile?.firstName + " " + profile?.lastName}
          </Typography>

          {profile?.userType === UserType.Company
            ? profile.website && (
                <Grid container sx={{ gap: 1, color: "white" }}>
                  <Grid container sx={{ alignItems: "center", gap: 1 }}>
                    <Link
                      href={formatWebsiteUrl(profile?.website)}
                      target="_blank"
                      style={{
                        display: "flex",
                        gap: 10,
                        alignItems: "center",
                        color: "white",
                        textDecoration: "none",
                      }}
                    >
                      <LinkIcon fontSize="large" />
                      <Typography variant="body1">
                        {profile?.website}
                      </Typography>
                    </Link>
                  </Grid>
                </Grid>
              )
            : profile?.currentJob && (
                <Grid
                  container
                  sx={{ color: "white", alignItems: "center", gap: 1 }}
                >
                  <Work />
                  <Typography variant="body2">{profile?.currentJob}</Typography>
                </Grid>
              )}
        </Grid>
      </Grid>
    </Grid>
  );
};
