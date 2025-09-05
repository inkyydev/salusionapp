import { useEffect, useState, useMemo } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Divider,
  Stack,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Button,
  colors,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import AvailablePlansList from "./AvailablePlansList";

const PLANS = [
  {
    id: "P001",
    carrier: "Aetna CVS Health",
    name: "Gold HMO Pathway Enhanced with Adult Dental and Vision Benefits",
    metalTier: "Gold",
    type: "HMO",
    hsa: false,
    premium: 483.01,
    deductible: 2000,
    primaryCare: "15% copay",
    genericDrugs: "5% copay",
  },
  {
    id: "P002",
    carrier: "Aetna CVS Health",
    name: "Gold PPO Pathway",
    metalTier: "Gold",
    type: "PPO",
    hsa: false,
    premium: 486.44,
    deductible: 2000,
    primaryCare: "10% coinsurance after deductible",
    genericDrugs: "10% coinsurance",
  },
];

const CARRIERS = [
  "Aetna CVS Health",
  "Ambetter",
  "BlueCross BlueShield of North Carolina",
  "Cigna Healthcare",
  "UnitedHealthcare",
];
const METAL_TIERS = ["Bronze", "Silver", "Gold", "Platinum"];
const PLAN_TYPES = ["EPO", "HMO", "PPO"];

const S = {
  Page: styled(Box)({
    marginTop: "32px",
    paddingBottom: "40px",
  }),
  Layout: styled(Box)({
    display: "flex",
    gap: "32px",
    "@media(max-width: 1024px)": {
      gap: "20px",
    },
    "@media(max-width: 767px)": {
      flexDirection: "column",
    },
  }),
  Sidebar: styled(Paper)({
    borderRadius: "20px",
    padding: "20px 25px",
    boxShadow: "none",
    backgroundColor: "#F8F9FF",
    flexBasis: "260px",
    maxWidth: "260px",
    "@media(max-width: 767px)": {
      flexBasis: "100%",
      maxWidth: "100%",
      padding: "20px",
    },
  }),
  Heading: styled(Typography)({
    color: "#465578",
    fontWeight: 600,
  }),
  SectionTitle: styled(Typography)({
    color: "#465578",
    fontWeight: 400,
    fontSize: "12px",
    marginBottom: 8,
  }),
  ResetBtn: styled(Button)({
    padding: 0,
    minWidth: 0,
    textTransform: "none",
    color: "#6C63FF",
    background: "none !important",
  }),
  CheckboxBox: styled(Checkbox)({
    color: "#6C63FF",
    padding: "7px 9px",
    "& span": {
      color: "#465578",
      fontSize: "12px",
    },
    "@media(max-width: 767px)": {
      padding: "4px 9px",
    },
  }),
};

