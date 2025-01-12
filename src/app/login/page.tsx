"use client";
import { Grid } from "@mui/system";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Link,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { AuthenticationWrapper } from "@/components/authentication-wrapper/authentication-wrapper";
import { useFormik } from "formik";
import { loginValidationSchema } from "@/config/validations";
import styles from "./login.module.css";
import { useRouter } from "next/navigation";
import { login } from "@/services/authService";
import { useState } from "react";

const label = {
  login: "Login",
  email: "Email",
  password: "Password",
  rememberMe: "Remember me",
  forgotPassword: "Forgot password?",
};

const Login = () => {
  const router = useRouter();
  const initialValues = {
    email: "",
    password: "",
  };
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: loginValidationSchema,
    onSubmit: async (values) => {
      try {
        await login(values.email, values.password);
        router.push("/dashboard/feed");
      } catch (error) {
        if (error.message === "Email not verified") {
          setSnackbarMessage("Please verify your email before logging in.");
          setSnackbarOpen(true);
        } else {
          setSnackbarMessage("Failed to login. Please check your credentials.");
          setSnackbarOpen(true);
        }
        console.error(error);
      }
    },
  });

  return (
    <>
      <AuthenticationWrapper>
        <Grid
          container
          flexDirection="column"
          className={styles.wrapper}
          gap={3}
          component="form"
          onSubmit={formik.handleSubmit}
        >
          <Typography variant="h1" fontWeight={700}>
            {label.login}
          </Typography>
          <TextField
            id="email"
            label="Email"
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            sx={{ backgroundColor: "white" }}
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Grid container justifyContent="space-between" alignItems="center">
            <Box display="flex" flexDirection="row" alignItems="center">
              <FormControlLabel
                control={<Checkbox disableRipple />}
                label={
                  <Typography variant="body2">{label.rememberMe}</Typography>
                }
              />
            </Box>
            <Box>
              <Link
                onClick={() => router.push("reset-password")}
                underline="none"
                sx={{ cursor: "pointer" }}
              >
                <Typography variant="body2">{label.forgotPassword}</Typography>
              </Link>
            </Box>
          </Grid>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={formik.isSubmitting}
          >
            {label.login}
          </Button>
        </Grid>
      </AuthenticationWrapper>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Login;
