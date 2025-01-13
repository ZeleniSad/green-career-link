import { useEffect, useState } from "react";
import {
  removeFileAndUpdateRecord,
  updateProfilePicture,
  uploadFile,
} from "@/services/fileServices";
import { getAuth } from "firebase/auth";
import {
  Avatar,
  Box,
  IconButton,
  Link,
  Tooltip,
  Typography,
} from "@mui/material";
import { CloseRounded, Link as LinkIcon, Work } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { CompanyInformation, IndividualInformation } from "@/types/interfaces";
import { UserType } from "@/types/enums";
import styles from "@/components/profile/profile.module.css";
import { Grid } from "@mui/system";

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
  const [loading, setLoading] = useState(false);
  const [profileUrl, setProfileUrl] = useState(profile.profileUrl);

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

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.files && event.target?.files[0]) {
      setLoading(true);
      try {
        const file = event.target?.files[0];
        const userId = getAuth().currentUser?.uid;
        if (userId) {
          const url = await uploadFile(file, userId);
          await updateProfilePicture(userId, url);
          setProfileUrl(url); // Update the state with the new URL
        }
      } catch (error) {
        console.error("Error uploading file: ", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleRemovePicture = async () => {
    setLoading(true);
    try {
      const userId = getAuth().currentUser?.uid;
      if (userId && profileUrl) {
        await removeFileAndUpdateRecord(profileUrl, userId);
        await updateProfilePicture(userId, "");
        setProfileUrl(""); // Update the state to remove the URL
      }
    } catch (error) {
      console.error("Error removing file: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid container className={styles.profileBanner}>
      <Grid container sx={{ gap: 3, alignItems: "center" }}>
        <Box sx={{ position: "relative" }}>
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            id="upload-profile-picture"
            onChange={handleFileChange}
            disabled={!isOwner || loading}
          />
          <label htmlFor="upload-profile-picture">
            <IconButton component="span" disabled={!isOwner || loading}>
              <Tooltip title="Change profile picture">
                <Avatar
                  sx={{
                    backgroundColor: theme.palette.common.white,
                    color: theme.palette.primary.main,
                    width: 120,
                    height: 120,
                    fontSize: "3rem",
                  }}
                  src={profileUrl}
                >
                  {profile?.userType === UserType.Company
                    ? profile?.companyName[0]
                    : profile?.firstName[0]}
                </Avatar>
              </Tooltip>
            </IconButton>
          </label>
          {profileUrl && (
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
              onClick={handleRemovePicture}
              disabled={loading}
            >
              <Tooltip title="Remove profile picture" placement="right">
                <CloseRounded fontSize="small" />
              </Tooltip>
            </IconButton>
          )}
        </Box>

        <Grid container sx={{ flexDirection: "column", gap: 1 }}>
          <Typography variant="h3" color="white">
            {profile?.userType === UserType.Company
              ? profile?.companyName
              : profile?.firstName + " " + profile?.lastName}
          </Typography>
          {profile?.city && profile.country && (
            <Typography variant="body2" color="white">
              {profile?.city}, {profile?.country}
            </Typography>
          )}

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
                      <LinkIcon fontSize="small" />
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
                  <Work fontSize="small" />
                  <Typography variant="body2">{profile?.currentJob}</Typography>
                </Grid>
              )}
        </Grid>
      </Grid>
    </Grid>
  );
};