export default function AvailablePlans({ onCountsChange }) {
  const [filters, setFilters] = useState({
    carriers: new Set(),
    tiers: new Set(),
    types: new Set(),
    hsaOnly: false,
  });

  const filteredPlans = useMemo(() => {
    return PLANS.filter((p) => {
      if (filters.carriers.size && !filters.carriers.has(p.carrier))
        return false;
      if (filters.tiers.size && !filters.tiers.has(p.metalTier)) return false;
      if (filters.types.size && !filters.types.has(p.type)) return false;
      if (filters.hsaOnly && !p.hsa) return false;
      return true;
    });
  }, [filters]);

  useEffect(() => {
    onCountsChange?.({ shown: filteredPlans.length, total: PLANS.length });
  }, [filteredPlans.length, onCountsChange]);

  const toggleFromSet = (key, value) => {
    setFilters((prev) => {
      const s = new Set(prev[key]);
      s.has(value) ? s.delete(value) : s.add(value);
      return { ...prev, [key]: s };
    });
  };

  const clear = () =>
    setFilters({
      carriers: new Set(),
      tiers: new Set(),
      types: new Set(),
      hsaOnly: false,
    });

  return (
    <S.Page>
      <S.Layout>
        {/* Filters */}
        <S.Sidebar>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mb: 1 }}
          >
            <S.Heading variant="h6">Filters</S.Heading>
            <S.ResetBtn disableRipple onClick={clear}>
              Reset
            </S.ResetBtn>
          </Stack>
          <Divider sx={{ mb: 2, borderColor: "#ACBEE8" }} />

          <S.SectionTitle>Carrier</S.SectionTitle>
          <FormGroup>
            {CARRIERS.map((c) => (
              <FormControlLabel
                key={c}
                control={
                  <S.CheckboxBox
                    size="small"
                    checked={filters.carriers.has(c)}
                    onChange={() => toggleFromSet("carriers", c)}
                  />
                }
                label={c}
                sx={{
                  // osnovni stil za label
                  "& .MuiFormControlLabel-label": {
                    color: "#465578",
                    fontSize: 12,
                    fontWeight: 500,
                  },
                  "& .Mui-checked + .MuiFormControlLabel-label": {
                    color: "#465578",
                    fontWeight: 500,
                  },
                }}
              />
            ))}
          </FormGroup>

          <Divider
            sx={{ my: { xs: "10px", sm: "15px" }, borderColor: "#ACBEE8" }}
          />

          <S.SectionTitle>Metal Tier</S.SectionTitle>
          <FormGroup>
            {METAL_TIERS.map((t) => (
              <FormControlLabel
                key={t}
                control={
                  <S.CheckboxBox
                    size="small"
                    checked={filters.tiers.has(t)}
                    onChange={() => toggleFromSet("tiers", t)}
                  />
                }
                label={t}
                sx={{
                  // osnovni stil za label
                  "& .MuiFormControlLabel-label": {
                    color: "#465578",
                    fontSize: 12,
                    fontWeight: 500,
                  },
                  "& .Mui-checked + .MuiFormControlLabel-label": {
                    color: "#465578",
                    fontWeight: 500,
                  },
                }}
              />
            ))}
          </FormGroup>

          <Divider
            sx={{ my: { xs: "10px", sm: "15px" }, borderColor: "#ACBEE8" }}
          />

          <S.SectionTitle>Plan Type</S.SectionTitle>
          <FormGroup>
            {PLAN_TYPES.map((t) => (
              <FormControlLabel
                key={t}
                control={
                  <S.CheckboxBox
                    size="small"
                    checked={filters.types.has(t)}
                    onChange={() => toggleFromSet("types", t)}
                  />
                }
                label={t}
                sx={{
                  // osnovni stil za label
                  "& .MuiFormControlLabel-label": {
                    color: "#465578",
                    fontSize: 12,
                    fontWeight: 500,
                  },
                  "& .Mui-checked + .MuiFormControlLabel-label": {
                    color: "#465578",
                    fontWeight: 500,
                  },
                }}
              />
            ))}
          </FormGroup>

          <Divider sx={{ my: { xs: "10px", sm: "15px" } }} />

          <S.SectionTitle>Health Savings Account</S.SectionTitle>
          <FormGroup>
            <FormControlLabel
              control={
                <S.CheckboxBox
                  size="small"
                  checked={filters.hsaOnly}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      hsaOnly: e.target.checked,
                    }))
                  }
                />
              }
              label="HSA eligible only"
              sx={{
                // osnovni stil za label
                "& .MuiFormControlLabel-label": {
                  color: "#465578",
                  fontSize: 12,
                  fontWeight: 500,
                },
                "& .Mui-checked + .MuiFormControlLabel-label": {
                  color: "#465578",
                  fontWeight: 500,
                },
              }}
            />
          </FormGroup>
        </S.Sidebar>

        {/* List */}
        <Box sx={{ flex: "1" }}>
          <AvailablePlansList
            plans={filteredPlans}
            onSelect={(p) => console.log("SELECT PLAN:", p.id)}
          />
        </Box>
      </S.Layout>
    </S.Page>
  );
}
