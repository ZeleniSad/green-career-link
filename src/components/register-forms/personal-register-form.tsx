"use client";
import { Grid } from "@mui/system";
import { TextField } from "@mui/material";
import { RegisterFormWrapper } from "@/components/register-forms/register-form-wrapper";
import { useState } from "react";
import { useFormik } from "formik";
import {
  passwordsValidationSchema,
  personalRegisterFirstStepValidationSchema,
} from "@/config/validations";
import { FormStep } from "@/types/enums";
import { PersonalRegisterFormProps } from "@/types/props";
import { useRouter } from "next/navigation";

export const PersonalRegisterForm = () => {
  const [formStep, setFormStep] = useState<FormStep>(FormStep.FIRST);
  const router = useRouter();
  const initialValues: PersonalRegisterFormProps = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    country: "",
    password: "",
    confirmPassword: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema:
      formStep === FormStep.FIRST
        ? personalRegisterFirstStepValidationSchema
        : passwordsValidationSchema,
    onSubmit: () => {
      router.push("/register-success");
    },
  });

  return (
    <RegisterFormWrapper
      formik={formik}
      formStep={formStep}
      setFormStep={setFormStep}
    >
      <Grid container spacing={2} width="100%">
        <Grid size={6}>
          <TextField
            id="firstName"
            name="firstName"
            label="First Name"
            fullWidth
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
          />
        </Grid>
        <Grid size={6}>
          <TextField
            id="lastName"
            name="lastName"
            label="Last Name"
            fullWidth
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} width="100%">
        <Grid size={12}>
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
        </Grid>
        <Grid size={12}>
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
        </Grid>
      </Grid>
      <Grid container spacing={2} width="100%">
        <Grid size={12}>
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
        </Grid>
        <Grid size={12}>
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
        </Grid>
      </Grid>
    </RegisterFormWrapper>
  );
};
