import { Alert, Snackbar, TextField } from "@mui/material";
import { RegisterFormWrapper } from "@/components/register-forms/register-form-wrapper";
import { useFormik } from "formik";
import {
  companyRegisterFirstStepValidationSchema,
  passwordsValidationSchema,
} from "@/config/validations";
import { useState } from "react";
import { CompanyRegisterFormProps } from "@/types/props";
import { FormStep, UserType } from "@/types/enums";
import { useRouter } from "next/navigation";

export const CompanyRegisterForm = () => {
  const [formStep, setFormStep] = useState<FormStep>(FormStep.FIRST);
  const router = useRouter();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const initialValues: CompanyRegisterFormProps = {
    companyName: "",
    email: "",
    phone: "",
    city: "",
    country: "",
    password: "",
    confirmPassword: "",
    userType: UserType.Company,
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema:
      formStep === FormStep.FIRST
        ? companyRegisterFirstStepValidationSchema
        : passwordsValidationSchema,
    onSubmit: async (values) => {
      try {
        const response = await fetch("http://localhost:3000/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        if (response.ok) {
          router.push("/register-success");
        } else {
          const errorData = await response.json();
          if (errorData.errors.email) {
            setSnackbarMessage(`${errorData.errors.email}`);
            setSnackbarOpen(true);
          } else {
            setSnackbarMessage(`Something went wrong.`);
            setSnackbarOpen(true);
          }
        }
      } catch (error) {
        setSnackbarMessage(`Something went wrong.`);
        setSnackbarOpen(true);
        console.error(error);
      }
    },
  });

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <RegisterFormWrapper
        formik={formik}
        formStep={formStep}
        setFormStep={setFormStep}
      >
        <TextField
          id="companyName"
          name="companyName"
          label="Company Name"
          fullWidth
          value={formik.values.companyName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.companyName && Boolean(formik.errors.companyName)
          }
          helperText={formik.touched.companyName && formik.errors.companyName}
        />
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          fullWidth
          id="phone"
          name="phone"
          label="Phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.phone && Boolean(formik.errors.phone)}
          helperText={formik.touched.phone && formik.errors.phone}
        />
        <TextField
          fullWidth
          id="city"
          name="city"
          label="City"
          value={formik.values.city}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.city && Boolean(formik.errors.city)}
          helperText={formik.touched.city && formik.errors.city}
        />
        <TextField
          fullWidth
          id="country"
          name="country"
          label="Country"
          value={formik.values.country}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.country && Boolean(formik.errors.country)}
          helperText={formik.touched.country && formik.errors.country}
        />
      </RegisterFormWrapper>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
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
