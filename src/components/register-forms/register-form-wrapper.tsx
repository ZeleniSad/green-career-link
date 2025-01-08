import { ReactNode } from "react";
import { Grid } from "@mui/system";
import { Box, Button, Typography } from "@mui/material";
import { Passwords } from "@/components/passwords/passwords";
import { ChevronLeft } from "@mui/icons-material";
import { FormikProps, FormikTouched } from "formik";
import {
  CompanyRegisterFormProps,
  PersonalRegisterFormProps,
} from "@/types/props";
import { FormStep } from "@/types/enums";

const label = {
  register: "Register",
  back: "Back",
  nextStep: "Next step",
  privacyPolicy:
    "All the data you provide will be protected and used in " +
    "accordance with the privacy policy of the YES DO IT platform. " +
    "You can edit or update your information at any time.",
  helpText: `Do you have trouble registering? <a href="mailto:" style="text-decoration: none; color: #03624C">Contact support.</a>`,
};

export const RegisterFormWrapper = ({
  children,
  formik,
  formStep,
  setFormStep,
}: {
  children: ReactNode;
  formik:
    | FormikProps<CompanyRegisterFormProps>
    | FormikProps<PersonalRegisterFormProps>;
  formStep: FormStep;
  setFormStep: (step: FormStep) => void;
}) => {
  const handleNextStep = async () => {
    const errors = await formik.validateForm();
    if (Object.keys(errors).length === 0) {
      setFormStep(FormStep.SECOND);
    } else {
      formik.setTouched(
        errors as FormikTouched<
          CompanyRegisterFormProps | PersonalRegisterFormProps
        >,
        true,
      );
    }
  };

  return (
    <Grid container component="form" onSubmit={formik.handleSubmit} gap={3}>
      <Typography variant="h4" fontWeight={700} id="register-form">
        {label.register}
      </Typography>
      <Grid
        container
        display={formStep === FormStep.FIRST ? "flex" : "none"}
        gap={2}
      >
        {children}
      </Grid>
      <Box display={formStep === FormStep.SECOND ? "flex" : "none"}>
        <Passwords formik={formik} />
      </Box>
      {formStep === FormStep.FIRST ? (
        <Grid
          container
          sx={{ display: "flex", width: "100%", justifyContent: "center" }}
        >
          <Button variant="contained" onClick={handleNextStep}>
            {label.nextStep}
          </Button>
        </Grid>
      ) : (
        <Grid container gap={2}>
          <Button
            variant="outlined"
            onClick={() => setFormStep(FormStep.FIRST)}
            startIcon={<ChevronLeft />}
          >
            {label.back}
          </Button>
          <Button variant="contained" type="submit">
            {label.register}
          </Button>
        </Grid>
      )}
      <Grid container flexDirection="column" gap={2}>
        <Typography variant="body2" fontSize={12}>
          {label.privacyPolicy}
        </Typography>
        <Typography
          variant="body2"
          fontSize={12}
          dangerouslySetInnerHTML={{ __html: label.helpText }}
        />
      </Grid>
    </Grid>
  );
};
