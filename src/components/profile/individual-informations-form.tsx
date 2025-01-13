import { Grid } from "@mui/system";
import { TextField } from "@mui/material";
import { UploadFile } from "@/components/upload-file/upload-file";
import { FormikValues } from "formik";
import { ChangeEvent } from "react";

export const IndividualInformationsForm = ({
  isEditing,
  formikValues,
  handleChange,
  setSelectedFile,
  isOwner,
}: {
  isEditing: boolean;
  formikValues: FormikValues;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  setSelectedFile: (file: File) => void;
  isOwner?: boolean;
}) => {
  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
  };

  const handleFileRemoveFromFormik = () => {
    formikValues.cvUrl = ""; // Update FormikValues object
  };

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, lg: 6 }}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, lg: 6 }}>
            <TextField
              id="firstName"
              name="firstName"
              label="First Name"
              fullWidth
              disabled={!isEditing}
              value={formikValues?.firstName}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12, lg: 6 }}>
            <TextField
              id="lastName"
              name="lastName"
              label="Last Name"
              fullWidth
              disabled={!isEditing}
              value={formikValues?.lastName}
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
              value={formikValues?.email}
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
              value={formikValues?.phone}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={12}>
            <TextField
              id="motivation"
              name="motivation"
              type="text"
              label="Motivation"
              fullWidth
              disabled={!isEditing}
              value={formikValues?.motivation}
              onChange={handleChange}
              multiline
              minRows={3}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid size={{ xs: 12, lg: 6 }}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, lg: 6 }}>
            <TextField
              id="education"
              name="education"
              type="text"
              label="Level of Education"
              fullWidth
              disabled={!isEditing}
              value={formikValues?.education}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12, lg: 6 }}>
            <TextField
              id="yearsOfExperience"
              name="yearsOfExperience"
              label="Years of Experience"
              type="number"
              fullWidth
              disabled={!isEditing}
              value={formikValues?.yearsOfExperience}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12, lg: 6 }}>
            <TextField
              id="currentJob"
              name="currentJob"
              label="Current Job"
              fullWidth
              disabled={!isEditing}
              value={formikValues?.currentJob}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12, lg: 3 }}>
            <TextField
              id="city"
              name="city"
              label="City"
              fullWidth
              disabled={!isEditing}
              value={formikValues?.city}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12, lg: 3 }}>
            <TextField
              id="country"
              name="country"
              label="Country"
              fullWidth
              disabled={!isEditing}
              value={formikValues?.country}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={12}>
            <UploadFile
              disabled={!isEditing}
              onFileSelect={handleFileSelect}
              allowedFileTypes={{
                "application/pdf": [".pdf"],
              }}
              alreadyAddedFileUrl={formikValues?.cvUrl}
              isEditing={isEditing}
              onChange={handleChange}
              handleFileRemoveFromFormik={handleFileRemoveFromFormik}
              isOwner={isOwner}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
