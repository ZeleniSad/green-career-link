"use client";
import { Grid } from "@mui/system";
import { Button, TextField, Typography, useMediaQuery } from "@mui/material";
import { AuthenticationWrapper } from "@/components/authentication-wrapper/authentication-wrapper";
import { Passwords } from "@/components/passwords/passwords";
import { useTheme } from "@mui/material/styles";
import { useFormik } from "formik";
import { changePasswordValidationSchema } from "@/config/validations";

const label = {
  changePassword: "Change Password",
  helperText:
    "Please enter your new password below. Make sure it’s strong and secure.",
  saveNewPawword: "Save New Password",
};

export interface ChangePasswordProps {
  oldPassword: string;
  password: string;
  confirmPassword: string;
}

const ChangePassword = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const initialValues: ChangePasswordProps = {
    oldPassword: "",
    password: "",
    confirmPassword: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: changePasswordValidationSchema,
    onSubmit: () => {
      alert("Change Password");
    },
  });

  return (
    <AuthenticationWrapper>
      <Grid
        container
        flexDirection="column"
        gap={3}
        width={isMobile ? "100%" : "40%"}
        component="form"
        onSubmit={formik.handleSubmit}
      >
        <Typography variant="h1" fontWeight={700}>
          {label.changePassword}
        </Typography>
        <Typography variant="body2">{label.helperText}</Typography>
        <TextField
          id="oldPassword"
          name="oldPassword"
          label="Your old password"
          type="password"
          value={formik.values.oldPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.oldPassword && Boolean(formik.errors.oldPassword)
          }
          helperText={formik.touched.oldPassword && formik.errors.oldPassword}
        />
        <Passwords formik={formik} />
        <Button variant="contained" color="primary" type="submit">
          {label.saveNewPawword}
        </Button>
      </Grid>
    </AuthenticationWrapper>
  );
};

export default ChangePassword;
