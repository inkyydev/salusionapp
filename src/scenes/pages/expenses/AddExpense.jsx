import * as React from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  FormControl,
  FormLabel,
  Link as MuiLink,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";

import arrowBack from "../../../assets/arrow-left.svg";
import fileIcon from "../../../assets/file-icon.svg";

const Root = styled(Container)({
  paddingTop: 16,
  maxWidth: "700px !important",
});

const FieldWrap = styled(FormControl)(({ theme }) => ({
  marginTop: 15,
}));

const StaticLabel = styled(FormLabel)(({ theme }) => ({
  marginBottom: "-3px",
  fontSize: 14,
}));

const BackLink = styled(MuiLink)({
  display: "inline-flex",
  alignItems: "center",
  color: "#465578",
  fontWeight: 500,
  gap: 8,
  textDecoration: "none",
  marginBottom: 16,
  "&:hover": { opacity: 0.85 },
});

const Card = styled(Box)(({ theme }) => ({
  backgroundColor: "#F8F9FF",
  borderRadius: 20,
  padding: "26px 30px",
  "@media(max-width: 767px)": {
    padding: "26px 20px",
  },
}));

const Title = styled(Typography)(({ theme }) => ({
  color: "#465578",
  fontWeight: 700,
  marginBottom: 16,
  fontSize: 28,
  [theme.breakpoints.up("md")]: { fontSize: 32 },
}));

const ReceiptsGrid = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: 12,
  marginBottom: 8,
  [theme.breakpoints.up("sm")]: { gridTemplateColumns: "repeat(4, 1fr)" },
}));

const TileBase = styled(Box)({
  height: 126,
  borderRadius: 14,
  background: "#F0F1FF",
  border: "1px dashed #6C63FF",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  color: "#6C63FF",
  fontWeight: 500,
  cursor: "pointer",
  overflow: "hidden",
});

const AddTile = styled(TileBase)({ "&:hover": { background: "#F1F3FF" } });
const PreviewTile = styled(TileBase)({
  border: "none",
  padding: 0,
  background: "#fff",
});
const PreviewImg = styled("img")({
  width: "auto",
  height: "auto",
  objectFit: "contain",
});

const Field = styled(TextField)(({ theme }) => ({
  marginTop: 12,
  "& .MuiInputBase-input": {
    color: "#465578",
    "::placeholder": {
      color: "#465578",
      opacity: 1, // bitno za WebKit
    },
  },
  "& .MuiOutlinedInput-root": {
    borderRadius: 12,
    background: "#fff",
    "& fieldset": { borderColor: "#FFFFFF" },
    "&:hover fieldset": { borderColor: "#FFFFFF" },
    "&.Mui-focused fieldset": { borderColor: "#FFFFFF" },
  },
}));

const SectionLabel = styled(Typography)({
  marginTop: "14px",
  marginBottom: "13px",
});

const InfoText = styled(Typography)({
  marginTop: 10,
  fontSize: 12,
  marginBottom: "8px",
});

const NoteList = styled(Box)({
  marginTop: 10,
  color: "#6579A8",
  fontSize: 12,
  lineHeight: 1.5,
  "& > div": {
    display: "flex",
    alignItems: "flex-start",
    gap: 8,
    marginTop: 6,
  },
  "& b": { color: "#465578" },
});

const SubmitBtn = styled(Button)({
  marginTop: 18,
  padding: "14px 22px",
  fontWeight: 700,
  borderRadius: 10,
  color: "#fff",
  backgroundSize: "200% auto",
  backgroundPosition: "left center",
  background:
    "linear-gradient(90deg, rgba(134,168,255,1) 0%, rgba(108,99,255,1) 100%)",
  "&:hover": {
    backgroundPosition: "right center",
  },
});

const HiddenInput = styled("input")({ display: "none" });

const MAX_FILES = 4;

