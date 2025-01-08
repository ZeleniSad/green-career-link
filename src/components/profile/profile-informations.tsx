import { useState } from "react";
import { Grid } from "@mui/system";
import styles from "@/components/profile/profile.module.css";
import { Button, Paper, Typography } from "@mui/material";
import { CompanyInformationsForm } from "@/components/profile/company-informations-form";
import { IndividualInformationsForm } from "@/components/profile/individual-informations-form";
import { CompanyInformation, IndividualInformation } from "@/types/interfaces";
import { UserType } from "@/types/enums";

export const ProfileInformations = ({
  profile,
}: {
  profile: CompanyInformation | IndividualInformation;
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleCancelClick = () => {
    setIsEditing(false);
  };
  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  return (
    <Grid container>
      <Grid container className={styles.profileDetailsHeader}>
        <Typography variant="h4" color="white">
          Basic
        </Typography>
        {isEditing ? (
          <Grid container sx={{ gap: 1 }}>
            <Button
              color="white"
              variant="outlined"
              onClick={handleCancelClick}
            >
              Cancel
            </Button>
            <Button color="white" onClick={handleSaveClick}>
              Save Changes
            </Button>
          </Grid>
        ) : (
          <Button color="white" onClick={handleEditClick}>
            Edit Profile
          </Button>
        )}
      </Grid>
      <Paper sx={{ width: "100%", p: 3 }}>
        <Grid container sx={{ pb: 3 }}>
          <Typography variant="h4">Basic informations</Typography>
        </Grid>
        {profile?.type === UserType.Company ? (
          <CompanyInformationsForm
            profile={profile as CompanyInformation}
            isEditing={isEditing}
          />
        ) : (
          <IndividualInformationsForm
            profile={profile as IndividualInformation}
            isEditing={isEditing}
          />
        )}
      </Paper>
    </Grid>
  );
};
