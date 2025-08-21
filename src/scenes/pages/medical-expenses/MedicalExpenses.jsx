import { useState, useMemo, useRef } from "react";

import {
  Box,
  Container,
  Typography,
  TextField,
  IconButton,
  Button,
  Chip,
  Tooltip,
  InputAdornment,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

import csvIcon from "../../../assets/csv-icon.svg";
import accessIcon from "../../../assets/access-icon.svg";
import noAccessIcon from "../../../assets/no-access-icon.svg";
import searchIcon from "../../../assets/search-icon.svg";
import copyIcon from "../../../assets/copy-icon.svg";

const Card = styled(Box)({
  background: "#F8F9FF",
  borderRadius: "20px",
  padding: "28px",
  marginTop: "30px",
  "@media(max-width: 767px)": {
    padding: "28px 20px",
  },
});

const Toolbar = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  alignItems: "center",
  "@media(max-width: 767px)": {
    flexDirection: "column",
  },
});

const Pills = styled(Box)({
  display: "flex",
  background: "linear-gradient(130deg, #F2F5FF, #F1F1FF)",
  borderRadius: "10px",
  "@media(max-width: 767px)": {
    overflowX: "auto",
    width: "100%",
  },
});

const Pill = styled(Button)({
  borderRadius: "14px",
  padding: "6px 15px",
  fontWeight: 400,
  minHeight: "50px",
  color: "#465578",
  boxShadow: "none",
  "&.active": {
    background: "linear-gradient(70deg, #7FC2FF, #6C63FF)",
    color: "#fff",
  },
  "@media(max-width: 767px)": {
    minWidth: "135px",
    fontSize: "12px",
    "&:first-of-type": {
      minWidth: "80px",
    },
    "&:nth-child(7)": {
      minWidth: "80px",
    },
    "&:nth-child(6)": {
      minWidth: "100px",
    },
    "&:nth-child(4)": {
      minWidth: "100px",
    },
  },
});

const SearchField = styled(TextField)({
  flex: "1",
  "& .MuiOutlinedInput-root": {
    background: "#fff",
    outline: "none !important",
    borderColor: "red",
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
  "@media(max-width:767px)": {
    order: "-1",
    width: "100%",
  },
});

const TableWrap = styled("div")({
  marginTop: 14,
  overflowX: "auto",
  overflowY: "auto",
  maxHeight: 515,
  position: "relative",

  "--w-copy": "60px",
  "--w-search": "60px",

  paddingRight: 12,
  paddingBottom: "10px",
  scrollbarGutter: "stable",

  "&::-webkit-scrollbar": {
    width: 10,
    height: 10,
    backgroundColor: "transparent",
  },
  "&::-webkit-scrollbar-track, &::-webkit-scrollbar-track:vertical, &::-webkit-scrollbar-track:horizontal, &::-webkit-scrollbar-track-piece":
    {
      backgroundColor: "#F8F9FF",
      borderRadius: 8,
    },
  "&::-webkit-scrollbar-thumb": {
    background: "#DCDBFF",
    borderRadius: 8,
    border: "2px solid transparent",
    backgroundClip: "content-box",
  },
  "&::-webkit-scrollbar-thumb:hover, &::-webkit-scrollbar-thumb:active": {
    background: "#6C63FF",
    border: "2px solid transparent",
  },
  "&::-webkit-scrollbar-corner": {
    backgroundColor: "#DCDBFF",
  },

  scrollbarWidth: "thin",
  scrollbarColor: "#6C63FF #DCDBFF",
});

const Table = styled("table")({
  width: "100%",
  tableLayout: "fixed",
  borderCollapse: "separate",
  borderSpacing: "0 10px",
  minWidth: 1400,
});

const Tr = styled("tr")({});

const Th = styled("th")({
  color: "#6579A8",
  fontWeight: 400,
  fontSize: "12px",
  padding: "0 5px 6px",
  textAlign: "center",
});

const Td = styled("td")({
  background: "#fff",
  padding: "11px 5px",
  fontSize: "12px !important",
  color: "#6579A8",
  verticalAlign: "middle",
  textAlign: "center",
  "&:first-of-type": {
    borderTopLeftRadius: "10px",
    borderBottomLeftRadius: "10px",
  },
  "&:last-of-type": {
    borderTopRightRadius: "10px",
    borderBottomRightRadius: "10px",
  },
});

const ThStickyRight = styled(Th)({
  position: "sticky",
  right: 0,
  zIndex: 3,
  background: "#F8F9FF",
  "@media(max-width: 767px)": {
    position: "relative",
  },
});
const TdStickyRight = styled(Td)({
  position: "sticky",
  right: 0,
  zIndex: 2,
  background: "#fff",
  "@media(max-width: 767px)": {
    position: "relative",
  },
});

const ThStickyRight2 = styled(Th)({
  position: "sticky",
  right: "var(--w-copy)",
  zIndex: 3,
  background: "#F8F9FF",
  "@media(max-width: 767px)": {
    position: "relative",
  },
});
const TdStickyRight2 = styled(Td)({
  position: "sticky",
  right: "var(--w-copy)",
  zIndex: 2,
  background: "#fff",
  "@media(max-width: 767px)": {
    right: "0",
    position: "relative",
  },
});

const NameCell = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: 2,
  "& .name": {
    fontSize: "12px",
    lineHeight: 1.2,
  },
  "& .email": { fontSize: "12px" },
});

