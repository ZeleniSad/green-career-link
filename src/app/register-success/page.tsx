import { SuccessPage } from "@/components/success-page/success-page";

const RegisterSuccessPage = () => {
  return (
    <SuccessPage
      label="You're All Set!"
      title="We've sent a confirmation email to your email address."
      subtitle="Please check your inbox and click the link to verify your email address."
      buttonText="Continue to Login Page"
      buttonUrl={"login"}
    />
  );
};
export default RegisterSuccessPage;
