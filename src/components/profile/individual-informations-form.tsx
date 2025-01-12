import { Grid } from "@mui/system";
import { TextField } from "@mui/material";
import { useState } from "react";
import { UploadFile } from "@/components/upload-file/upload-file";
import { IndividualInformation } from "@/types/interfaces";

export const IndividualInformationsForm = ({
  isEditing,
  profile,
}: {
  isEditing: boolean;
  profile: IndividualInformation;
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = (file: File | null) => {
    setSelectedFile(file);
  };

  const [individualInformation, setIndividualInformation] = useState<IndividualInformation>(profile);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setIndividualInformation({ ...individualInformation, [name]: value });
  };

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, lg: 6 }}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, lg: 6 }}>
            <TextField
              id='firstName'
              name='firstName'
              label='First Name'
              fullWidth
              disabled={!isEditing}
              value={individualInformation?.firstName}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12, lg: 6 }}>
            <TextField
              id='lastName'
              name='lastName'
              label='Last Name'
              fullWidth
              disabled={!isEditing}
              value={individualInformation?.lastName}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12, lg: 6 }}>
            <TextField
              id='email'
              name='email'
              type='email'
              label='Email Address'
              fullWidth
              disabled={!isEditing}
              value={individualInformation?.email}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12, lg: 6 }}>
            <TextField
              id='phone'
              name='phone'
              type='text'
              label='Phone number'
              fullWidth
              disabled={!isEditing}
              value={individualInformation?.phone}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={12}>
            <TextField
              id='moto'
              name='moto'
              type='text'
              label='Moto'
              fullWidth
              disabled={!isEditing}
              value={individualInformation?.moto}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={12}>
            <TextField
              id='description'
              name='description'
              type='text'
              label='About Me'
              multiline
              minRows={8}
              fullWidth
              disabled={!isEditing}
              value={individualInformation?.description}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid size={{ xs: 12, lg: 6 }}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, lg: 6 }}>
            <TextField
              id='title'
              name='title'
              type='text'
              label='Title'
              fullWidth
              disabled={!isEditing}
              value={individualInformation?.title}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12, lg: 6 }}>
            <TextField
              id='educationalLevel'
              name='educationalLevel'
              type='text'
              label='Level of Education'
              fullWidth
              disabled={!isEditing}
              value={individualInformation?.educationalLevel}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12, lg: 6 }}>
            <TextField
              id='yearsOfExperience'
              name='yearsOfExperience'
              label='Years of Experience'
              type='number'
              fullWidth
              disabled={!isEditing}
              value={individualInformation?.yearsOfExperience}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12, lg: 6 }}>
            <TextField
              id='currentJob'
              name='currentJob'
              label='Current Job'
              fullWidth
              disabled={!isEditing}
              value={individualInformation?.currentJob}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12, lg: 6 }}>
            <TextField
              id='languages'
              name='languages'
              label='Languages'
              fullWidth
              disabled={!isEditing}
              value={individualInformation?.languages}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12, lg: 6 }}>
            <TextField
              id='availability'
              name='availability'
              label='Availability'
              fullWidth
              disabled={!isEditing}
              value={individualInformation?.availability}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={12}>
            <TextField
              id='keySkills'
              name='keySkills'
              label='Key Skills'
              multiline
              rows={2.5}
              fullWidth
              disabled={!isEditing}
              value={individualInformation?.keySkills}
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
