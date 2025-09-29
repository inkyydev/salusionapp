import { Box, Typography } from "@mui/material";

import lineBg from "../../../assets/chart-bg.svg";
import availableBg from "../../../assets/available-bg-lines.svg";

export default function HraSnapshot() {
  const totalYear = 12000;
  const monthUnlocked = 6000;
  const reimbursed = 2000;

  const availableToday = Math.max(monthUnlocked - reimbursed, 0);
  const pctUnlocked = (monthUnlocked / totalYear) * 100;
  const pctReimbursed = (reimbursed / monthUnlocked) * pctUnlocked;

  const reimbursedLabel = "Jan 2026";
  const availableLabel = "Jun 2026";
  const futureLabel = "Dec 2026";

  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        borderRadius: "14px",
        p: { xs: "16px", sm: "24px" },
        mt: "20px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: { xs: "10px", sm: "20px" },
          flexWrap: "wrap",
          mb: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            sx={{ width: 20, height: 8, bgcolor: "#69B6FF", borderRadius: 5 }}
          />
          <Typography
            variant="body2"
            sx={{ color: "#6579A8", fontSize: { xs: "12px", sm: "12px" } }}
          >
            Reimbursed – ${reimbursed.toLocaleString()}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            sx={{ width: 20, height: 8, bgcolor: "#7BE495", borderRadius: 5 }}
          />
          <Typography
            variant="body2"
            sx={{ color: "#6579A8", fontSize: { xs: "12px", sm: "12px" } }}
          >
            Available Today – ${availableToday.toLocaleString()}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            sx={{
              width: 20,
              height: 8,
              backgroundImage: `url(${availableBg})`,
              borderRadius: 5,
            }}
          />
          <Typography
            variant="body2"
            sx={{ color: "#6579A8", fontSize: { xs: "12px", sm: "12px" } }}
          >
            Available in Future
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          position: "relative",
          height: { xs: "45px", sm: "103px" },
          borderRadius: { xs: "10px", sm: "20px" },
          overflow: "hidden",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundImage: `url(${lineBg})`,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            left: 0,
            width: `${pctUnlocked}%`,
            height: "100%",
            backgroundColor: "#83EB91",
            zIndex: 1,
            borderRadius: { xs: "10px", sm: "20px" },
          }}
        />
        <Box
          sx={{
            position: "absolute",
            left: 0,
            width: `${pctReimbursed}%`,
            height: "100%",
            backgroundColor: "#80C2FF",
            zIndex: 2,
            borderRadius: { xs: "10px", sm: "20px" },
          }}
        />
      </Box>

      {/* Labels ispod bara */}
      <Box
        sx={{
          mt: 1,
          position: "relative",
          height: 20,
        }}
      >
        {/* Reimbursed label */}
        <Typography
          sx={{
            position: "absolute",
            left: `0px`,
            fontSize: "10px",
            color: "#6579A8",
          }}
        >
          {reimbursedLabel}
        </Typography>

        <Typography
          sx={{
            position: "absolute",
            left: `${pctUnlocked}%`,
            transform: "translateX(-100%)",
            fontSize: "10px",
            color: "#6579A8",
          }}
        >
          {availableLabel}
        </Typography>

        <Typography
          sx={{
            position: "absolute",
            right: 0,
            fontSize: "10px",
            color: "#6579A8",
          }}
        >
          {futureLabel}
        </Typography>
      </Box>

      <Box
        sx={{
          mt: 2,
          display: "flex",
          justifyContent: "space-between",
          color: "#6579A8",
          borderTop: "1px solid #ACBEE8",
          paddingTop: "16px",
          marginTop: "13px",
          flexWrap: "wrap",
        }}
      >
        <Typography sx={{ fontSize: "12px", color: "#6579A8" }}>
          Allowance for Plan Year 2026 – ${totalYear.toLocaleString()}
        </Typography>
        <Typography sx={{ fontSize: "12px", color: "#6579A8" }}>
          Monthly Allowance – $1,000
        </Typography>
      </Box>
    </Box>
  );
}
