import { useState } from "react";
import { Container, Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/system";

import dateIcon from "../../../assets/date-icon.svg";
import locationIcon from "../../../assets/location-icon.svg";
import personIcon from "../../../assets/person-ico.svg";
import editIcon from "../../../assets/edit-ico.svg";

import EditHousehold from "./EditHousehold";
import AvailablePlans from "./AvailablePlans";

const InfoBox = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "17px",
  background: "#F8F9FF",
  borderRadius: "14px",
  minHeight: "55px",
  alignItems: "center",
  padding: "0 21px",
  fontSize: "16px",
  fontWeight: "500",
  "@media(max-width: 767px)": {
    fontSize: "14px",
    minHeight: "50px",
    borderRadius: "10px",
    padding: "0 15px",
  },
}));

export default function Plans() {
  const [info, setInfo] = useState({
    year: "2025",
    zipcode: "06880",
    person: "1",
  });

  const [counts, setCounts] = useState({ shown: 0, total: 0 });

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  const handleSave = (next) => {
    setInfo(next);
    setOpen(false);
  };

  return (
    <>
      <Box sx={{ pt: "38px" }}>
        <Container>
          <Typography variant="h1" mb="11px">
            Plans Available with Salution
          </Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item size={{ xs: 12, sm: 8 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  flexWrap: { xs: "wrap", sm: "nowrap" },
                }}
              >
                <InfoBox>
                  <img src={dateIcon} alt="date" />
                  {info.year}
                </InfoBox>
                <InfoBox>
                  <img src={locationIcon} alt="location" />
                  {info.zipcode}
                </InfoBox>
                <InfoBox>
                  <img src={personIcon} alt="person" />
                  {info.person}
                </InfoBox>
                <InfoBox onClick={handleOpen} sx={{ cursor: "pointer" }}>
                  <img src={editIcon} alt="edit" />
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: "500",
                      color: "#6C63FF",
                    }}
                  >
                    Edit
                  </Typography>
                </InfoBox>
                <EditHousehold
                  open={open}
                  onClose={handleClose}
                  onSave={handleSave}
                  info={info}
                />
              </Box>
            </Grid>
            <Grid item size={{ xs: 12, sm: 4 }}>
              <Typography
                variant="body2"
                sx={{ fontWeight: "500", textAlign: "right" }}
              >
                Showing {counts.shown} out of {counts.total} available plans
              </Typography>
            </Grid>
          </Grid>
          <Box>
            <AvailablePlans onCountsChange={setCounts} />
          </Box>
        </Container>
      </Box>
    </>
  );
}
