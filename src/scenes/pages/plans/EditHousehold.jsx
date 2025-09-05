import { useState, useEffect } from "react";
import { borderRadius, color, minHeight, styled } from "@mui/system";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  FormLabel,
  Stack,
} from "@mui/material";

import closeModal from "../../../assets/close-icon-modal.svg";
import addIcon from "../../../assets/add-icon.svg";

const LabelCustom = styled(FormLabel)(({ theme }) => ({
  marginBottom: "10px",
  display: "block",
}));

const TextFieldCustom = styled(TextField)(({ theme }) => ({
  width: "100%",
  "& input": {
    background: "#fff",
    border: "none",
    borderRadius: "5px",
    color: "#465578",
    minHeight: "50px",
    padding: "0 15px !important",
    paddingLeft: "17px !important",
  },
  "& fieldset": {
    border: "none",
  },
  '& input[type="number"]::-webkit-outer-spin-button, & input[type="number"]::-webkit-inner-spin-button':
    {
      WebkitAppearance: "none",
      margin: 0,
    },
}));

const ButtonAdd = styled(Button)(({ theme }) => ({
  backgroundColor: "rgba(108, 99, 255, 0.1)",
  border: "1px solid #EBEBFF !important",
  padding: "0 !important",
  minHeight: "50px",
  display: "flex",
  alignItems: "center",
  gap: "10px",
  "&:hover": {
    backgroundColor: "transparent",
  },
}));

const ButtonClose = styled(Button)(({ theme }) => ({
  position: "absolute",
  right: "17px",
  top: "50%",
  transform: "translateY(-50%)",
  padding: "0",
  minWidth: "auto",
}));

