import * as React from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Avatar,
  IconButton,
  Button,
  Tooltip,
  Chip,
  InputAdornment,
  Checkbox,
  MenuItem,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import EditOutlined from "@mui/icons-material/EditOutlined";

import csvIcon from "../../../assets/csv-icon.svg";
import closeIconTerminate from "../../../assets/close-icon-terminate.svg";
import editIcon from "../../../assets/edit-icon.svg";

const Card = styled(Box)(({ theme }) => ({
  backgroundColor: "#F8F9FF",
  borderRadius: "20px",
  padding: "29px 35px",
  "@media(max-width: 767px)": {
    padding: "29px 20px",
    margin: "0 -20px",
    borderRadius: "0",
  },
}));

const Segmented = styled(Box)(({ theme }) => ({
  display: "inline-flex",
  background: "linear-gradient(130deg, #F2F5FF, #F1F1FF)",
  borderRadius: "10px",
}));

const SegBtn = styled(Button)({
  textTransform: "none",
  fontWeight: 600,
  borderRadius: 8,
  padding: "8px 14px",
  minWidth: 150,
  minHeight: 50,
  background: "transparent",
  fontWeight: "500",
  transition: "all .2s ease",
  color: "#465578",
  boxShadow: "none !important",
  flexBasis: "50%",
  "&.active": {
    background: "linear-gradient(70deg, #7FC2FF, #6C63FF)",
    color: "#fff",
  },
});

const YearSwitch = styled(Box)(({ theme }) => ({
  display: "inline-flex",
  background: "linear-gradient(130deg, #F2F5FF, #F1F1FF)",
  borderRadius: "5px",
  marginLeft: "auto",
}));

const YearBtn = styled(Button)({
  textTransform: "none",
  fontWeight: 400,
  borderRadius: 5,
  padding: "0",
  boxShadow: "none !important",
  minWidth: "100px",
  minHeight: "40px",
  background: "transparent",
  transition: "all .2s ease",
  color: "#465578",
  "&.active": {
    background: "linear-gradient(70deg, #7FC2FF, #6C63FF)",
    color: "#fff",
  },
  "@media(max-width: 767px)": {
    minWidth: "75px",
    minHeight: "33px",
  },
});

const SearchField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    background: "#fff",
    borderRadius: 12,
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgba(108, 99, 255, .1)",
    },
    "& fieldset": { borderColor: "rgba(70,85,120,0.2)" },
    "&:hover fieldset": { borderColor: "#6C63FF" },
    "&.Mui-focused fieldset": { borderWidth: "1px" },
  },
  "& .MuiOutlinedInput-input": {
    color: "#465578",
    opacity: 1,
    "::placeholder": { color: "#465578", opacity: 1 },
  },
}));

const TableWrap = styled("div")({
  marginTop: 16,
  overflowX: "auto",
});

const Table = styled("table")({
  width: "100%",
  borderCollapse: "separate",
  borderSpacing: "0 12px",
  minWidth: 920,
  tableLayout: "fixed",
  "@media(max-width: 767px)": {
    minWidth: "800px",
  },
});

const Th = styled("th")({
  textAlign: "center",
  color: "#6579A8",
  fontWeight: 400,
  padding: "0 16px 6px",
  "&:first-of-type": {
    textAlign: "left",
  },
});

const Tr = styled("tr")({});

const Td = styled("td")({
  padding: "14px 16px",
  textAlign: "center",
  verticalAlign: "middle",
  background: "#fff",
  "&:first-of-type": {
    borderTopLeftRadius: "20px",
    borderBottomLeftRadius: "20px",
    textAlign: "left",
  },
  "&:last-of-type": {
    borderTopRightRadius: "20px",
    borderBottomRightRadius: "20px",
  },
});

const NameCell = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: 12,
});

const NameText = styled(Box)({
  display: "flex",
  flexDirection: "column",
  "& .name": {
    color: "#6579A8",
    fontSize: 14,
    lineHeight: 1.2,
  },
  "& .email": { color: "#6579A8", fontSize: 12 },
});

