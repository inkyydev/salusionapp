import { useState } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { styled, Box } from "@mui/system";
import { Link } from "react-router-dom";
import { Button, Typography } from "@mui/material";

import logo from "../../assets/logo.svg";
import chev from "../../assets/chev-top.svg";
import hamburger from "../../assets/hamburger-icon.svg";
import closeIcon from "../../assets/close-icon.svg";

import MyHraItems from "./MyHraItems";

const StyledButton = styled(Button)(({ theme }) => ({
  padding: "10px 24px",
  fontWeight: 400,
  color: "#6579A8",
  flex: 1,
  "&.active": {
    backgroundColor: theme.palette.secondary.main,
    color: "#6C63FF",
    fontWeight: 500,
  },
  "&:hover:not(.active)": {
    backgroundColor: "transparent",
    color: "#6C63FF",
  },
}));

const StyledMenuDropdown = styled(Box)(({ theme }) => ({
  overflow: "hidden",
  transition: "all .6s ease-in-out",
  maxHeight: "0px",
  "&.active": {
    maxHeight: "500px",
  },
  "@media(max-width: 767px)": {
    maxHeight: "1000px",
  },
}));

const StyledMenuWrapperBox = styled(Box)(({ theme }) => ({
  maxWidth: "361px",
  border: "1px solid rgba(101, 121, 168, .1)",
  borderRadius: "20px",
  marginLeft: "auto",
  cursor: "pointer",
  position: "absolute",
  top: "-26px",
  right: 0,
  zIndex: 99,
  overflowY: "auto",
  background: "#fff",
  "&.active": {
    boxShadow: "0px 30px 60px rgba(49, 50, 137, 0.1)",
  },
  "@media(max-width: 767px)": {
    position: "fixed",
    top: "100px",
    height: "calc(100dvh - 100px)",
    left: "0",
    border: "none",
    background: "#fff",
    marginLeft: "0",
    width: "100%",
    maxWidth: "100%",
    borderRadius: "0",
    opacity: 0,
    transition: "all .2s ease",
    transform: "scale(0.95)",
    pointerEvents: "none",
    "&.active": {
      opacity: 1,
      transform: "scale(1)",
      pointerEvents: "all",
    },
  },
}));

export default function Navigation() {
  const [isActive, setIsActive] = useState(false);
  const [curActive, setCurActive] = useState("my-hra");

  const fullName = "John Doe";

  const getInitials = (name) => {
    const parts = name.trim().split(" ");
    const first = parts[0]?.charAt(0).toUpperCase() || "";
    const last = parts[1]?.charAt(0).toUpperCase() || "";
    return first + last;
  };

  const handleActive = () => {
    setIsActive((prev) => !prev);
  };

  return (
    <Box paddingTop="25px">
      <Container>
        <Grid container spacing={2} alignItems="center">
          <Grid item size={6}>
            <Box>
              <Link to="/">
                <Box
                  component="img"
                  src={logo}
                  alt="Logo"
                  sx={{
                    width: { xs: "133px", md: "191px" },
                  }}
                />
              </Link>
            </Box>
          </Grid>
          <Grid item size={6} position="relative">
            <StyledMenuWrapperBox
              aria-label="menu-wrapper"
              className={isActive ? "active" : ""}
            >
              <Box
                aria-label="menu-info-wrap"
                onClick={handleActive}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                  padding: "19px 20px",
                }}
              >
                <Box
                  aria-label="menu-info-wrap__left"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "20px",
                  }}
                >
                  <Box
                    aria-label="menu-info-wrap__left--char"
                    sx={(theme) => ({
                      backgroundColor: theme.palette.secondary.main,
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "#6C63FF",
                      fontWeight: 600,
                      fontSize: "16px",
                    })}
                  >
                    {getInitials(fullName)}
                  </Box>
                  <Box aria-label="menu-info-wrap__left--name">
                    <Typography variant="h4">John Doe</Typography>
                  </Box>
                </Box>
                <Box aria-label="menu-info-wrap__right">
                  <Box
                    component="img"
                    src={chev}
                    alt="chev"
                    sx={{ display: { xs: "none", sm: "block" } }}
                  ></Box>
                </Box>
              </Box>
              <StyledMenuDropdown
                aria-label="menu-dropdown"
                className={isActive ? "active" : ""}
              >
                <Box
                  aria-label="menu-dropdown__switcher"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    padding: "16px 20px",
                    borderTop: "1px solid #F0F2F7",
                    borderBottom: "1px solid #F0F2F7",
                  }}
                >
                  <StyledButton
                    onClick={(e) => setCurActive("my-hra")}
                    className={`${curActive === "my-hra" ? "active" : ""}`}
                  >
                    My HRA
                  </StyledButton>
                  <StyledButton
                    className={`${curActive === "employer" ? "active" : ""}`}
                    onClick={(e) => setCurActive("employer")}
                  >
                    Employer
                  </StyledButton>
                  <StyledButton
                    className={`${curActive === "referrals" ? "active" : ""}`}
                    onClick={(e) => setCurActive("referrals")}
                  >
                    Referrals
                  </StyledButton>
                </Box>
                <Box
                  sx={{
                    padding: "20px",
                  }}
                >
                  {curActive === "my-hra" && (
                    <MyHraItems handleClick={handleActive} />
                  )}
                </Box>
              </StyledMenuDropdown>
              <Box aria-label="mobile-hamburger"></Box>
            </StyledMenuWrapperBox>
            <Box>
              <Button
                onClick={handleActive}
                disableRipple
                sx={{
                  display: { xs: "flex", md: "none" },
                  "&:hover": {
                    backgroundColor: "transparent",
                  },
                  padding: "0",
                  marginLeft: "auto",
                  justifyContent: "flex-end",
                }}
              >
                <img src={isActive ? closeIcon : hamburger} alt="hamburger" />
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
