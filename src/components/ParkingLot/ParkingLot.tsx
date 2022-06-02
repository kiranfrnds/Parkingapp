import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ParkingContext } from "../../ParkingContext/ParkingContext";

const ParkingLot = () => {
  const [carNumber, setCarNumber] = useState<any>("");
  const { parkingSlots, setParkingSlots, setStateId } =
    useContext(ParkingContext);
  const navigate = useNavigate();

  const handleCarNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCarNumber(event.target.value);
  };

  const handleParking = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    let temp = [...parkingSlots];
    let freeParkingSlots = temp.filter((item: any) => item.available === true);

    if (freeParkingSlots.length === 0) {
      alert("Parking Slots are Full");
    } else {
      const id = freeParkingSlots[Math.floor(Math.random() * temp.length)].id;
      const index = temp.findIndex((i) => i.id === id);
      temp[index].carNumber = carNumber;
      temp[index].available = false;
      temp[index].startTime = new Date();
      setParkingSlots(temp);
      setCarNumber("");
    }
  };

  const handleExit = (id: any) => {
    setStateId(id);
    navigate("/exit");
  };

  return (
    <>
      <Container
        sx={{
          width: 600,
          height: 200,
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
          variant="h4"
          sx={{ fontWeight: 400, textAlign: "center", color: "#4e5de6" }}
        >
          Parking Lot
        </Typography>
        <TextField
          id="slots"
          label="Enter Car Number"
          variant="outlined"
          value={carNumber}
          fullWidth
          onChange={handleCarNumber}
          data-testid="parking-drawing-registration-input"
        />
        <Button
          variant="contained"
          onClick={handleParking}
          data-testid="parking-drawing-add-car-button"
          sx={{ marginTop: "20px" }}
        >
          Park
        </Button>
      </Container>
      <Container
        sx={{
          maxWidth: 600,
          maxHeight: 600,
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
          border: "1px solid black",
          borderRadius: "5px",
          marginTop: "50px",
        }}
      >
        {parkingSlots?.map((each: any) => {
          return (
            <Card
              data-testid={`parking-drawing-space-${each.id}`}
              sx={{
                width: 150,
                height: 200,
                margin: 3,
                border: "solid 1px black",
                backgroundColor: each.available ? "white" : "#5738f2",
              }}
            >
              <Typography
                variant="h6"
                textAlign="center"
                color="#edf7f7"
                fontWeight="400"
              >
                ID: {Math.floor(Math.random() * 100000)}
              </Typography>
              {!each.available ? (
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography variant="body1" color="#edf7f7" fontWeight="400">
                    Spot Number: {each.id}
                  </Typography>
                  <Typography variant="body1" color="#edf7f7" fontWeight="400">
                    CarNumber:{each.carNumber}
                  </Typography>
                  <Typography variant="body1" color="#edf7f7" fontWeight="400">
                    Time:{each.time.getHours()}
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={() => handleExit(each.id)}
                  >
                    Exit
                  </Button>
                </CardContent>
              ) : null}
            </Card>
          );
        })}
      </Container>
    </>
  );
};

export default ParkingLot;
