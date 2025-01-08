"use client";
import { createTheme } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/system";

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    white: true;
  }
}

export const YesDoItThemeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const yesDoItTheme = createTheme({
    palette: {
      primary: {
        main: "#03624C",
      },
      secondary: {
        main: "#2CC295",
        light: "#2CC295",
        dark: "#032221",
      },
      common: {
        black: "#060F0E",
        white: "#F1F7F6",
      },
      success: {
        main: "#00DF81",
        light: "#F1F7F6",
      },
    },
    typography: {
      fontFamily: `"Urbanist", sans-serif`,
      body1: {
        fontSize: 16,
      },
      body2: {
        fontSize: 14,
      },
      h1: {
        fontSize: 48,
        [useTheme().breakpoints.down("md")]: {
          fontSize: 24,
        },
      },
      h2: {
        fontSize: 40,
      },
      h3: {
        fontSize: 32,
      },
      h4: {
        fontSize: 24,
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            borderRadius: 24,
            fontSize: 16,
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 10,
            paddingBottom: 10,
            variants: [
              {
                props: { color: "white" },
                style: {
                  backgroundColor: "#F1F7F6",
                  color: "#03624C",
                },
              },
              {
                props: { color: "white", variant: "outlined" },
                style: {
                  backgroundColor: "transparent",
                  color: "#F1F7F6",
                },
              },
            ],
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            borderRadius: 24,
            backgroundColor: useTheme().palette.common.white,
            "& .MuiOutlinedInput-root": {
              borderRadius: 24,
            },
          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          root: {
            borderRadius: 24,
            backgroundColor: useTheme().palette.common.white,
            "& .MuiSelect-root": {
              borderRadius: 24,
            },
          },
        },
      },
    },
  });

  return <ThemeProvider theme={yesDoItTheme}>{children}</ThemeProvider>;
};