const SmallField = styled(TextField)(({ theme }) => ({
  width: 131,

  "& .MuiOutlinedInput-root": {
    background: "#F8F9FF",
    borderRadius: 6,
    height: 40,
    boxShadow: "none !important",
    "&:hover": { boxShadow: "none" },
    "&.Mui-focused": { boxShadow: "none" },

    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgba(108, 99, 255, .1)",
      borderWidth: 1,
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgba(108, 99, 255, .1)",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgba(108, 99, 255, .1)",
    },
    "&.Mui-disabled .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgba(108, 99, 255, .1)",
    },
  },

  "& .MuiOutlinedInput-input": {
    padding: "8px 12px",
    fontSize: 13,
    color: "#6579A8",
    textAlign: "left",
  },

  "& .MuiSelect-select, & .MuiOutlinedInput-input.MuiSelect-select": {
    padding: "8px 36px 8px 12px",
    fontSize: 13,
    minHeight: 0,
    height: 40,
    display: "flex",
    alignItems: "center",
    boxSizing: "border-box",
  },
  "& .MuiSelect-icon": {
    right: 8,
  },
}));

const StatusBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
});

const initials = (full) =>
  full
    .split(/[ ,]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase())
    .join("");

function exportCsv(rows) {
  const header = [
    "Name",
    "Email",
    "Enroll",
    "Eligible Date",
    "Plan Status",
    "Terminate",
  ];
  const lines = rows.map((r) => [
    r.name,
    r.email,
    r.enroll ? "Yes" : "No",
    r.eligible,
    r.status.type === "active"
      ? r.status.note
      : r.status.type === "invited"
      ? "Invited"
      : r.status.note,
    r.terminate || "",
  ]);
  const csv = [header, ...lines]
    .map((a) => a.map(escapeCsv).join(","))
    .join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "employees.csv";
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 0);
}
function escapeCsv(v = "") {
  const s = String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}
