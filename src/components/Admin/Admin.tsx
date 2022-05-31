import React, { useState, useContext } from "react";
import { ParkingContext } from "../../ParkingContext";
import { useNavigate } from "react-router-dom";
import { Button, Grid, TextField, Typography, Box } from "@mui/material";
import { Container } from "@mui/system";

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
    <Container>
      <Typography variant="h2" sx={{ fontWeight: "200" }}>
        Admin
      </Typography>
      <TextField
        id="slots"
        label="Enter Number of Slots"
        variant="outlined"
        value={slots}
        fullWidth
        onChange={handleSlot}
        data-testid=" parking-create-text-input"
      />
      <Button
        variant="contained"
        onClick={handleSubmit}
        data-testid="parking-create-submit-button"
        sx={{margin-top: "20px"}}
      >
        Submit
      </Button>
    </Container>
  );
};

export default Admin;
