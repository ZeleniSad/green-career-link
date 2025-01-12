import { Grid } from "@mui/system";
import { TextField } from "@mui/material";
import { UploadFile } from "@/components/upload-file/upload-file";
import { FormikValues } from "formik";
import { useState } from "react";

export const IndividualInformationsForm = ({
  isEditing,
  profile,
  handleChange,
}: {
  isEditing: boolean;
  profile: FormikValues;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
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
              value={profile?.firstName}
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
              value={profile?.lastName}
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
          <Grid size={12}>
            <TextField
              id="moto"
              name="moto"
              type="text"
              label="Moto"
              fullWidth
              disabled={!isEditing}
              value={profile?.motivation}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid size={{ xs: 12, lg: 6 }}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, lg: 6 }}>
            <TextField
              id="educationalLevel"
              name="educationalLevel"
              type="text"
              label="Level of Education"
              fullWidth
              disabled={!isEditing}
              value={profile?.education}
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
              value={profile?.yearsOfExperience}
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
              value={profile?.currentJob}
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
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
