import { Box, Typography, Container } from "@mui/material";

import dangerIcon from "../assets/danger-icon.svg";

export default function ActionRequiredBanner({ description }) {
  return (
    <Box sx={{ marginTop: "33px", bgcolor: "#FFF0F0" }}>
      <Container>
        <Box
          sx={{
            py: "23px",
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "auto 1fr" },
            gap: { xs: 1.5, md: 3 },
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: "10px", lg: "30px" },
              flexDirection: { xs: "column", lg: "row" },
            }}
          >
            <Box
              aria-hidden
              sx={{ fontSize: 22, lineHeight: 1, color: "#FF6161" }}
            >
              <Box component="img" src={dangerIcon} />
            </Box>
            <Typography
              sx={{
                fontWeight: 500,
                color: "#FF6161",
                fontSize: { xs: "16px", lg: "20px" },
                textAlign: { xs: "center", lg: "left" },
              }}
            >
              Please complete the following task ASAP!
            </Typography>
          </Box>

          <Typography
            sx={{
              maxWidth: { xs: "100%", lg: "560px" },
              marginLeft: "auto",
              color: "#465578",
              textAlign: { xs: "center", lg: "left" },
            }}
          >
            {description}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
