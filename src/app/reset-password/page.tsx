"use client";
import { Grid } from "@mui/system";
import {
  Button,
  Link,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { AuthenticationWrapper } from "@/components/authentication-wrapper/authentication-wrapper";
import { useTheme } from "@mui/material/styles";
import { useFormik } from "formik";
import { resetPasswordValidationSchema } from "@/config/validations";
import { sendPasswordResetEmail } from "@firebase/auth";
import { getAuth } from "firebase/auth";
import { useState } from "react";
import { Loading } from "@/components/loading/loading";

const label = {
  resetPassword: {
    title: "Reset Password",
    subtitle:
      "Enter your email address below, and we’ll send you instructions.",
    email: "Email",
    sendResetLink: "Send Reset Link",
    checkEmail: "If you don’t see the email, check your spam or junk folder.",
    rememberPassword: "Remember your password?",
    loginHere: "Log in here",
  },
};
const ResetPassword = () => {
  const auth = getAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const initialValues = {
    email: "",
  };

  const handleResetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.error("Error sending reset email:", error);
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: resetPasswordValidationSchema,
    onSubmit: async () => {
      setLoading(true);
      await handleResetPassword(formik.values.email)
        .then(() => {
          setEmailSent(true);
        })
        .finally(() => {
          setLoading(false);
        });
    },
  });

  if (loading) {
    return <Loading isOpen={loading} />;
  }

  return (
    <AuthenticationWrapper>
      <Grid
        container
        flexDirection="column"
        gap={3}
        width={isMobile ? "100%" : "30%"}
        component="form"
        onSubmit={formik.handleSubmit}
      >
        <Typography variant="h1" fontWeight={700}>
          {label.resetPassword.title}
        </Typography>
        {emailSent ? (
          <Typography variant="h5" fontSize={14}>
            Reset password link has been successfully sent to your email.
          </Typography>
        ) : (
          <>
            <Typography variant="body2" fontSize={14}>
              {label.resetPassword.subtitle}
            </Typography>
            <TextField
              id="email"
              label="Email"
              name="email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              sx={{ backgroundColor: "white" }}
            />
            <Button variant="contained" color="primary" type="submit">
              {label.resetPassword.sendResetLink}
            </Button>
          </>
        )}

        <Typography variant="body2" fontSize={14}>
          {label.resetPassword.checkEmail}
        </Typography>
        <Typography variant="body2" fontSize={14}>
          {label.resetPassword.rememberPassword}{" "}
          <Link href="/login" underline="none">
            {label.resetPassword.loginHere}
          </Link>
        </Typography>
      </Grid>
    </AuthenticationWrapper>
  );
};

export default ResetPassword;
