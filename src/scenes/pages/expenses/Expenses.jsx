import { Box } from "@mui/material";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { Link as MuiLink } from "@mui/material";

import HraSnapshot from "./HraSnapshot";
import ExpenseStatus from "./ExpenseStatus";
import ActionRequiredBanner from "../../../components/ActionRequiredBanner";

import arrowImg from "../../../assets/arrow-top-right.svg";

import fileIcon from "../../../assets/file-icon.svg";

export default function Expenses() {
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      navigate("/add-expense", { state: { file } });
    }
  };
  return (
    <>
      <ActionRequiredBanner description="This is the generic description of the task employees will receive and need to complete, this notification can be removed by just clicking on the little X icon on top of it but will come back every 10 minutes until they complete the task." />
      <Box
        sx={{
          paddingTop: { xs: "33px", sm: "60px", md: "60px" },
        }}
      >
        <Container>
          <Grid container spacing="31px" alignItems="center">
            <Grid item size={{ xs: 12, sm: 5 }}>
              <Box aria-label="expense-wrapper">
                <Typography variant="h1">Add Expense</Typography>
                <Box>
                  <label>
                    <Box
                      component="input"
                      id="fileInput"
                      type="file"
                      accept="image/*,application/pdf"
                      onChange={handleFileChange}
                      sx={{
                        visibility: "hidden",
                        position: "absolute",
                        zIndex: "-1",
                      }}
                    />
                    <Typography
                      variant="span"
                      sx={{
                        backgroundColor: "rgba(108, 99, 255, .1)",
                        display: "flex",
                        maxWidth: "357px",
                        minHeight: { xs: "136px", sm: "206px" },
                        flexDirection: { xs: "row", sm: "column" },
                        alignItems: "center",
                        justifyContent: "center",
                        border: "1px dashed #6C63FF ",
                        cursor: "pointer",
                        borderRadius: "14px",
                        marginTop: "21px",
                        gap: "12px",
                        transition: "all .2s ease",
                        "&:hover": {
                          opacity: 0.8,
                        },
                      }}
                    >
                      <Box component="img" src={fileIcon} />
                      <Typography
                        variant="h3"
                        sx={{
                          color: "#6C63FF",
                          fontSize: "16px",
                        }}
                      >
                        Add your receipt
                      </Typography>
                    </Typography>
                  </label>
                </Box>
              </Box>
            </Grid>
            <Grid item size={{ xs: 12, sm: 7 }}>
              <Box
                sx={{
                  backgroundColor: "#F8F9FF",
                  maxWidth: "625px",
                  marginLeft: "auto",
                  padding: { xs: "21px 20px", sm: "25px 20px 31px" },
                  borderRadius: "20px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexDirection: { xs: "column", sm: "column", md: "row" },
                    alignItems: { xs: "flex-start", sm: "center" },
                    gap: { xs: "10px", sm: "0" },
                  }}
                >
                  <Typography
                    variant="h2"
                    sx={{ fontSize: { xs: "32px", sm: "36px" } }}
                  >
                    HRA Snapshot
                  </Typography>
                  <MuiLink
                    component={RouterLink}
                    to="/plan-details"
                    sx={{
                      textDecoration: "none",
                      fontSize: { xs: "14px", sm: "18px" },
                      display: "flex",
                      gap: "10px",
                      fontWeight: "500",
                    }}
                  >
                    View Plan Details
                    <img src={arrowImg} />
                  </MuiLink>
                </Box>
                <HraSnapshot />
              </Box>
            </Grid>
          </Grid>

          <Box
            sx={{
              pt: "39px",
              pb: { xs: "40px", sm: "60px" },
            }}
          >
            <Typography
              variant="h2"
              sx={{
                marginBottom: "30px",
              }}
            >
              Expense Status
            </Typography>
            <ExpenseStatus />
          </Box>
        </Container>
      </Box>
    </>
  );
}
