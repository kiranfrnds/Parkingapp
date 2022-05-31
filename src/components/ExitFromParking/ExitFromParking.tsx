import { Container, Box, Typography, Button } from "@mui/material";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ParkingContext } from "../../ParkingContext";

const ExitFromParking = () => {
    const navigate = useNavigate()
    const {parkingSlots, stateId} = useContext(ParkingContext)


    const handlePayNow = async (id:any) => {
      let index:any = parkingSlots.findIndex((item:any) => item.id === stateId)
        let regCarId = {
            carId:id
        }
         fetch('https://httpstat.us/200', {
            method:"POST",
            headers : {
                Accept: "application/json",
                "Content-Type":"application/json"
            },
            body: JSON.stringify(regCarId),
        }).then((data) => { (data.status === 200) ? 
          alert("Payment Successful") 
          : alert("Payment Unsuccefull")
        }).catch((err) => alert(err))
        if(index !== ""){
          parkingSlots[index].carNumber = ''
          parkingSlots[index].available = true
        }
        navigate('/slots')
    }


    let exitSlotDetails:any = parkingSlots.find((car:any) => 
        car.id === stateId
    )


    let entryHours = exitSlotDetails.time.getHours()
    let entryMinutes = exitSlotDetails.time.getMinutes()

    let currentHours = exitSlotDetails.time.getHours() + (Math.random() * 10)
    let currentMinutes = exitSlotDetails.time.getMinutes()

    let totalEntryMinutes = entryHours*60+ entryMinutes
    let totalCurrentMinutes = currentHours*60+ currentMinutes

    let totalDuration = Math.floor(totalCurrentMinutes - totalEntryMinutes)

    let totalHours = Math.round(totalDuration / 60)
    let totalMinutes = totalDuration % 60

    let totalCharge = 0

    if (totalHours <= 2){
        totalCharge = 10
    } else if(totalMinutes > 0) {
        totalCharge = totalHours * 10
    } else {
        totalCharge = (totalHours - 1) * 10
    }

  return (
    <Container>
      <Box
        sx={{
          width: 500,
          height: 500,
          padding: 10,
          border:"solid 2px blue"
        }}
      >
        <Typography>Car Number : {exitSlotDetails.carNumber }</Typography>
        <Typography>Total Duration: {totalDuration }</Typography>
        <Typography>Amount To be Paid: {totalCharge}</Typography>
        <Button variant = "contained" color = "success" onClick = {() =>handlePayNow(exitSlotDetails.id)}>Pay Now</Button>
      </Box>
    </Container>
  );
};

export default ExitFromParking;
