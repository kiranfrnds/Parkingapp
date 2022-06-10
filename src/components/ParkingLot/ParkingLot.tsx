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
      //write test case for this
      const id = freeParkingSlots[Math.floor(Math.random() * temp.length)].id;
      const index = temp.findIndex((i) => i.id === id);
      temp[index].carNumber = carNumber;
      temp[index].available = false;
      temp[index].startTime = new Date();
      // temp[index].spotNumber = Math.floor(Math.random() * 10000);
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
          inputProps={{ "data-testid": "parking-drawing-registration-input" }}
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
            <>
              <Card
                data-testid={"parking-drawing-space"}
                sx={{
                  width: 150,
                  height: 200,
                  margin: 3,
                  border: "solid 1px black",
                  backgroundColor: each.available ? "white" : "#5738f2",
                }}
                onClick={() => handleExit(each.id)}
              >
                <Typography
                  sx={{ textAlign: "center", marginTop: "10px" }}
                  variant="body1"
                  color="#edf7f7"
                  fontWeight="400"
                >
                  Spot Number : {each.id}
                </Typography>
                {!each.available ? (
                  <CardContent sx={{ textAlign: "center" }}>
                    <Typography
                      variant="body1"
                      color="#edf7f7"
                      fontWeight="400"
                    >
                      CarNumber:{each.carNumber}
                    </Typography>
                    {/* <Typography
                      variant="body1"
                      color="#edf7f7"
                      fontWeight="400"
                    >
                      Entry Time: {each.time.getHours()}:
                      {each.time.getMinutes()}{" "}
                      {each.time.getHours() > 12 ? "PM" : "AM"}
                    </Typography> */}
                  </CardContent>
                ) : (
                  <Typography
                    sx={{ textAlign: "center", marginTop: "10px" }}
                    variant="body1"
                    color="#edf7f7"
                    fontWeight="400"
                  >
                    {/* ID : {each.id} */}
                  </Typography>
                )}
              </Card>
            </>
          );
        })}
      </Container>
    </>
  );
};

export default ParkingLot;
