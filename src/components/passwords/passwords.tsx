import { TextField } from "@mui/material";
import { Grid } from "@mui/system";
import { PasswordStrength } from "@/components/password-strength/password-strength";
import { FormikProps } from "formik";
import {
  CompanyRegisterFormProps,
  CreateNewPasswordProps,
  PersonalRegisterFormProps,
} from "@/types/props";
import { ChangePasswordProps } from "@/app/change-password/page";

export const Passwords = ({
  formik,
}: {
  formik?:
    | FormikProps<CompanyRegisterFormProps>
    | FormikProps<PersonalRegisterFormProps>
    | FormikProps<ChangePasswordProps>
    | FormikProps<CreateNewPasswordProps>;
}) => {
  return (
    <Grid container spacing={2} width="100%">
      <TextField
        fullWidth
        id="password"
        label="Password"
        type="password"
        value={formik?.values.password}
        onChange={formik?.handleChange}
        onBlur={formik?.handleBlur}
        error={formik?.touched.password && Boolean(formik?.errors.password)}
        helperText={formik?.touched.password && formik?.errors.password}
      />
      <TextField
        fullWidth
        id="confirmPassword"
        label="Confirm Password"
        type="password"
        value={formik?.values.confirmPassword}
        onChange={formik?.handleChange}
        onBlur={formik?.handleBlur}
        error={
          formik?.touched.confirmPassword &&
          Boolean(formik?.errors.confirmPassword)
        }
        helperText={
          formik?.touched.confirmPassword && formik?.errors.confirmPassword
        }
      />
      <PasswordStrength password={formik?.values.password ?? ""} />
    </Grid>
  );
};
