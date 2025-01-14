import { Backdrop, CircularProgress } from "@mui/material";

export const Loading = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <Backdrop
      sx={(theme) => ({
        color: "rgba(0, 0, 0, 0.25)",
        zIndex: theme.zIndex.drawer + 1,
      })}
      open={isOpen}
    >
      <CircularProgress color="primary" />
    </Backdrop>
  );
};
