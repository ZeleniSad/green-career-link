"use client";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export const HelloWorld = () => {
  const theme = useTheme();
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      width="100wh"
      sx={{
        backgroundColor: theme.palette.primary.main,
      }}
    >
      <Typography variant="h1" color={theme.palette.success.main}>
        Hello World
      </Typography>
    </Box>
  );
};
