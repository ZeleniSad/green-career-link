"use client";
import { Grid } from "@mui/system";
import { Button, Typography, useMediaQuery } from "@mui/material";
import { AuthenticationWrapper } from "@/components/authentication-wrapper/authentication-wrapper";
import { Passwords } from "@/components/passwords/passwords";
import { useTheme } from "@mui/material/styles";
import { useFormik } from "formik";
import { passwordsValidationSchema } from "@/config/validations";

const label = {
  createNewPassword: "Create a New Password",
  helpText:
    "Please enter your new password below. Make sure it’s strong and secure.",
  saveNewPassword: "Save New Password",
};

const CreateNewPassword = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const initialValues = {
    password: "",
    confirmPassword: "",
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: passwordsValidationSchema,
    onSubmit: () => {
      alert("Create New Password");
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
          {label.createNewPassword}
        </Typography>
        <Typography variant="body1">{label.helpText}</Typography>
        <Passwords formik={formik} />
        <Button variant="contained" color="primary" type="submit">
          {label.saveNewPassword}
        </Button>
      </Grid>
    </AuthenticationWrapper>
  );
};

export default CreateNewPassword;
