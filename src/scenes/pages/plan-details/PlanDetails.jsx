import * as React from "react";
import { Container, Box, Typography, Link as MuiLink } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link as RouterLink } from "react-router-dom";

import arrowLeft from "../../../assets/arrow-left.svg";

const Root = styled(Container)({
  maxWidth: "944px !important",
});

const BackLink = styled(MuiLink)(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  color: "#465578",
  fontWeight: 600,
  gap: 8,
  marginBottom: "22px",
  "&:hover": { opacity: 0.85 },
}));

const Section = styled(Box)(({ theme }) => ({
  backgroundColor: "#F8F9FF",
  borderRadius: "20px",
  padding: "30px",
  marginBottom: "30px",
  "@media(max-width: 767px)": {
    padding: "25px 20px 20px",
    marginBottom: "20px",
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  marginBottom: "21px",
  "@media(max-width: 767px)": {
    fontSize: "28px",
    marginBottom: "10px",
  },
}));

const Rows = styled(Box)({});

const RowRoot = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 0",
  "&:not(:first-of-type)": {
    borderTop: "1px solid rgba(70,85,120,0.12)",
  },
  "@media(max-width: 767px)": {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    gap: "4px",
    padding: "12px 0",
  },
}));

const RowLabel = styled(Typography)({
  color: "#465578",
  fontWeight: "600",
  fontSize: "16px",
});

const RowValue = styled(Typography)(({ theme }) => ({
  color: "#465578",
  textAlign: "right",
  whiteSpace: "normal",
  maxWidth: "398px",
  marginLeft: "auto",
  lineHeight: "1.8",
  "@media(max-width: 767px)": {
    textAlign: "left",
    marginLeft: 0,
    lineHeight: 1.6,
  },
}));

function SectionCard({ title, rows }) {
  return (
    <Section>
      <SectionTitle variant="h2">{title}</SectionTitle>
      <Rows>
        {rows.map((r, i) => (
          <RowRoot key={i}>
            <RowLabel variant="body2">{r.label}</RowLabel>
            <RowValue variant="body2">{r.value}</RowValue>
          </RowRoot>
        ))}
      </Rows>
    </Section>
  );
}

export default function PlanDetails() {
  const data = {
    planDetails: [
      { label: "Plan Type", value: "Qualified Small Employer HRA" },
      { label: "Plan Dates", value: "Jun 2025 – Apr 2026" },
      {
        label: "Enable Text-To-Confirm for Monthly Premium Payments",
        value: "Yes",
      },
      {
        label: "Last Expense Submission Date for Plan Year",
        value: "Jul 15, 2026",
      },
      {
        label: "Unused Funds",
        value:
          "Any remaining balance from this plan year will not be carried over into the new plan year.",
      },
      {
        label: "Reimbursement Method",
        value: "ACH direct deposit (funded by Solution) – Daily/Pay-cycle",
      },
    ],
    eligibilityCoverage: [
      { label: "Eligible Participants", value: "Bojan Sandić, 123 123" },
      {
        label: "Eligible Expenses",
        value:
          "Premiums + out-of-pocket medical expenses — excluding premiums paid pre-tax (e.g., through a group employer plan).",
      },
    ],
    allowancesBalances: [
      { label: "Monthly Allowance", value: "$400.00" },
      { label: "Plan Year Allowance", value: "$4,800.00" },
      { label: "Plan Year Allowance Remaining", value: "$4,800.00" },
    ],
    expenseStatus: [
      { label: "Expense Reimbursed", value: "$0.00" },
      {
        label: "Approved Expenses with Reimbursement Date Scheduled",
        value: "$0.00",
      },
      {
        label: "Approved Expenses without Reimbursement Date Scheduled",
        value: "$0.00",
      },
      { label: "Submitted Expenses Pending Approval", value: "$0.00" },
    ],
  };

  return (
    <Root>
      <Box sx={{ p: { xs: "36px 0 20px", sm: "66px 0 50px" } }}>
        <BackLink component={RouterLink} to="/" underline="none">
          <Box aria-hidden sx={{ fontSize: 18 }}>
            <img src={arrowLeft} alt="arrow left" />
          </Box>
          Go Back
        </BackLink>

        <SectionCard title="Plan Details" rows={data.planDetails} />
        <SectionCard
          title="Eligibility & Coverage"
          rows={data.eligibilityCoverage}
        />
        <SectionCard
          title="Allowances & Balances"
          rows={data.allowancesBalances}
        />
        <SectionCard title="Expense Status" rows={data.expenseStatus} />
      </Box>
    </Root>
  );
}
