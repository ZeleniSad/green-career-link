import { TextField } from "@mui/material";
import { RegisterFormWrapper } from "@/components/register-forms/register-form-wrapper";
import { useFormik } from "formik";
import {
  companyRegisterFirstStepValidationSchema,
  passwordsValidationSchema,
} from "@/config/validations";
import { useState } from "react";
import { CompanyRegisterFormProps } from "@/types/props";
import { FormStep } from "@/types/enums";
import { useRouter } from "next/navigation";

export const CompanyRegisterForm = () => {
  const [formStep, setFormStep] = useState<FormStep>(FormStep.FIRST);
  const router = useRouter();
  const initialValues: CompanyRegisterFormProps = {
    companyName: "",
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
        ? companyRegisterFirstStepValidationSchema
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
      <TextField
        id="companyName"
        name="companyName"
        label="Company Name"
        fullWidth
        value={formik.values.companyName}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.companyName && Boolean(formik.errors.companyName)}
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
  );
};