const formatToday = () => {
  const d = new Date();
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${dd}.${mm}.${yyyy}`;
};

const ELIGIBLE_OPTIONS = ["02.08.2025", "15.09.2025", "03.01.2026"];

const initialRows = [
  {
    id: "1",
    name: "Austen, Jane",
    email: "jane@mydesk.com",
    enroll: false,
    eligible: "02.08.2025",
    status: { type: "pending", note: "Send invite" },
    terminate: "",
  },
  {
    id: "2",
    name: "John Doe",
    email: "john@mydesk.com",
    enroll: true,
    eligible: "15.09.2025",
    status: { type: "invited", note: "Invited" },
    terminate: "",
  },
  {
    id: "3",
    name: "Mary Smith",
    email: "mary@mydesk.com",
    enroll: true,
    eligible: "03.01.2026",
    status: { type: "active", note: "Active - live Jan 2025" },
    terminate: "02.09.2025",
  },
];

export default function EmployeesTable() {
  const [tab, setTab] = React.useState("employees");
  const [year, setYear] = React.useState(2025);
  const [q, setQ] = React.useState("");
  const [rows, setRows] = React.useState(initialRows);

  const filtered = rows.filter(
    (r) =>
      r.name.toLowerCase().includes(q.toLowerCase()) ||
      r.email.toLowerCase().includes(q.toLowerCase())
  );

  const setRow = (id, patch) =>
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));

  const statusView = (row) => {
    const s = row.status;
    if (s.type === "active") {
      return (
        <Chip
          label={s.note}
          size="small"
          sx={{
            bgcolor: "transparent",
            color: "#6579A8",
            fontWeight: "500",
            fontSize: "12px",
            border: "none",
          }}
        />
      );
    }
    if (s.type === "invited") {
      return (
        <StatusBox>
          <Typography
            sx={{ color: "#6579A8", fontSize: "12px", fontWeight: "500" }}
          >
            Invited
          </Typography>
          <Button
            size="small"
            sx={{
              p: 0,
              minWidth: 0,
              color: "#6C63FF",
              fontWeight: "500",
              fontSize: "12px",
              background: "none !important",
              transition: "all .2s ease",
              "&:hover": {
                opacity: ".6",
              },
            }}
            onClick={() => {
              /* resend invite action */
            }}
          >
            Resend invite
          </Button>
        </StatusBox>
      );
    }
    if (s.type === "created") {
      return (
        <StatusBox>
          <Typography sx={{ color: "#6579A8", fontSize: "12px" }}>
            Account created
          </Typography>
          <Typography sx={{ color: "#6579A8", fontSize: "12px" }}>
            Not finished onboarding
          </Typography>
        </StatusBox>
      );
    }
    // pending
    return (
      <Button
        disableRipple
        variant="outlined"
        size="small"
        sx={{
          textTransform: "none",
          border: "none",
          color: "#6C63FF",
          fontWeight: 500,
          borderRadius: 8,
          px: 1.5,
          py: 0.5,
          fontSize: "12px",
          background: "none !important",
          fontWeight: "500",
          transition: "all .2s ease",
          "&:hover": {
            opacity: ".6",
          },
        }}
        onClick={() =>
          setRow(row.id, { status: { type: "invited", note: "Invited" } })
        }
      >
        {s.note}
      </Button>
    );
  };

  return (
    <Container sx={{ py: 3, maxWidth: "1048px !important" }}>
      <Card>
        <Typography
          variant="h3"
          sx={{ mb: "20px", maxWidth: { xs: "242px", sm: "100%" } }}
        >
          Qualified Small Employer HRA
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: "13px",
            alignItems: "center",
            "@media(max-width: 767px)": {
              flexDirection: "column",
            },
          }}
        >
          <Segmented
            sx={{
              flexBasis: { xs: "100%", sm: "297px" },
              maxWidth: { xs: "100%", sm: "297px" },
              order: { xs: "2", sm: "1" },
              width: { xs: "100%", sm: "auto" },
            }}
          >
            <SegBtn
              variant={tab === "employees" ? "contained" : "text"}
              onClick={() => setTab("employees")}
              className={tab === "employees" ? "active" : ""}
            >
              Employees
            </SegBtn>
            <SegBtn
              variant={tab === "enrolled" ? "contained" : "text"}
              onClick={() => setTab("enrolled")}
              className={tab === "enrolled" ? "active" : ""}
            >
              Enrolled
            </SegBtn>
          </Segmented>

          <SearchField
            sx={{
              flex: 1,
              order: { xs: "1", sm: "2" },
              width: { xs: "100%", sm: "auto" },
            }}
            placeholder="Search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />

          <Button
            variant="text"
            onClick={() => exportCsv(filtered)}
            sx={{
              textTransform: "none",
              fontWeight: 500,
              padding: 0,
              background: "none",
              color: "#465578",
              display: "flex",
              gap: "8px",
              alignItems: { xs: "right", sm: "center" },
              order: { xs: "-1", sm: "3" },
              marginLeft: { xs: "auto", sm: "0" },
              marginTop: { xs: "-35px", sm: "0px" },
            }}
          >
            <Box component="img" src={csvIcon} />
            <Typography sx={{ display: { xs: "none", sm: "inline-block" } }}>
              Export to CSV
            </Typography>
          </Button>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            my: { xs: "15px", sm: "22px" },
            borderBottom: "1px solid #ACBEE8",
            pb: "14px",
            gap: 2,
            color: "#6579A8",
            fontSize: 14,
          }}
        >
          <Box
            sx={{
              maxWidth: { xs: "160px", sm: "100%" },
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            <Typography color="#6579A8">Plan Year: </Typography>
            <Typography color="#6579A8">May 2025 – Apr 2026 </Typography>
          </Box>
          <YearSwitch>
            <YearBtn
              variant={year === 2025 ? "contained" : "text"}
              onClick={() => setYear(2025)}
              className={year === 2025 ? "active" : ""}
            >
              2025
            </YearBtn>
            <YearBtn
              variant={year === 2026 ? "contained" : "text"}
              onClick={() => setYear(2026)}
              className={year === 2026 ? "active" : ""}
            >
              2026
            </YearBtn>
          </YearSwitch>
        </Box>

        {/* Table */}
        <TableWrap
          sx={{
            "--c-name": { xs: "160px", sm: "200px" },
            "--c-enroll": { xs: "60px", sm: "80px" },
            "--c-eligible": { xs: "130px", sm: "160px" },
            "--c-status": { xs: "150px", sm: "151px" },
            "--c-term": { xs: "70px", sm: "100px" },
            "--c-update": "110px",
          }}
        >
          <Table>
            <colgroup>
              <col style={{ width: "var(--c-name)" }} />
              <col style={{ width: "var(--c-enroll)" }} />
              <col style={{ width: "var(--c-eligible)" }} />
              <col style={{ width: "var(--c-status)" }} />
              <col style={{ width: "var(--c-term)" }} />
              <col style={{ width: "var(--c-update)" }} />
            </colgroup>
            <thead>
              <Tr
                style={{
                  background: "transparent",
                  border: "none",
                  boxShadow: "none",
                }}
              >
                <Th style={{ width: 280 }}>Name</Th>
                <Th>Enroll</Th>
                <Th>Eligible Date</Th>
                <Th>Plan Status</Th>
                <Th>Terminate</Th>
                <Th>Update</Th>
              </Tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <Tr key={r.id}>
                  <Td>
                    <NameCell>
                      <Avatar
                        sx={{
                          bgcolor: "#E9ECFF",
                          color: "#6C63FF",
                          width: 38,
                          height: 38,
                          fontWeight: 600,
                          fontSize: "16px",
                        }}
                      >
                        {initials(r.name)}
                      </Avatar>
                      <NameText>
                        <span className="name">{r.name}</span>
                        <span className="email">{r.email}</span>
                      </NameText>
                    </NameCell>
                  </Td>

                  {/* Enroll: checkbox */}
                  <Td>
                    <Checkbox
                      checked={r.enroll}
                      disableRipple
                      onChange={(e) =>
                        setRow(r.id, { enroll: e.target.checked })
                      }
                      sx={{
                        color: "#6C63FF",
                        borderRadius: "5px",
                        background: "transaprent !important",
                        "&:hover": { backgroundColor: "transparent" },
                        "&.Mui-checked": { color: "#6579A8" },
                      }}
                    />
                  </Td>

                  {/* Eligible Date: select */}
                  <Td>
                    <SmallField
                      select
                      value={r.eligible}
                      onChange={(e) =>
                        setRow(r.id, { eligible: e.target.value })
                      }
                      fullWidth
                    >
                      {ELIGIBLE_OPTIONS.map((opt) => (
                        <MenuItem key={opt} value={opt}>
                          {opt}
                        </MenuItem>
                      ))}
                    </SmallField>
                  </Td>

                  {/* Plan Status */}
                  <Td>{statusView(r)}</Td>

                  {/* Terminate: X → datum */}
                  <Td>
                    {r.terminate ? (
                      <Typography sx={{ color: "#FF6161", fontSize: "12px" }}>
                        {r.terminate}
                      </Typography>
                    ) : (
                      <Tooltip title="Terminate">
                        <Button
                          size="small"
                          sx={{ padding: "0", background: "none !important" }}
                          onClick={() =>
                            setRow(r.id, { terminate: formatToday() })
                          }
                        >
                          <Box component="img" src={closeIconTerminate} />
                        </Button>
                      </Tooltip>
                    )}
                  </Td>

                  {/* Update: samo edit */}
                  <Td>
                    <Tooltip title="Edit">
                      <IconButton
                        size="small"
                        onClick={() => {
                          /* open edit modal */
                        }}
                      >
                        <Box component="img" src={editIcon} />
                      </IconButton>
                    </Tooltip>
                  </Td>
                </Tr>
              ))}
            </tbody>
          </Table>
        </TableWrap>
      </Card>
    </Container>
  );
}
