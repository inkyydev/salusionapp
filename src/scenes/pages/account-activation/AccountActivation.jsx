import {
  Box,
  Container,
  Typography,
  Button,
  List,
  ListItem,
} from "@mui/material";

import { styled } from "@mui/material/styles";

import logo from "../../../assets/logo.svg";
import bgImage from "../../../assets/account-activation-bg.svg";
import listIcon from "../../../assets/list-icon.svg";

const ListItemStyle = styled(ListItem)({
  display: "flex",
  gap: "11px",
  padding: "6px 0px",
  color: "#6579A8",
  maxWidth: "531px",
});

export default function AccountActivation() {
  return (
    <>
      <Box
        sx={{
          minHeight: "100dvh",
          backgroundImage: `url(${bgImage})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% auto",
          backgroundPosition: "bottom center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          padding: { xs: "120px 0 50px", sm: "150px 0" },
        }}
      >
        <Container sx={{ maxWidth: "765px !important" }}>
          <Box>
            <Box
              component="img"
              src={logo}
              sx={{
                position: "absolute",
                top: { xs: "20px", sm: "39px" },
                left: "50%",
                transform: "translateX(-50%)",
                width: { xs: "133px", sm: "auto" },
              }}
            />
            <Box
              sx={{
                backgroundColor: "#F8F9FF",
                borderRadius: "30px",
                padding: { xs: "25px 20px", sm: "46px 62px" },
              }}
            >
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: "26px", sm: "42px" },
                  marginBottom: "15px",
                }}
              >
                You’re Almost There
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "#6579A8", lineHeight: "1.8" }}
              >
                We’ve sent an email to{" "}
                <Box component="b" color="#465578">
                  example@gmail.com
                </Box>{" "}
                with activation instructions. <br />
                Open the email and click on the activation link to continue.
              </Typography>
              <Box
                sx={{
                  background: "#fff",
                  borderRadius: " 20px",
                  padding: { xs: "20px 20px 12px", sm: "22px 22px 12px" },
                  margin: { xs: "20px 0", sm: "25px -20px" },
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    color: "#6579A8",
                    fontSize: { xs: "16px", sm: "18px" },
                    fontWeight: "600",
                    marginBottom: "8px",
                  }}
                >
                  After Activating your Account you will:
                </Typography>
                <List>
                  <ListItemStyle disableGutters>
                    <Box component="img" src={listIcon} />
                    Enter your company details
                  </ListItemStyle>
                  <ListItemStyle disableGutters>
                    <Box component="img" src={listIcon} />
                    Set up your HRA - choose plan dates, employee classes,
                    covered expenses and monthly benefits
                  </ListItemStyle>
                  <ListItemStyle disableGutters>
                    <Box component="img" src={listIcon} />
                    Add employees to finalize your plan
                  </ListItemStyle>
                </List>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "20px",
                  flexDirection: { xs: "column", sm: "row" },
                }}
              >
                <Typography>
                  Didn’t get the email?
                  <Box
                    component="a"
                    href="#"
                    sx={{
                      color: "#6C63FF",
                      textDecoration: "none",
                      fontWeight: 600,
                    }}
                  >
                    {" "}
                    Resend
                  </Box>
                </Typography>
                <Button
                  sx={{
                    padding: "0",
                    minHeight: "46px",
                    minWidth: "173px",
                    background: "linear-gradient(70deg, #7FC2FF, #6C63FF)",
                    color: "#fff",
                  }}
                >
                  Back to Sign In
                </Button>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
}
