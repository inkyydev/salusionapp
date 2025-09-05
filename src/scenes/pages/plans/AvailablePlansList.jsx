import * as React from "react";
import { Box, Paper, Stack, Typography, Chip, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link as RouterLink } from "react-router-dom";

import shieldIcon from "../../../assets/shield-icon.svg";
import goldIcon from "../../../assets/gold-icon.svg";

const S = {
  Card: styled(Paper)({
    borderRadius: "20px",
    padding: "25px",
    marginBottom: 12,
    boxShadow: "none",
    gap: "10px",
    alignItems: "center",
    backgroundColor: "#F8F9FF",
    "@media(max-width: 767px)": {
      padding: "20px",
    },
  }),
  Title: styled(Typography)({
    fontWeight: 600,
    color: "#465578",
    fontSize: "16px",
  }),
  Line: styled("div")({
    color: "#6579A8",
    fontWeight: "500",
  }),
  Price: styled(Typography)({
    color: "#465578",
    fontWeight: 600,
    fontSize: "32px",
    textAlign: "right",
    whiteSpace: "nowrap",
    "& span": {
      fontSize: "16px",
    },
    "@media(max-width: 1024px)": {
      textAlign: "left",
    },
    "@media(max-width: 767px)": {
      fontSize: "26px",
    },
  }),
  BtnPrimary: styled(Button)({
    padding: "0 35px",
    height: "46px",
    color: "#fff",
    background:
      "linear-gradient(90deg, rgba(134,168,255,1) 0%, rgba(108,99,255,1) 100%)",
    "&:hover": {
      opacity: 0.95,
      background:
        "linear-gradient(90deg, rgba(134,168,255,1) 0%, rgba(108,99,255,1) 100%)",
    },
    "@media(max-width: 767px)": {
      padding: "0 20px",
      width: "100%",
    },
  }),
};

export default function AvailablePlansList({ plans = [], onSelect }) {
  if (!plans.length) {
    return (
      <Typography sx={{ color: "#6579A8" }}>No plans match filters.</Typography>
    );
  }

  return (
    <Box>
      {plans.map((p) => (
        <S.Card key={p.id}>
          {/* Left */}
          <Box>
            <Box
              sx={{
                display: "flex",
                gap: "10px",
                flexDirection: { xs: "column", md: "row" },
              }}
            >
              <Box sx={{ flex: "1" }}>
                <Stack
                  direction="row"
                  sx={{ mb: "10px", gap: "10px", flexWrap: "wrap" }}
                >
                  <Chip
                    size="small"
                    label={p.carrier}
                    sx={{
                      background: "#fff",
                      padding: "0px 15px",
                      height: "34px",
                      fontWeight: "500",
                      fontSize: "12px",
                      color: "#465578",
                    }}
                    icon={
                      <Box
                        component="img"
                        src={shieldIcon}
                        alt=""
                        sx={{ margin: "0 !important" }}
                      />
                    }
                  />
                  <Chip
                    size="small"
                    label={p.metalTier}
                    sx={{
                      background: "#fff",
                      padding: "0px 15px",
                      height: "34px",
                      fontWeight: "500",
                      fontSize: "12px",
                      color: "#FFB200",
                    }}
                    icon={
                      <Box
                        component="img"
                        src={goldIcon}
                        alt=""
                        sx={{ margin: "0 !important" }}
                      />
                    }
                  />
                  <Chip
                    size="small"
                    label={p.type}
                    sx={{
                      background: "#fff",
                      padding: "0px 10px",
                      height: "34px",
                      fontWeight: "500",
                      fontSize: "12px",
                      color: "#6C63FF",
                    }}
                  />
                  {p.hsa && (
                    <Chip
                      size="small"
                      label="HSA"
                      sx={{
                        background: "#fff",
                        padding: "0px 10px",
                        height: "34px",
                        fontWeight: "500",
                        fontSize: "12px",
                        color: "#6C63FF",
                      }}
                    />
                  )}
                </Stack>
                <S.Title>{p.name}</S.Title>
              </Box>
              <Box
                sx={{
                  flexBasis: { sm: "100%", md: "200px" },
                  maxWidth: { sm: "100%", md: "200px" },
                }}
              >
                <S.Price>
                  {p.premium}
                  <Box component="span">/month</Box>
                </S.Price>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "15px",
                alignItems: { sm: "flex-start", md: "flex-end" },
                flexDirection: { xs: "column", md: "row" },
              }}
            >
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "5px" }}
              >
                <S.Line>Deductible: {p.deductible}</S.Line>
                <S.Line>Primary Care Visits: {p.primaryCare}</S.Line>
                <S.Line>Generic Drugs: {p.genericDrugs}</S.Line>
              </Box>

              <Stack
                direction="row"
                gap="10px"
                sx={{ mt: { xs: "20px", sm: "0px" } }}
              >
                <Button
                  component={RouterLink}
                  to={`/plans/${p.id}`}
                  sx={{
                    backgroundColor: "#fff",
                    border: "1px solid #fff",
                    padding: "0 35px",
                    height: "46px",
                    "&:hover": {
                      background: "transparent",
                      border: "1px solid #6C63FF",
                    },
                    "@media(max-width: 767px)": {
                      padding: "0 20px",
                      width: "100%",
                    },
                  }}
                >
                  Plan Details
                </Button>
                <S.BtnPrimary onClick={() => onSelect?.(p)}>
                  Get This Plan
                </S.BtnPrimary>
              </Stack>
            </Box>
          </Box>
        </S.Card>
      ))}
    </Box>
  );
}
