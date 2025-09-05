import * as React from "react";
import {
  Box,
  Container,
  Paper,
  Stack,
  Typography,
  Chip,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useParams, useLocation } from "react-router-dom";

import shieldIcon from "../../../assets/shield-icon.svg";
import goldIcon from "../../../assets/gold-icon.svg";

const PLANS = [
  {
    id: "P001",
    carrier: "Anthem Health Plans Inc (Anthem BCBS)",
    name: "Gold HMO Pathway Enhanced with Adult Dental and Vision Benefits",
    metalTier: "Gold",
    type: "HMO",
    hsa: false,
    premium: 483.01,
    deductible: 2000,
    primaryCare: "15% copay",
    genericDrugs: "5% copay",
    benefits: [
      {
        columns: [
          "Annual Deductible & Out-of-Pocket",
          "In Network",
          "Out of Network",
        ],
        rows: [
          { label: "Annual Deductible", in: "2,000", out: "4,000" },
          { label: "Separate Drug Deductible", in: "—", out: "—" },
          { label: "Out-of-Pocket Maximum", in: "8,000", out: "18,000" },
        ],
      },
      {
        columns: ["Doctor Visits", "In Network", "Out of Network"],
        rows: [
          {
            label: "Primary Care Visit",
            in: "10% coinsurance after deductible",
            out: "Not Covered",
          },
          {
            label: "Specialist Visit",
            in: "10% coinsurance after deductible",
            out: "Not Covered",
          },
          {
            label: "Preventive Care/Screening/Immunization",
            in: "$0",
            out: "Not Covered",
          },
        ],
      },
    ],
  },
];

const S = {
  Page: styled(Container)({
    paddingTop: "50px",
    paddingBottom: 40,
    maxWidth: "940px !important",
  }),
  TitleLink: styled(Typography)({
    fontSize: 36,
    "@media(max-width: 767px)": { fontSize: 24 },
  }),
  Price: styled(Typography)({
    color: "#465578",
    fontWeight: 700,
    fontSize: 36,
    whiteSpace: "nowrap",
    "& span": { fontSize: 16 },
    "@media(max-width: 767px)": { fontSize: 26 },
  }),
  BtnPrimary: styled(Button)({
    padding: "0 58px",
    height: 46,
    color: "#fff",
    background:
      "linear-gradient(90deg, rgba(134,168,255,1) 0%, rgba(108,99,255,1) 100%)",
    "&:hover": {
      opacity: 0.95,
      background:
        "linear-gradient(90deg, rgba(134,168,255,1) 0%, rgba(108,99,255,1) 100%)",
    },
    "@media(max-width: 767px)": {
      padding: "0 35px",
    },
  }),
  SectionCard: styled(Paper)({
    borderRadius: "20px",
    padding: "20px 20px 10px",
    background: "#F8F9FF",
    boxShadow: "none",
    marginTop: "20px",
  }),
  SectionTitle: styled(Typography)({
    marginBottom: "17px",
    fontWeight: "600",
    fontSize: "24px",
  }),
  Table: styled("div")({
    display: "grid",
    gridTemplateColumns: "minmax(260px, 2.4fr) 1.5fr 1fr",
    gap: 0,
    background: "#fff",
    borderRadius: "20px",
    padding: "15px 25px",
    "@media(max-width: 767px)": {
      gridTemplateColumns: "1fr",
      rowGap: 0,
      padding: "5px 20px",
    },
  }),
  Th: styled("div")({
    color: "#465578",
    fontSize: 16,
    fontWeight: 600,
    padding: "10px 0px",
    borderBottom: "1px solid #ACBEE8",
    "&:nth-child(3n)": { textAlign: "right" },
    "@media(max-width: 767px)": {
      display: "none",
    },
  }),
  Td: styled("div")({
    color: "#6579A8",
    fontSize: 14,
    padding: "12px 0",
    borderBottom: "1px solid #ACBEE8",
    "&:nth-child(3n)": { textAlign: "right" },
    "&:nth-last-child(-n+3)": { border: "none" },

    "@media(max-width: 767px)": {
      textAlign: "left",
      borderBottom: "none",
      padding: "10px 0",

      "&:nth-child(3n+1)": {
        fontWeight: 600,
        color: "#465578",
        fontSize: "16px",
        paddingBottom: "0",
        marginTop: "5px",
      },

      "&[data-col]::before": {
        content: "attr(data-col)",
        display: "block",
        fontSize: 14,
        color: "#465578",
        marginBottom: 4,
        fontWeight: "500",
      },

      "&:nth-child(3n)": {
        paddingBottom: 14,
        borderBottom: "1px solid #ACBEE8",
        textAlign: "left",
        paddingTop: "0",
      },
      "&:last-of-type": {
        border: "none !important",
      },
    },
  }),
  Line: styled(Typography)({
    color: "#6579A8",
    fontWeight: 500,
  }),
};