const Truncate = styled("div")({
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  fontSize: "12px",
});

const escapeCsv = (s = "") =>
  /[",\n]/.test(s) ? `"${String(s).replace(/"/g, '""')}"` : s;

const parseDMY = (str) => {
  const [dd, mm, yyyy] = str.split(".").map((x) => parseInt(x, 10));
  return new Date(yyyy, mm - 1, dd);
};

const today = () => {
  const d = new Date();
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
};

const isInRange = (dateStr, rangeKey) => {
  if (rangeKey === "ALL") return true;
  const d = parseDMY(dateStr);
  const t = today();

  const msInDay = 24 * 60 * 60 * 1000;
  const withinDays = (n) => t - d <= n * msInDay && d <= t;

  switch (rangeKey) {
    case "TODAY":
      return d.getTime() === t.getTime();
    case "LAST_2_DAYS":
      return withinDays(2);
    case "LAST_7_DAYS":
      return withinDays(7);
    case "LAST_MONTH": {
      const past = new Date(t);
      past.setMonth(past.getMonth() - 1);
      return d >= past && d <= t;
    }
    case "LAST_2_MONTHS": {
      const past = new Date(t);
      past.setMonth(past.getMonth() - 2);
      return d >= past && d <= t;
    }
    case "LAST_YEAR": {
      const past = new Date(t);
      past.setFullYear(past.getFullYear() - 1);
      return d >= past && d <= t;
    }
    default:
      return true;
  }
};

function exportCsv(rows) {
  const header = [
    "ID",
    "Entered",
    "Submitted",
    "Plan",
    "Access",
    "Name",
    "Employer",
    "Payroll ID",
    "Date of service",
    "Premium",
    "Taxable",
    "Premium Status",
    "Status",
    "Device",
    "Receipt",
  ];
  const body = rows.map((r) => [
    r.id,
    r.entered,
    r.submitted,
    r.plan,
    r.access ? "Yes" : "No",
    `${r.firstName} ${r.lastName} <${r.email}>`,
    r.employer,
    r.payrollId,
    r.serviceDate,
    r.premium,
    r.taxable,
    r.premiumStatus,
    r.status,
    r.device,
    r.receipt,
  ]);
  const csv = [header, ...body]
    .map((a) => a.map(escapeCsv).join(","))
    .join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "medical-expenses.csv";
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 0);
}

const seed = [
  {
    id: "EXP-200101",
    entered: "03.03.2025",
    submitted: "02.03.2025",
    plan: "QSEHRA",
    access: true,
    firstName: "Jane",
    lastName: "Austen",
    email: "jane@mydesk.com",
    employer: "CO0253 Company_Dedicated7963485415",
    payrollId: "765786444",
    serviceDate: "01.02.2025",
    premium: "Yes",
    taxable: "No",
    premiumStatus: "02.03.2025",
    status: "Pending",
    device: "Macbook",
    receipt: "IMG_0235.jpg",
  },
  {
    id: "EXP-200102",
    entered: "03.03.2025",
    submitted: "02.03.2025",
    plan: "QSEHRA",
    access: false,
    firstName: "John",
    lastName: "Smith",
    email: "john@mydesk.com",
    employer: "CO0391 Company_Dedicated7981634618",
    payrollId: "761889246",
    serviceDate: "08.02.2025",
    premium: "No",
    taxable: "Yes",
    premiumStatus: "—",
    status: "Approved",
    device: "Windows",
    receipt: "2025-02-08.pdf",
  },
  {
    id: "EXP-200103",
    entered: "02.03.2025",
    submitted: "28.02.2025",
    plan: "ICHRA",
    access: true,
    firstName: "Mary",
    lastName: "Jones",
    email: "mary@mydesk.com",
    employer: "CO0159 Company_Dedicated7934613681",
    payrollId: "740735844",
    serviceDate: "02.02.2025",
    premium: "Yes",
    taxable: "No",
    premiumStatus: "02.03.2025",
    status: "Pending",
    device: "Macbook",
    receipt: "IMG_1122.jpg",
  },
];
const demoRows = Array.from({ length: 14 }).map((_, i) => {
  const b = seed[i % seed.length];
  return {
    ...b,
    id: `EXP-${200101 + i}`,
    payrollId: String(Number(b.payrollId) + i),
  };
});

const RANGES = [
  { key: "TODAY", label: "Today" },
  { key: "LAST_2_DAYS", label: "Last Two Days" },
  { key: "LAST_7_DAYS", label: "Last Seven Days" },
  { key: "LAST_MONTH", label: "Last Month" },
  { key: "LAST_2_MONTHS", label: "Last Two Months" },
  { key: "LAST_YEAR", label: "Last Year" },
  { key: "ALL", label: "All" },
];

export default function MedicalExpenses() {
  const [rows, setRows] = useState(demoRows);
  const [activeRange, setActiveRange] = useState("ALL");
  const [q, setQ] = useState("");
  const [copied, setCopied] = useState(null);
  const searchRef = useRef(null);

  const filtered = useMemo(() => {
    const rangeFiltered = rows.filter((r) =>
      isInRange(r.submitted, activeRange)
    );
    if (!q.trim()) return rangeFiltered;
    const needle = q.toLowerCase();
    return rangeFiltered.filter((r) =>
      [
        r.id,
        r.firstName,
        r.lastName,
        r.email,
        r.employer,
        r.payrollId,
        r.status,
        r.device,
        r.plan,
        r.receipt,
      ]
        .join(" ")
        .toLowerCase()
        .includes(needle)
    );
  }, [rows, activeRange, q]);

  const copyId = async (id) => {
    try {
      await navigator.clipboard.writeText(id);
      setCopied(id);
      setTimeout(() => setCopied(null), 1000);
    } catch {}
  };

  const toggleAccess = (id) =>
    setRows((rs) =>
      rs.map((r) => (r.id === id ? { ...r, access: !r.access } : r))
    );

  const searchThisRow = (r) => {
    setQ(r.id);

    requestAnimationFrame(() =>
      searchRef.current?.querySelector("input")?.focus()
    );
  };

  return (
    <Container sx={{ py: 3, maxWidth: "1200px !important" }}>
      <Card>
        <Typography
          variant="h3"
          sx={{ color: "#465578", fontWeight: 600, mb: "15px" }}
        >
          Expenses
        </Typography>

        <Toolbar>
          <Pills>
            {RANGES.map(({ key, label }) => (
              <Pill
                key={key}
                className={activeRange === key ? "active" : ""}
                onClick={() => setActiveRange(key)}
              >
                {label}
              </Pill>
            ))}
          </Pills>

          <SearchField
            ref={searchRef}
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
        </Toolbar>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #ACBEE8",
            paddingBottom: "17px",
            marginTop: "19px",
          }}
        >
          <Typography sx={{ color: "#6579A8" }}>
            Click on column header for sorting and filtering
          </Typography>
          <Button
            onClick={() => exportCsv(filtered)}
            sx={{
              padding: "0",
              fontWeight: 500,
              color: "#465578",
              backgroundColor: "transparent",
              display: "flex",
              gap: "8px",
              justifyContent: "flex-end",
              alignItems: " center",
              transition: "all .2s ease",
              "&:hover": {
                opacity: ".7",
              },
            }}
          >
            <Box component="img" src={csvIcon} />
            <Typography
              sx={{
                fontWeight: 500,
                display: { xs: "none", sm: "inline-block" },
              }}
            >
              Export to CSV
            </Typography>
          </Button>
        </Box>
        <Box
          sx={{
            position: "relative",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              right: 10,
              width: 12,
              height: "100%",
              background: "#F8F9FF",
              pointerEvents: "none",
              zIndex: 1,
              "@media(max-width: 767px)": {
                display: "none",
              },
            },
          }}
        >
          <TableWrap>
            <Table>
              <colgroup>
                <col style={{ width: 100 }} /> {/* Entered */}
                <col style={{ width: 75 }} /> {/* Submitted */}
                <col style={{ width: 75 }} /> {/* Plan */}
                <col style={{ width: 74 }} /> {/* Access */}
                <col style={{ width: 140 }} /> {/* Name+Email */}
                <col style={{ width: 300 }} /> {/* Employer */}
                <col style={{ width: 75 }} /> {/* Payroll ID */}
                <col style={{ width: 120 }} /> {/* Date of service */}
                <col style={{ width: 75 }} /> {/* Premium */}
                <col style={{ width: 75 }} /> {/* Taxable */}
                <col style={{ width: 110 }} /> {/* Premium Status */}
                <col style={{ width: 100 }} /> {/* Status */}
                <col style={{ width: 80 }} /> {/* Device */}
                <col style={{ width: 110 }} /> {/* Receipt */}
                <col style={{ width: "var(--w-search)" }} /> {/* Search */}
                <col style={{ width: "var(--w-copy)" }} /> {/* Copy ID */}
              </colgroup>

              <thead>
                <Tr>
                  <Th>Entered</Th>
                  <Th>Submitted</Th>
                  <Th>Plan</Th>
                  <Th>Access</Th>
                  <Th>Name</Th>
                  <Th>Employer</Th>
                  <Th>Payroll&nbsp;ID</Th>
                  <Th>Date of service</Th>
                  <Th>Premium</Th>
                  <Th>Taxable</Th>
                  <Th>Premium&nbsp;Status</Th>
                  <Th>Status</Th>
                  <Th>Device</Th>
                  <Th>Receipt</Th>
                  <ThStickyRight2>Search</ThStickyRight2>
                  <ThStickyRight>Copy&nbsp;ID</ThStickyRight>
                </Tr>
              </thead>

              <tbody>
                {filtered.map((r) => (
                  <Tr key={r.id}>
                    <Td>{r.entered}</Td>
                    <Td>{r.submitted}</Td>
                    <Td>{r.plan}</Td>
                    <Td>
                      <Tooltip title={r.access ? "Has access" : "No access"}>
                        <IconButton
                          size="small"
                          onClick={() => toggleAccess(r.id)}
                        >
                          {r.access ? (
                            <Box
                              sx={{ width: "20px" }}
                              component="img"
                              src={accessIcon}
                            />
                          ) : (
                            <Box
                              sx={{ width: "20px" }}
                              component="img"
                              src={noAccessIcon}
                            />
                          )}
                        </IconButton>
                      </Tooltip>
                    </Td>
                    <Td>
                      <NameCell>
                        <span className="name">
                          {r.firstName} {r.lastName}
                        </span>
                        <span className="email">{r.email}</span>
                      </NameCell>
                    </Td>
                    <Td>
                      <Truncate>{r.employer}</Truncate>
                    </Td>
                    <Td>{r.payrollId}</Td>
                    <Td>{r.serviceDate}</Td>
                    <Td>{r.premium}</Td>
                    <Td>{r.taxable}</Td>
                    <Td>{r.premiumStatus}</Td>
                    <Td>{r.status === "Approved" ? "Approval" : "Pending"}</Td>
                    <Td>{r.device}</Td>
                    <Td>
                      <Truncate>{r.receipt}</Truncate>
                    </Td>

                    {/* sticky: SEARCH */}
                    <TdStickyRight2>
                      <Tooltip title="Search this row">
                        <Box
                          onClick={() => searchThisRow(r)}
                          component="img"
                          src={searchIcon}
                          sx={{ cursor: "pointer" }}
                        />
                      </Tooltip>
                    </TdStickyRight2>

                    {/* sticky: COPY ID */}
                    <TdStickyRight>
                      <Tooltip title={copied === r.id ? "Copied!" : "Copy ID"}>
                        <Box
                          component="img"
                          src={copyIcon}
                          onClick={() => copyId(r.id)}
                          sx={{ cursor: "pointer" }}
                        />
                      </Tooltip>
                    </TdStickyRight>
                  </Tr>
                ))}
              </tbody>
            </Table>
          </TableWrap>
        </Box>
      </Card>
    </Container>
  );
}
