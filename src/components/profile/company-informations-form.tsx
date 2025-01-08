import { Grid } from "@mui/system";
import { TextField } from "@mui/material";
import { useState } from "react";
import { CompanyInformation } from "@/types/interfaces";

export const CompanyInformationsForm = ({
  isEditing,
  profile,
}: {
  isEditing: boolean;
  profile: CompanyInformation;
}) => {
  const [companyInformation, setCompanyInformation] =
    useState<CompanyInformation>(profile);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCompanyInformation({ ...companyInformation, [name]: value });
  };

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
              value={companyInformation?.companyName}
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
              disabled={!isEditing}
              value={companyInformation?.email}
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
              value={companyInformation?.phone}
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
              value={companyInformation?.city}
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
              value={companyInformation?.country}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={12}>
            <TextField
              id="description"
              name="description"
              type="text"
              label="About company"
              multiline
              minRows={6}
              fullWidth
              disabled={!isEditing}
              value={companyInformation?.description}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid size={{ xs: 12, lg: 6 }}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, lg: 6 }}>
            <TextField
              id="founded"
              name="founded"
              type="number"
              label="Founded"
              fullWidth
              disabled={!isEditing}
              value={companyInformation?.founded}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12, lg: 6 }}>
            <TextField
              id="employeesNumber"
              name="employeesNumber"
              type="text"
              label="Number of employees"
              fullWidth
              disabled={!isEditing}
              value={companyInformation?.employeesNumber}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12, lg: 6 }}>
            <TextField
              id="industry"
              name="industry"
              label="Industry"
              fullWidth
              disabled={!isEditing}
              value={companyInformation?.industry}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12, lg: 6 }}>
            <TextField
              id="companySize"
              name="companySize"
              label="Company size"
              fullWidth
              disabled={!isEditing}
              value={companyInformation?.companySize}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12, lg: 6 }}>
            <TextField
              id="workingTimes"
              name="workingTimes"
              label="Working times"
              fullWidth
              disabled={!isEditing}
              value={companyInformation?.workingTimes}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12, lg: 6 }}>
            <TextField
              id="benefits"
              name="benefits"
              label="Benefits"
              fullWidth
              disabled={!isEditing}
              value={companyInformation?.benefits}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12, lg: 6 }}>
            <TextField
              id="remote"
              name="remote"
              label="Remote"
              fullWidth
              disabled={!isEditing}
              value={companyInformation?.remote}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12, lg: 6 }}>
            <TextField
              id="typeOfContract"
              name="typeOfContract"
              label="Type of contract"
              fullWidth
              disabled={!isEditing}
              value={companyInformation?.typeOfContract}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={12}>
            <TextField
              id="missionAndVision"
              name="missionAndVision"
              label="Mission and Vision"
              multiline
              rows={2.5}
              fullWidth
              disabled={!isEditing}
              value={companyInformation?.missionAndVision}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
