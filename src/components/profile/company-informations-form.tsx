import { Grid } from "@mui/system";
import { Checkbox, FormControlLabel, TextField } from "@mui/material";
import { FormikValues } from "formik";

export const CompanyInformationsForm = ({
  isEditing,
  profile,
  handleChange,
}: {
  isEditing: boolean;
  profile: FormikValues;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, lg: 6 }}>
        <Grid container spacing={3}>
          <Grid size={12}>
            <TextField
              id="companyName"
              name="companyName"
              label="Company Name"
              fullWidth
              disabled={!isEditing}
              value={profile?.companyName}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12, lg: 6 }}>
            <TextField
              id="email"
              name="email"
              type="email"
              label="Email Address"
              fullWidth
              disabled
              value={profile?.email}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12, lg: 6 }}>
            <TextField
              id="phone"
              name="phone"
              type="text"
              label="Phone number"
              fullWidth
              disabled={!isEditing}
              value={profile?.phone}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12, lg: 6 }}>
            <TextField
              id="city"
              name="city"
              type="text"
              label="City"
              fullWidth
              disabled={!isEditing}
              value={profile?.city}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12, lg: 6 }}>
            <TextField
              id="country"
              name="country"
              type="text"
              label="Country"
              fullWidth
              disabled={!isEditing}
              value={profile?.country}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid size={{ xs: 12, lg: 6 }}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, lg: 6 }}>
            <TextField
              id="numOfEmployees"
              name="numOfEmployees"
              type="number"
              label="Number of employees"
              fullWidth
              disabled={!isEditing}
              value={profile?.numOfEmployees}
              onChange={handleChange}
            />
          </Grid>
          <Grid
            size={{ xs: 12, lg: 6 }}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <FormControlLabel
              id="offeringJob"
              name="offeringJob"
              label="Offering Job?"
              disabled={!isEditing}
              control={
                <Checkbox
                  checked={profile?.offeringJob}
                  onChange={handleChange}
                />
              }
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              id="website"
              name="website"
              type="text"
              label="Company website"
              fullWidth
              disabled={!isEditing}
              value={profile?.website}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              id="goals"
              name="goals"
              type="text"
              label="Company goals"
              fullWidth
              disabled={!isEditing}
              value={profile?.goals}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid size={12}>
        <TextField
          id="about"
          name="about"
          type="text"
          label="About company"
          multiline
          minRows={6}
          fullWidth
          disabled={!isEditing}
          value={profile?.about}
          onChange={handleChange}
        />
      </Grid>
    </Grid>
  );
};
