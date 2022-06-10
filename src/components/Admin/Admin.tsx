import React, { useState, useContext } from "react";
import { ParkingContext } from "../../ParkingContext/ParkingContext";
import { useNavigate } from "react-router-dom";
import { Button, Grid, TextField, Typography, Box } from "@mui/material";
import { Container } from "@mui/system";
import { styled } from "@mui/material/styles";

const Admin = () => {
  const [slots, setSlots] = useState<any>("");
  const { setParkingSlots } = useContext(ParkingContext);
  const navigate = useNavigate();

  const handleSlot = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSlots(event.target.value);
  };

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (isNaN(slots)) {
      alert("Please Enter Number Only");
    } else {
      let temp = [];
      for (let i = 1; i <= slots; i++) {
        let newObject = {
          id: i,
          carNumber: "",
          available: true,
          time: new Date(),
        };
        temp.push(newObject);
      }
      setParkingSlots(temp);
      navigate("./slots");
    }
  };

  return (
    <Container
      sx={{
        width: 500,
        height: 500,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        border: "1px solid black",
        borderRadius: "5px",
        marginTop: "50px",
      }}
    >
      <Typography
        variant="h2"
        sx={{ fontWeight: 400, textAlign: "center", color: "#4e5de6" }}
      >
        Admin
      </Typography>
      <TextField
        id="slots"
        label="Enter Number of Slots"
        variant="outlined"
        value={slots}
        onChange={handleSlot}
        fullWidth
        inputProps={{ "data-testid": " parking-create-text-input" }}
      />
      <Button
        variant="contained"
        onClick={handleSubmit}
        data-testid="parking-create-submit-button"
        sx={{ m: 2 }}
      >
        Submit
      </Button>
    </Container>
  );
};

export default Admin;