export default function PlanSingle() {
  const { id } = useParams();
  const location = useLocation();

  const plan =
    location.state?.plan || PLANS.find((p) => String(p.id) === String(id));

  if (!plan) {
    return (
      <S.Page>
        <Typography sx={{ color: "#6579A8" }}>Plan not found.</Typography>
      </S.Page>
    );
  }

  return (
    <S.Page>
      <Box sx={{ padding: { xs: "25px 0 0", sm: "0 15px" } }}>
        <Box>
          <Box>
            <Stack
              direction="row"
              sx={{ mb: "15px", gap: "10px", flexWrap: "wrap" }}
            >
              <Chip
                size="small"
                label={plan.carrier}
                sx={{
                  background: "#F8F9FF",
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
                label={plan.metalTier}
                sx={{
                  background: "#F8F9FF",
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
                label={plan.type}
                sx={{
                  background: "#F8F9FF",
                  padding: "0px 10px",
                  height: "34px",
                  fontWeight: "500",
                  fontSize: "12px",
                  color: "#6C63FF",
                }}
              />
              {plan.hsa && (
                <Chip
                  size="small"
                  label="HSA"
                  sx={{
                    background: "#F8F9FF",
                    padding: "0px 10px",
                    height: "34px",
                    fontWeight: "500",
                    fontSize: "12px",
                    color: "#6C63FF",
                  }}
                />
              )}
            </Stack>

            <S.TitleLink variant="h1">{plan.name}</S.TitleLink>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: { xs: "flex-start", sm: "center" },
              marginTop: "10px",
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: { xs: "5px", sm: "10px" },
                margin: { xs: "5px 0 15px", sm: "0" },
              }}
            >
              <S.Line>Deductible: {plan.deductible}</S.Line>
              <S.Line>Primary Care Visits: {plan.primaryCare}</S.Line>
              <S.Line>Generic Drugs: {plan.genericDrugs}</S.Line>
            </Box>

            <Box sx={{ textAlign: { xs: "left", md: "right" } }}>
              <S.Price>
                ${plan.premium} <span>/month</span>
              </S.Price>
              <Box sx={{ mt: 1 }}>
                <S.BtnPrimary>Get This Plan</S.BtnPrimary>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Benefit Details */}
      <S.SectionCard>
        <S.SectionTitle>Benefit Details</S.SectionTitle>

        {plan.benefits.map((section, idx) => (
          <Box key={idx} sx={{ mb: "10px" }}>
            <S.Table>
              <S.Th>{section.columns[0]}</S.Th>
              <S.Th>{section.columns[1]}</S.Th>
              <S.Th>{section.columns[2]}</S.Th>

              {section.rows.map((r, i) => (
                <React.Fragment key={i}>
                  <S.Td sx={{ fontWeight: 600, color: "#465578" }}>
                    {r.label}
                  </S.Td>
                  <S.Td data-col={section.columns[1]}>{r.in}</S.Td>
                  <S.Td data-col={section.columns[2]}>{r.out}</S.Td>
                </React.Fragment>
              ))}
            </S.Table>
          </Box>
        ))}
      </S.SectionCard>
      <Box sx={{ mt: "17px" }}>
        <S.BtnPrimary
          fullWidth
          sx={{
            maxWidth: { xs: "100%", sm: "255px" },
            marginBottom: { xs: "25px", sm: "0" },
          }}
        >
          Get This Plan
        </S.BtnPrimary>
      </Box>
    </S.Page>
  );
}
