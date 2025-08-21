import { Box, Typography, Link as MuiLink } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import arrow from "../../../assets/arrow-top-right.svg";

export default function HraSnapshot() {
  const allowances = [
    { label: "Allowance Available Today", value: "$400" },
    { label: "Allowance Available Plan Year", value: "$12,000" },
    { label: "Monthly Allowance", value: "$1,000" },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        mt: "17px",
      }}
    >
      {allowances.map((item, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#fff",
            borderRadius: "14px",
            p: { xs: "14px 15px", sm: "14px 28px" },
          }}
        >
          <Typography variant="body2" sx={{ color: "#6579A8" }}>
            {item.label}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "#6b5bff", fontWeight: 500 }}
          >
            {item.value}
          </Typography>
        </Box>
      ))}

      <MuiLink
        component={RouterLink}
        to="/plan-details"
        underline="none"
        sx={{
          display: "inline-flex",
          alignItems: "center",
          fontWeight: 500,
          color: "#6C63FF",
          fontSize: { xs: "16px", sm: "18px" },
          gap: "10px",
          mt: { xs: "14px", sm: "23px" },
          "&:hover img": {
            transform: "translate(2px, -2px)",
          },
        }}
      >
        View Plan Details
        <Box component="img" src={arrow} sx={{ transition: "all .2s ease" }} />
      </MuiLink>
    </Box>
  );
}
