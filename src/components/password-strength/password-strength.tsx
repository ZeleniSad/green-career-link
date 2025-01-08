import { Divider, Typography } from "@mui/material";
import { Grid } from "@mui/system";
import { Check, Close } from "@mui/icons-material";
import { useEffect, useState } from "react";

const label = {
  passwordStrength: {
    containsAtLeast8Characters: "Contains at least 8 characters",
    includesUppercaseAndLowercaseLetters:
      "Includes uppercase and lowercase letters",
    containsANumber: "Contains a number",
    includesASpecialCharacter: "Includes a special character",
    yourNewPasswordMustMeetTheSecurityRequirements:
      "Your new password must meet the security requirements to ensure your accounts safety. We will let you know which requirements your password meets:",
  },
};

export const PasswordStrength = ({ password }: { password: string }) => {
  const [validations, setValidations] = useState({
    length: false,
    uppercaseLowercase: false,
    number: false,
    specialChar: false,
  });

  useEffect(() => {
    setValidations({
      length: password?.length >= 8,
      uppercaseLowercase: /[a-z]/.test(password) && /[A-Z]/.test(password),
      number: /\d/.test(password),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    });
  }, [password]);

  return (
    <>
      <Divider sx={{ width: "100%" }} />
      <Grid
        container
        gap={1}
        size={12}
        justifyContent="flex-start"
        alignItems="center"
      >
        {validations.length ? (
          <Check fontSize="small" color="primary" />
        ) : (
          <Close fontSize="small" />
        )}
        <Typography variant="body2" fontSize={12}>
          {label.passwordStrength.containsAtLeast8Characters}
        </Typography>
      </Grid>
      <Grid
        container
        gap={1}
        size={12}
        justifyContent="flex-start"
        alignItems="center"
      >
        {validations.uppercaseLowercase ? (
          <Check fontSize="small" color="primary" />
        ) : (
          <Close fontSize="small" />
        )}
        <Typography variant="body2" fontSize={12}>
          {label.passwordStrength.includesUppercaseAndLowercaseLetters}
        </Typography>
      </Grid>
      <Grid
        container
        gap={1}
        size={12}
        justifyContent="flex-start"
        alignItems="center"
      >
        {validations.number ? (
          <Check fontSize="small" color="primary" />
        ) : (
          <Close fontSize="small" />
        )}
        <Typography variant="body2" fontSize={12}>
          {label.passwordStrength.containsANumber}
        </Typography>
      </Grid>
      <Grid
        container
        gap={1}
        size={12}
        justifyContent="flex-start"
        alignItems="center"
      >
        {validations.specialChar ? (
          <Check fontSize="small" color="primary" />
        ) : (
          <Close fontSize="small" />
        )}
        <Typography variant="body2" fontSize={12}>
          {label.passwordStrength.includesASpecialCharacter}
        </Typography>
      </Grid>
      <Grid container>
        <Typography variant="body2" fontSize={12}>
          {
            label.passwordStrength
              .yourNewPasswordMustMeetTheSecurityRequirements
          }
        </Typography>
      </Grid>
    </>
  );
};
