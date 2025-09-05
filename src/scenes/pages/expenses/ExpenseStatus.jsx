import * as React from "react";
import { Box, Card, Typography, Divider } from "@mui/material";

export default function ExpenseStatus() {
  // Demo podaci (možeš ih puniti iz API-ja)
  const items = [
    {
      name: "Bojan S.",
      amount: "$123.00",
      serviceDate: "Jun 01, 25",
      submissionDate: "Jun 05, 25",
      status: "Pending Approval",
      nextAmount: "$0.00",
      nextDate: "Jun 03, 25",
      totalSoFar: "$0.00",
      remaining: "$123.00",
    },
    {
      name: "Bojan S.",
      amount: "$123.00",
      serviceDate: "Jun 01, 25",
      submissionDate: "Jun 05, 25",
      status: "Approval Granted",
      nextAmount: "$0.00",
      nextDate: "Jun 03, 25",
      totalSoFar: "$0.00",
      remaining: "$121.00",
    },
    {
      name: "Bojan S.",
      amount: "$123.00",
      serviceDate: "Jun 01, 25",
      submissionDate: "Jun 05, 25",
      status: "Approval Not Granted",
      nextAmount: "$0.00",
      nextDate: "Jun 03, 25",
      totalSoFar: "$0.00",
      remaining: "$123.00",
    },
    ...Array.from({ length: 10 }, () => ({
      name: "Bojan S.",
      amount: "$123.00",
      serviceDate: "Jun 01, 25",
      submissionDate: "Jun 05, 25",
      status: "Pending Approval",
      nextAmount: "$0.00",
      nextDate: "Jun 03, 25",
      totalSoFar: "$0.00",
      remaining: "$123.00",
    })),
  ];

  const scrollerRef = React.useRef(null);
  const drag = React.useRef({ active: false, startX: 0, scrollLeft: 0 });

  const onPointerDown = (e) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.setPointerCapture?.(e.pointerId);
    drag.current = {
      active: true,
      startX: e.clientX,
      scrollLeft: el.scrollLeft,
    };
    el.style.cursor = "grabbing";
    el.style.userSelect = "none";
  };

  const onPointerMove = (e) => {
    const el = scrollerRef.current;
    if (!el || !drag.current.active) return;
    const dx = e.clientX - drag.current.startX;
    el.scrollLeft = drag.current.scrollLeft - dx;
  };

  const onPointerUp = (e) => {
    const el = scrollerRef.current;
    if (!el) return;
    drag.current.active = false;
    el.style.cursor = "grab";
    el.style.userSelect = "";
    try {
      el.releasePointerCapture?.(e.pointerId);
    } catch {}
  };

  const statusStyles = (status) => {
    if (status === "Pending Approval") {
      return {
        color: "#FF8C00",
        backgroundColor: "#FFE8CC",
        border: "1px solid #FFE8CC",
      };
    }
    if (status === "Approval Granted") {
      return {
        color: "#1FD25E",
        backgroundColor: "#D0F9DF",
        border: "1px solid #D0F9DF",
      };
    }
    return {
      color: "#FF6161",
      backgroundColor: "#FFE4E7",
      border: "1px solid #FFE4E7",
    };
  };

  return (
    <Box
      ref={scrollerRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
      sx={{
        "--gap": { xs: "10px", sm: "20px" },
        "--visible": { xs: 1.1, sm: 2.5, md: 3.2 },

        display: "grid",
        gap: "var(--gap)",

        gridAutoFlow: { xs: "row", sm: "column" },
        gridTemplateColumns: { xs: "1fr", sm: "unset" },
        gridAutoColumns: {
          xs: "unset",
          sm: "calc((100% - (var(--gap) * (var(--visible) - 1))) / var(--visible))",
        },

        overflowX: { xs: "hidden", sm: "auto" },
        overflowY: { xs: "visible", sm: "hidden" },

        pb: { xs: 0, sm: "27px" },
        cursor: { xs: "auto", sm: "grab" },
        marginRight: { xs: 0, sm: 0 },

        "& > *": { width: { xs: "100%", sm: "auto" } },

        scrollbarGutter: "stable",
        scrollbarWidth: { sm: "thin" },
        scrollbarColor: { sm: "#6C63FF #E2E0FF" },
        "&::-webkit-scrollbar": { height: { sm: 8 } },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: { sm: "#6C63FF" },
          borderRadius: { sm: 8 },
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: { sm: "#E2E0FF" },
          borderRadius: { sm: 8 },
        },
      }}
    >
      {items.map((it, idx) => (
        <Card
          key={idx}
          variant="outlined"
          sx={{
            p: "17px 19px",
            borderRadius: "16px",
            backgroundColor: "#F8F9FF",
            border: "none",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: "10px",
              alignItems: "center",
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontSize: "24px !important",
              }}
              fontWeight={600}
            >
              {it.name}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontSize: "24px !important",
              }}
              fontWeight={600}
            >
              {it.amount}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr auto",
              rowGap: { xs: "5px", sm: "10px" },
              columnGap: "8px",
              mb: "10px",
            }}
          >
            <Typography variant="caption" color="#6579A8">
              Service Date
            </Typography>
            <Typography variant="caption" color="#6579A8">
              {it.serviceDate}
            </Typography>

            <Typography variant="caption" color="#6579A8">
              Submission Date
            </Typography>
            <Typography variant="caption" color="#6579A8">
              {it.submissionDate}
            </Typography>
          </Box>

          <Box
            sx={{
              ...statusStyles(it.status),
              fontSize: 12,
              fontWeight: 500,
              px: "15px",
              py: "5px",
              borderRadius: "6px",
              width: "100%",
              mb: "21px",
            }}
          >
            {it.status}
          </Box>

          <Divider sx={{ mb: "20px" }} />

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr auto",
              rowGap: "10px",
              columnGap: "8px",
            }}
          >
            <Typography sx={{ fontSize: "12px", color: "#6579A8" }}>
              Next Reimbursement Amount
            </Typography>
            <Typography
              sx={{ fontSize: "12px", textAlign: "right", color: "#6579A8" }}
            >
              {it.nextAmount}
            </Typography>

            <Typography sx={{ fontSize: "12px", color: "#6579A8" }}>
              Next Reimbursement Date
            </Typography>
            <Typography
              sx={{ fontSize: "12px", textAlign: "right", color: "#6579A8" }}
            >
              {it.nextDate}
            </Typography>

            <Typography sx={{ fontSize: "12px", color: "#6579A8" }}>
              Total Reimbursement So Far
            </Typography>
            <Typography
              sx={{ fontSize: "12px", textAlign: "right", color: "#6579A8" }}
            >
              {it.totalSoFar}
            </Typography>

            <Typography sx={{ fontSize: "12px", color: "#6579A8" }}>
              Remaining Unpaid Amount
            </Typography>
            <Typography
              sx={{ fontSize: "12px", textAlign: "right", color: "#6579A8" }}
            >
              {it.remaining}
            </Typography>
          </Box>
        </Card>
      ))}
    </Box>
  );
}
