import { createTheme } from "@mui/material/styles";

import SvgIcon from "@mui/material/SvgIcon";

function ChevronDown(props) {
  return (
    <SvgIcon
      {...props}
      width="9"
      height="6"
      viewBox="0 0 9 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        y="0.969727"
        width="1.3714"
        height="6.1713"
        transform="rotate(-45 0 0.969727)"
        fill="#465578"
      />
      <rect
        x="7.75684"
        y="0.00012207"
        width="1.3714"
        height="6.1713"
        transform="rotate(45 7.75684 0.00012207)"
        fill="#465578"
      />
    </SvgIcon>
  );
}

const theme = createTheme({
  typography: {
    fontFamily: "Poppins, sans-serif",
    fontSize: 14,
    h1: {
      fontSize: "36px",
      lineHeight: 1.2,
      color: "#465578",
      fontWeight: 600,
    },
    h2: {
      fontSize: "36px",
      lineHeight: 1.2,
      color: "#465578",
      fontWeight: 600,
    },
    h3: {
      fontSize: "24px",
      lineHeight: 1.2,
      color: "#465578",
      fontWeight: 600,
    },
    h4: {
      fontSize: "16px",
      lineHeight: 1.5,
      color: "#465578",
      fontWeight: 500,
    },
    h5: {
      fontSize: "16px",
      color: "#6C63FF",
      fontWeight: 600,
      textTransform: "uppercase",
    },
    body1: {
      fontSize: "14px",
      lineHeight: 1.5,
      color: "#465578",
      fontWeight: 400,
    },
    body2: {
      fontSize: "16px",
      lineHeight: 1.5,
      color: "#465578",
      fontWeight: 400,
      "@media(max-width: 1024px)": {
        fontSize: "14px",
      },
    },
  },
  palette: {
    primary: {
      main: "#6C63FF",
    },
    secondary: {
      main: "#F8F9FF",
    },
  },
  components: {
    MuiSelect: {
      defaultProps: { IconComponent: ChevronDown },
      styleOverrides: { icon: { right: "12px", fontSize: "12px" } },
    },
    MuiNativeSelect: {
      defaultProps: { IconComponent: ChevronDown },
      styleOverrides: { icon: { right: "12px" } },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: "Poppins, sans-serif",
        },
        p: {
          fontFamily: "Poppins, sans-serif",
        },
        button: {
          fontFamily: "Poppins, sans-serif",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          fontSize: "14px",
          textTransform: "none",
          borderRadius: "5px",
          padding: "20px 36px",
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          maxWidth: "1218px !important",
          "@media(max-width: 767px)": {
            padding: "0 20px",
          },
        },
      },
    },
  },
});

export default theme;