export default function AddExpense() {
  const navigate = useNavigate();
  const location = useLocation();

  const fileInputRef = React.useRef(null);
  const [files, setFiles] = React.useState([]); // File[]
  const [fileError, setFileError] = React.useState("");

  const mergeWithLimit = React.useCallback((prev, incoming) => {
    const same = (a, b) =>
      a.name === b.name &&
      a.size === b.size &&
      a.lastModified === b.lastModified;

    const uniqueIncoming = incoming.filter(
      (f) => !prev.some((p) => same(p, f))
    );
    const capacity = MAX_FILES - prev.length;
    const toAdd = uniqueIncoming.slice(0, Math.max(0, capacity));

    if (uniqueIncoming.length > capacity) {
      setFileError(`Maksimalno ${MAX_FILES} fajla. Višak je ignorisan.`);
    } else {
      setFileError("");
    }
    return [...prev, ...toAdd];
  }, []);

  React.useEffect(() => {
    const fromState =
      location.state?.files ||
      (location.state?.file ? [location.state.file] : []);
    if (fromState?.length) {
      setFiles((prev) => mergeWithLimit(prev, fromState));
    }
  }, []);

  const [form, setForm] = React.useState({
    isPremium: "no",
    // regular
    amount: "",
    date: "",
    provider: "Bojan.S",
    forWhom: "Bojan.S",
    // premium
    premiumAmount: "",
    premiumMonth: "",
    insuranceProvider: "Bojan.S",
    policyHolder: "Bojan.S",
  });

  const providers = ["Bojan.S", "Maja", "ACME Health"];
  const people = ["Bojan.S", "Ana", "Petar"];

  const openPicker = () => fileInputRef.current?.click();

  const handleFiles = (e) => {
    const selected = Array.from(e.target.files || []);
    if (!selected.length) return;
    setFiles((prev) => mergeWithLimit(prev, selected));
    e.target.value = "";
  };

  const removeFile = (idx) =>
    setFiles((prev) => {
      const next = prev.filter((_, i) => i !== idx);
      if (next.length < MAX_FILES) setFileError("");
      return next;
    });

  const handleChange = (name) => (e) =>
    setForm((f) => ({ ...f, [name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/review-expense", { state: { files, form } });
  };

  const renderSlots = () => {
    const slots = [];
    for (let i = 0; i < MAX_FILES; i++) {
      if (i < files.length) {
        const f = files[i];
        slots.push(
          <PreviewTile
            key={`p-${i}`}
            onClick={() => removeFile(i)}
            title="Remove"
          >
            {f.type?.startsWith("image/") ? (
              <PreviewImg src={URL.createObjectURL(f)} alt={f.name} />
            ) : (
              <Box sx={{ p: 2 }}>{f.name}</Box>
            )}
          </PreviewTile>
        );
      } else if (i === files.length) {
        slots.push(
          <AddTile key="add" onClick={openPicker}>
            <Box>
              <Box component="span">
                <Box
                  sx={{
                    width: "25px",
                  }}
                  component="img"
                  src={fileIcon}
                  alt=""
                />
              </Box>
              <Box sx={{ fontSize: "12px" }}>Add another receipt</Box>
            </Box>
          </AddTile>
        );
      } else {
        slots.push(
          <TileBase
            key={`ph-${i}`}
            sx={{
              background: "#fff",
              border: "none",
              color: "#C8CCF5",
              cursor: "default",
            }}
          ></TileBase>
        );
      }
    }
    return slots;
  };

  return (
    <Box pb="40px">
      <Root>
        <BackLink component={RouterLink} to="/">
          <Box aria-hidden sx={{ fontSize: 18 }}>
            <img src={arrowBack} alt="arrow back" />
          </Box>
          Go Back
        </BackLink>

        <Card component="form" onSubmit={handleSubmit}>
          <Title variant="h1">Add Expense</Title>

          <SectionLabel>Add your receipt</SectionLabel>
          <ReceiptsGrid>{renderSlots()}</ReceiptsGrid>

          {fileError && (
            <Typography sx={{ color: "#d32f2f", mb: 1 }}>
              {fileError}
            </Typography>
          )}

          <HiddenInput
            ref={fileInputRef}
            type="file"
            accept="image/*,application/pdf"
            multiple
            onChange={handleFiles}
          />

          {/* Radio pitanje */}
          <SectionLabel>Is this expense an insurance premium?</SectionLabel>
          <RadioGroup
            row
            value={form.isPremium}
            onChange={handleChange("isPremium")}
            sx={{ gap: 3, marginTop: "-10px" }}
          >
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>

          {/* === Regularni fieldovi (kad je NO) === */}
          {form.isPremium === "no" && (
            <>
              <FieldWrap fullWidth>
                <StaticLabel htmlFor="amount">Amount</StaticLabel>
                <Field
                  id="amount"
                  placeholder="$0.00"
                  type="text"
                  value={form.amount}
                  onChange={handleChange("amount")}
                  inputProps={{ inputMode: "decimal" }}
                  required
                  fullWidth
                />
              </FieldWrap>

              <FieldWrap fullWidth>
                <StaticLabel htmlFor="date">Date of Service</StaticLabel>
                <Field
                  id="date"
                  placeholder="06.03.2025"
                  type="text" // ⬅️ tekstualni unos
                  value={form.date}
                  onChange={handleChange("date")}
                  required
                  fullWidth
                />
              </FieldWrap>

              <FieldWrap fullWidth>
                <StaticLabel htmlFor="provider">Provider</StaticLabel>
                <Field
                  id="provider"
                  select
                  value={form.provider}
                  onChange={handleChange("provider")}
                  fullWidth
                >
                  {providers.map((p) => (
                    <MenuItem key={p} value={p}>
                      {p}
                    </MenuItem>
                  ))}
                </Field>
              </FieldWrap>

              <FieldWrap fullWidth>
                <StaticLabel htmlFor="forWhom">
                  Who is this expense for?
                </StaticLabel>
                <Field
                  id="forWhom"
                  select
                  value={form.forWhom}
                  onChange={handleChange("forWhom")}
                  fullWidth
                >
                  {people.map((p) => (
                    <MenuItem key={p} value={p}>
                      {p}
                    </MenuItem>
                  ))}
                </Field>
              </FieldWrap>
            </>
          )}

          {/* === Premium fieldovi (kad je YES) === */}
          {form.isPremium === "yes" && (
            <>
              <FieldWrap fullWidth>
                <StaticLabel htmlFor="premiumAmount">
                  Premium Amount
                </StaticLabel>
                <Field
                  id="premiumAmount"
                  placeholder="$0.00"
                  type="text"
                  value={form.premiumAmount}
                  onChange={handleChange("premiumAmount")}
                  inputProps={{ inputMode: "decimal" }}
                  required
                  fullWidth
                />
              </FieldWrap>

              <InfoText>
                For premiums, enter amount BEFORE any premium tax credit
                adjustment. QSEHRA allocations offset dollar-for-dollar any
                premium tax credit you receive.
              </InfoText>

              <FieldWrap fullWidth>
                <StaticLabel htmlFor="premiumMonth">
                  Month of Insurance Coverage
                </StaticLabel>
                <Field
                  id="premiumMonth"
                  placeholder="06.03.2025"
                  type="text" // ⬅️ ostaje tekst
                  value={form.premiumMonth}
                  onChange={handleChange("premiumMonth")}
                  required
                  fullWidth
                />
              </FieldWrap>

              <FieldWrap fullWidth>
                <StaticLabel htmlFor="insuranceProvider">
                  Insurance Provider
                </StaticLabel>
                <Field
                  id="insuranceProvider"
                  select
                  value={form.insuranceProvider}
                  onChange={handleChange("insuranceProvider")}
                  fullWidth
                >
                  {providers.map((p) => (
                    <MenuItem key={p} value={p}>
                      {p}
                    </MenuItem>
                  ))}
                </Field>
              </FieldWrap>

              <FieldWrap fullWidth>
                <StaticLabel htmlFor="policyHolder">Policy Holder</StaticLabel>
                <Field
                  id="policyHolder"
                  select
                  value={form.policyHolder}
                  onChange={handleChange("policyHolder")}
                  fullWidth
                >
                  {people.map((p) => (
                    <MenuItem key={p} value={p}>
                      {p}
                    </MenuItem>
                  ))}
                </Field>
              </FieldWrap>

              <Typography
                variant="body1"
                sx={{ fontWeight: 500, margin: "20px 0 15px" }}
              >
                Instead of submitting your premiums each month, let us handle it
                for you. Add a phone number to your profile to take advantage of
                this option.
              </Typography>
            </>
          )}

          <NoteList>
            By submitting your expense, you confirm and agree to the following:
            <div>
              <Box component="span" aria-hidden sx={{ color: "#6C63FF" }}>
                •
              </Box>
              <span>You have paid for this expense</span>
            </div>
            <div>
              <Box component="span" aria-hidden sx={{ color: "#6C63FF" }}>
                •
              </Box>
              <span>This expense is eligible for reimbursement</span>
            </div>
          </NoteList>

          <SubmitBtn type="submit" fullWidth>
            Submit for Approval
          </SubmitBtn>
        </Card>
      </Root>
    </Box>
  );
}
