import { Button, Card, CardContent, TextField, Typography} from '@mui/material'
import { Box } from '@mui/system';
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ParkingContext } from '../../ParkingContext';

const ParkingLot = () => {
  const [carNumber, setCarNumber] = useState<any>('')
  const {parkingSlots, setParkingSlots, setStateId} = useContext(ParkingContext)
  const navigate = useNavigate()

  const handleCarNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCarNumber(event.target.value);
  };

  const handleParking = (event:React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        let temp = [...parkingSlots]
        let freeParkingSlots = temp.filter((item:any) => item.available === true)

        if (freeParkingSlots.length === 0){
          alert('Parking Slots are Full')
        } else {
          const id = freeParkingSlots[Math.floor(Math.random() * temp.length)].id
          const index = temp.findIndex((i) => i.id === id)
          temp[index].carNumber = carNumber
          temp[index].available = false
          temp[index].startTime = new Date()
          setParkingSlots(temp)
          setCarNumber('')
        }
  }
 
  const handleExit = (id:any) => {
      setStateId(id)
      navigate('/exit')
  }
  

  return (
    <>
      <Box sx={{
        margin:2
      }}>
        <TextField 
            id="slots" 
            label="Enter Car Number" 
            variant="outlined"
            value={carNumber} 
            fullWidth
            onChange={handleCarNumber}
            data-testid = 'parking-drawing-registration-input'   
        />
        <Button variant="contained" onClick={handleParking} data-testid = 'parking-drawing-add-car-button'>
            Park
        </Button>
      </Box>
      <Box>
      {parkingSlots.map((each:any) => {
        return (
          <Card sx={{ 
            maxWidth: 150, 
            height: 150 , 
            margin:5, 
            border:"solid 1px black",
            }}
          >
            <Typography >
                  ID: {Math.floor(Math.random()*100000)}
            </Typography>
            {!each.available ? (
              <CardContent>
                <Typography >
                  Spot Number: {each.id}
                </Typography>
                <Typography >
                  CarNumber:{each.carNumber}
                </Typography>
                <Typography >
                  Time:{each.time.getHours()}
                </Typography>
                <Button variant="contained" onClick={() => handleExit(each.id)}>
                  Exit
                </Button>
              </CardContent>
            ):null}
          </Card>
        )
      })}
      </Box>
    </>  
  )
}

export default ParkingLot