export default function EditHousehold({ open, onClose, info, onSave }) {
  const [form, setForm] = useState({
    ...info,
    person: "",
    myAge: "",
    spouseAge: "",
    children: [],
  });
  const [visibleSpouse, setVisibleSpouse] = useState(false);

  const handleValue = (name) => (e) => {
    const val = e.target.value;
    setForm((prev) => ({ ...prev, [name]: val }));
  };

  const handleSpouse = () => {
    setVisibleSpouse((prev) => !prev);
  };

  const handleHideSpouse = () => {
    setVisibleSpouse((prev) => !prev);
    setForm((prev) => ({ ...prev, spouseAge: "" }));
  };

  const handleChild = () => {
    setForm((prev) => ({ ...prev, children: [...prev.children, ""] }));
  };

  const handleUpdateChild = (index) => (e) => {
    const value = e.target.value;
    setForm((prev) => {
      const children = [...(prev.children || [])];

      children[index] = value;

      return { ...prev, children };
    });
  };

  const handleRemoveChild = (index) => {
    setForm((prev) => {
      const children = [...(prev.children || [])];

      children.splice(index, 1);

      return { ...prev, children };
    });
  };

  const handleSubmit = () => {
    onSave(form);
    onClose();
  };

  useEffect(() => {
    const my = String(form.myAge ?? "").trim() !== "" ? 1 : 0;
    const spouse =
      visibleSpouse && String(form.spouseAge ?? "").trim() !== "" ? 1 : 0;
    const kids = (form.children || []).filter(
      (v) => String(v ?? "").trim() !== ""
    ).length;

    const total = my + spouse + kids;
    setForm((prev) => ({ ...prev, person: String(total) }));
  }, [form.myAge, form.spouseAge, form.children, visibleSpouse]);

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            outline: "none !important",
            bgcolor: "#F8F9FF",
            maxWidth: "100%",
            width: { xs: "90%", sm: "656px" },
            borderRadius: { xs: "20px", sm: "30px" },
            padding: { xs: "20px", sm: "32px" },
            paddingRight: { xs: "15px", sm: "27px" },
            margin: "0 auto",
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Box
            sx={{
              maxHeight: { xs: "70vh", sm: "650px" },
              overflowY: "auto",
              paddingRight: "5px",
            }}
            aria-label="max-height"
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h3">Edit Household</Typography>
              <Button
                onClick={onClose}
                disableRipple
                sx={{ padding: 0, background: "none", minWidth: "auto" }}
              >
                <img src={closeModal} alt="close" />
              </Button>
            </Box>
            <Box
              component="form"
              sx={{
                mt: "32px",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              <FormControl fullWidth>
                <LabelCustom>Plan Year</LabelCustom>
                <TextFieldCustom
                  value={form.year ?? ""}
                  onChange={handleValue("year")}
                  type="number"
                  onInput={(e) => {
                    e.target.value = Math.max(0, parseInt(e.target.value))
                      .toString()
                      .slice(0, 4);
                  }}
                />
              </FormControl>
              <FormControl fullWidth>
                <LabelCustom>Location (Zip Code)</LabelCustom>
                <TextFieldCustom
                  value={form.zipcode ?? ""}
                  onChange={handleValue("zipcode")}
                  type="number"
                  onInput={(e) => {
                    e.target.value = Math.max(0, parseInt(e.target.value))
                      .toString()
                      .slice(0, 6);
                  }}
                />
              </FormControl>
              <Typography
                variant="h4"
                sx={{
                  fontSize: "18px",
                  fontWeight: "600",
                  marginBottom: "-8px",
                }}
              >
                My Household
              </Typography>
              <FormControl fullWidth>
                <LabelCustom>My Age</LabelCustom>
                <TextFieldCustom
                  type="number"
                  value={form.myAge}
                  onInput={(e) => {
                    e.target.value = Math.max(0, parseInt(e.target.value))
                      .toString()
                      .slice(0, 2);
                  }}
                  onChange={handleValue("myAge")}
                />
              </FormControl>
              <FormControl fullWidth>
                <LabelCustom>Spouse Age</LabelCustom>
                {visibleSpouse ? (
                  <>
                    <Box sx={{ position: "relative" }}>
                      <TextFieldCustom
                        type="number"
                        value={form.spouseAge}
                        onChange={handleValue("spouseAge")}
                        onInput={(e) => {
                          e.target.value = Math.max(0, parseInt(e.target.value))
                            .toString()
                            .slice(0, 2);
                        }}
                      />
                      <ButtonClose onClick={handleHideSpouse}>
                        <img src={closeModal} alt="close" />
                      </ButtonClose>
                    </Box>
                  </>
                ) : (
                  <ButtonAdd onClick={handleSpouse}>
                    <img src={addIcon} alt="add" /> Add Spouse
                  </ButtonAdd>
                )}

                <Box></Box>
              </FormControl>
              <FormControl fullWidth>
                {form.children.length > 0
                  ? form.children.map((curr, index) => (
                      <FormControl key={index}>
                        <LabelCustom>Child {index + 1} Age </LabelCustom>
                        <Box
                          sx={{
                            position: "relative",
                            marginBottom: "20px",
                            "&:not(:first-of-type)": {
                              marginBottom: "10px !important",
                            },
                          }}
                        >
                          <TextFieldCustom
                            type="number"
                            onChange={handleUpdateChild(index)}
                            value={curr}
                            onInput={(e) => {
                              e.target.value = Math.max(
                                0,
                                parseInt(e.target.value)
                              )
                                .toString()
                                .slice(0, 2);
                            }}
                          />
                          <ButtonClose onClick={() => handleRemoveChild(index)}>
                            <img src={closeModal} alt="close" />
                          </ButtonClose>
                        </Box>
                      </FormControl>
                    ))
                  : ""}
                <ButtonAdd onClick={handleChild} sx={{ marginTop: "10px" }}>
                  <img src={addIcon} alt="add" /> Add Child
                </ButtonAdd>
              </FormControl>
              <Stack direction="row" gap="10px">
                <Button
                  onClick={onClose}
                  sx={{
                    flexBasis: "50%",
                    padding: "0",
                    minHeight: "50px",
                    borderRadius: "5px",
                    background: "#fff",
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmit}
                  sx={{
                    flexBasis: "50%",
                    padding: "0",
                    minHeight: "50px",
                    borderRadius: "5px",
                    background:
                      "linear-gradient(90deg, rgba(134,168,255,1) 0%, rgba(108,99,255,1) 100%)",
                    color: "#fff",
                  }}
                >
                  Save
                </Button>
              </Stack>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
