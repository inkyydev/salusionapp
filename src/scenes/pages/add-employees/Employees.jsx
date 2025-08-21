import { useState } from "react";
import { Container, Box, Typography, Button } from "@mui/material";

import EmployeesTable from "./EmployeesTable";

import employeeIcon from "../../../assets/person-icon.svg";
import fileIcon from "../../../assets/file-icon.svg";
import docsIcon from "../../../assets/docs-icon.svg";

export default function Employees() {
  const [file, setFile] = useState("");

  const handleFile = (e) => {
    const fileName = e.target.files[0].name;

    if (fileName) {
      setFile(fileName);
    }
  };

  return (
    <>
      <Box
        sx={{
          pt: { xs: "40px", sm: "56px" },
        }}
      >
        <Container>
          <Typography
            variant="h1"
            sx={{
              textAlign: "center",
              marginBottom: { xs: "19px", sm: "26px" },
            }}
          >
            Happy Trails Dirt Bike Co
          </Typography>
          <Box>
            <Box
              aria-label="add-employe-wrapper"
              sx={{
                maxWidth: "440px",
                margin: "0 auto",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <Button
                disableRipple
                sx={{
                  flexBasis: "50%",
                  maxWidth: "50%",
                  padding: "0",
                  minHeight: "126px",
                  flexDirection: "column",
                  gap: "8px",
                  border: "1px solid #6C63FF",
                  borderRadius: "14px",
                  background: "#F8F9FF",
                  "&:hover": {
                    background: "#fff",
                  },
                }}
              >
                <Box component="img" src={employeeIcon} />
                <Typography
                  variant="body1"
                  sx={{
                    color: "#6C63FF",
                    fontWeight: "500",
                    fontSize: { xs: "10px", sm: "12px" },
                  }}
                >
                  Add Employee
                </Typography>
              </Button>
              <Box
                sx={{
                  flexBasis: "50%",
                  maxWidth: "50%",
                  minHeight: "126px",
                }}
              >
                <label>
                  <Box
                    component="input"
                    type="file"
                    sx={{
                      visibility: "hidden",
                      position: "absolute",
                      zIndex: "-1",
                      display: "none",
                    }}
                    onChange={handleFile}
                  />
                  <Typography
                    variant="span"
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      minHeight: "126px",
                      gap: "6px",
                      fontSize: { xs: "10px", sm: "12px" },
                      fontWeight: "500",
                      color: "#6C63FF",
                      cursor: "pointer",
                      background: "#F8F9FF",
                      borderRadius: "14px",
                      border: "1px dashed #6C63FF",
                    }}
                  >
                    <Box
                      component="img"
                      src={fileIcon}
                      alt="file"
                      width="28px"
                    />
                    {file ? file : "Add Employees via template"}
                  </Typography>
                </label>
              </Box>
            </Box>
            <Box
              aria-label="download-box-wrapper"
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "26px",
              }}
            >
              <Button
                component="a"
                href={docsIcon}
                download
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "0",
                  background: "none",
                }}
              >
                <img src={docsIcon} alt="docs" />
                <Typography variant="body1" color="#6C63FF" fontWeight="500">
                  Download Employees Template
                </Typography>
              </Button>
            </Box>
          </Box>
        </Container>

        <Box aria-label="employess table" sx={{ mt: "25px", pb: "40px" }}>
          <EmployeesTable />
        </Box>
      </Box>
    </>
  );
}
