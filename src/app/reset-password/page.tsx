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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const initialValues = {
    email: "",
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: resetPasswordValidationSchema,
    onSubmit: (values) => {
      alert("Reset Password");
      console.log("resetPasswordValues", values);
    },
  });

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
        <Typography variant="body2" fontSize={14}>
          {label.resetPassword.checkEmail}
        </Typography>
        <Typography variant="body2" fontSize={14}>
          {label.resetPassword.rememberPassword}{" "}
          <Link href="#" underline="none">
            {label.resetPassword.loginHere}
          </Link>
        </Typography>
      </Grid>
    </AuthenticationWrapper>
  );
};

export default ResetPassword;
