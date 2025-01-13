import React, { FC, useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { doc, UpdateData, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { CompanyUserDto, IndividualUserDto, UserDto } from "@/types/dto";
import { UserType } from "@/types/enums";

interface EditUserModalProps {
  open: boolean;
  onClose: () => void;
  user: UserDto;
  onSave: () => void;
}

export const EditUserModal: FC<EditUserModalProps> = ({
  open,
  onClose,
  user,
  onSave,
}) => {
  const [formData, setFormData] = useState<UserDto>(user);

  useEffect(() => {
    setFormData(user);
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value } as UserDto);
  };

  const handleSave = async () => {
    if (formData) {
      const userDoc = doc(db, "users", formData.id);
      await updateDoc(userDoc, formData as UpdateData<UserDto>);
      onSave();
      onClose();
    }
  };

  if (!formData) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDialog-paper": {
          width: "600px",
          borderRadius: 6,
        },
      }}
    >
      <DialogTitle>Edit User</DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        {formData.userType === UserType.Individual && (
          <>
            <TextField
              margin="dense"
              label="First Name"
              name="firstName"
              value={(formData as IndividualUserDto).firstName}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              label="Last Name"
              name="lastName"
              value={(formData as IndividualUserDto).lastName}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              label="Ambitions"
              name="ambitions"
              value={(formData as IndividualUserDto).ambitions}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              label="Current Job"
              name="currentJob"
              value={(formData as IndividualUserDto).currentJob}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              label="CV URL"
              name="cvUrl"
              value={(formData as IndividualUserDto).cvUrl}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              label="Motivation"
              name="motivation"
              value={(formData as IndividualUserDto).motivation}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              label="Years of Experience"
              name="yearsOfExperience"
              type="number"
              value={(formData as IndividualUserDto).yearsOfExperience}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              label="Education"
              name="education"
              value={(formData as IndividualUserDto).education}
              onChange={handleChange}
            />
          </>
        )}
        {formData.userType === UserType.Company && (
          <>
            <TextField
              margin="dense"
              label="Company Name"
              name="companyName"
              value={(formData as CompanyUserDto).companyName}
              onChange={handleChange}
            />

            <TextField
              margin="dense"
              label="Goals"
              name="goals"
              value={(formData as CompanyUserDto).goals}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              label="Number of Employees"
              name="numOfEmployees"
              type="number"
              value={(formData as CompanyUserDto).numOfEmployees}
              onChange={handleChange}
            />
            <FormControlLabel
              id="offeringJob"
              name="offeringJob"
              label="Offering Job?"
              control={
                <Checkbox
                  checked={(formData as CompanyUserDto).offeringJob}
                  onChange={handleChange}
                />
              }
            />
            <TextField
              margin="dense"
              label="Website"
              name="website"
              value={(formData as CompanyUserDto).website}
              onChange={handleChange}
            />
          </>
        )}

        <TextField
          margin="dense"
          label="City"
          name="city"
          value={formData.city}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Country"
          name="country"
          value={(formData as CompanyUserDto).country}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="About"
          name="about"
          value={formData.about}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Profile Image"
          name="profileUrl"
          value={formData.profileUrl}
          onChange={handleChange}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
