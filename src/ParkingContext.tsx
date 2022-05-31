import React, {useState } from "react";
import { createContext } from "react";

export interface ParkingProps {
    parkingSlots : any[],
    setParkingSlots: (parkingSlots:any) => void,
    stateId:any,
    setStateId:any
}

export const ParkingContext = createContext({} as ParkingProps )

export const ParkingContextProvider = ({children}: any) => {
    const [parkingSlots, setParkingSlots] = useState<any[]>([])
    const [stateId, setStateId] = useState<any>()

    return (
        <ParkingContext.Provider value={{
            parkingSlots,
            setParkingSlots,
            stateId,
            setStateId

        }} 
        >
            {children}
        </ParkingContext.Provider>
    )
}