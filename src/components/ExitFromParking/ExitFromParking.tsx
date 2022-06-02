import { Container, Box, Typography, Button } from "@mui/material";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ParkingContext } from "../../ParkingContext/ParkingContext";

const ExitFromParking = () => {
  const navigate = useNavigate();
  const { parkingSlots, stateId } = useContext(ParkingContext);

  const handlePayNow = async (id: any) => {
    let index: any = parkingSlots.findIndex((item: any) => item.id === stateId);
    let regCarId = {
      carId: id,
    };
    fetch("https://httpstat.us/200", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(regCarId),
    })
      .then((data) => {
        data.status === 200
          ? alert("Payment Successful")
          : alert("Payment Unsuccefull");
      })
      .catch((err) => alert(err));
    if (index !== "") {
      parkingSlots[index].carNumber = "";
      parkingSlots[index].available = true;
    }
    navigate("/slots");
  };

  let exitSlotDetails: any = parkingSlots.find(
    (car: any) => car.id === stateId
  );

  let entryHours = exitSlotDetails.time.getHours();
  let entryMinutes = exitSlotDetails.time.getMinutes();

  let currentHours = exitSlotDetails.time.getHours() + Math.random() * 10;
  let currentMinutes = exitSlotDetails.time.getMinutes();

  let totalEntryMinutes = entryHours * 60 + entryMinutes;
  let totalCurrentMinutes = currentHours * 60 + currentMinutes;

  let totalDuration = Math.floor(totalCurrentMinutes - totalEntryMinutes);

  let totalHours = Math.round(totalDuration / 60);
  let totalMinutes = totalDuration % 60;

  let totalCharge = 0;

  if (totalHours <= 2) {
    totalCharge = 10;
  } else if (totalMinutes > 0) {
    totalCharge = totalHours * 10;
  } else {
    totalCharge = (totalHours - 1) * 10;
  }

  return (
    <Container
      sx={{
        width: 300,
        height: 300,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        border: "1px solid black",
        borderRadius: "5px",
        marginTop: "50px",
      }}
    >
      <Box sx={{ marginTop: "20px" }}>
        <Typography
          variant="body1"
          fontWeight="700"
          data-testid="deregister-car-registration"
        >
          Car Number : {exitSlotDetails.carNumber}
        </Typography>
        <Typography
          variant="body1"
          fontWeight="700"
          data-testid="deregister-time-spent"
        >
          Total Duration: {totalDuration}
        </Typography>
        <Typography
          variant="body1"
          fontWeight="700"
          data-testid="deregister-charge"
        >
          Amount To be Paid: {totalCharge}
        </Typography>
        <Button
          variant="contained"
          color="success"
          onClick={() => handlePayNow(exitSlotDetails.id)}
          data-testid="deregister-payment-button"
          sx={{ margin: "10px" }}
        >
          Pay Now
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate("/slots")}
        >
          Back
        </Button>
      </Box>
    </Container>
  );
};

export default ExitFromParking;
