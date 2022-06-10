/* eslint-disable jest/valid-expect-in-promise */
import { fireEvent, render, screen } from "@testing-library/react";
import { ParkingContext } from "../../ParkingContext/ParkingContext";
import ExitFromParking from "../ExitFromParking/ExitFromParking";

const data = [
  {
    id: 1,
    carNumber: "KA-01-AA-1235",
    time: new Date(),
    available: false,
  },
];

const value = {
  parkingSlots: data,
  stateId: "1",
  setParkingSlots: jest.fn(),
  setStateId: jest.fn(),
};

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

async function Payment(carNumber: string) {
  try {
    const result = await fetch(`https://httpstat.us/200`);
    const data = await result.json();
    return data.status === 200;
  } catch (err) {
    return null;
  }
}

describe("ExitFromParking", () => {
  beforeAll(() => {
    jest.spyOn(window, "alert").mockImplementationOnce(() => {});
    jest.spyOn(console, "error").mockImplementationOnce(() => {});
  });

  it("snap shot test render", () => {
    const { container } = render(
      <ParkingContext.Provider value={value}>
        <ExitFromParking />
      </ParkingContext.Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it("makes payment", async () => {
    render(
      <ParkingContext.Provider value={value}>
        <ExitFromParking />
      </ParkingContext.Provider>
    );
    const carNumber = "KA-01-AA-1235";
    const button = screen.getByText("Pay Now");
    fireEvent.click(button);
    const result = await Payment(carNumber);
    expect(window.alert).toHaveBeenCalledWith("Payment Successful");
  });

  // it("empty parking slot available after payment", async () => {
  //   render(
  //     <ParkingContext.Provider value={value}>
  //       <ExitFromParking />
  //     </ParkingContext.Provider>
  //   );
  //   const carNumber = "KA-01-AA-1235";
  //   const button = screen.getByText("Pay Now");
  //   fireEvent.click(button);
  //   const result = await Payment(carNumber);
  //   expect(window.alert).toHaveBeenCalledWith("Payment Successful");
  //   expect(value.parkingSlots[0].carNumber).toBe("");
  //   expect(value.parkingSlots[0].available).toBe(true);
  // });

  it("car number is empty after payment", async () => {
    render(
      <ParkingContext.Provider value={value}>
        <ExitFromParking />
      </ParkingContext.Provider>
    );
    const carNumber = " ka-01-aa-1235";
    const button = screen.getByText("Pay Now");
    fireEvent.click(button);
    const result = await Payment(carNumber);
    expect(window.alert).toHaveBeenCalledWith("Payment Successful");
    expect(value.parkingSlots[0].carNumber).toBe("");
    expect(value.parkingSlots[0].available).toBe(true);
  });

  it("after succesful payment navigate to slots", async () => {
    render(
      <ParkingContext.Provider value={value}>
        <ExitFromParking />
      </ParkingContext.Provider>
    );
    const carNumber = "KA-01-AA-1235";
    const button = screen.getByText("Pay Now");
    fireEvent.click(button);
    const result = await Payment(carNumber);
    expect(mockedUsedNavigate).toHaveBeenCalledWith("/slots");
  });
});
//////////////////////////////

// describe("ExitFromParking", () => {
//   it("should render", () => {
//     const { asFragment } = render(<ExitFromParking />);
//     expect(asFragment()).toMatchSnapshot();
//   });
//   it("should render total duration", () => {
//     render(<ExitFromParking />);
//     const totalDuration = screen.getByTestId("deregister-time-spent");
//     expect(totalDuration).toBeInTheDocument();
//   });
//   it("should render total charge", () => {
//     render(<ExitFromParking />);
//     const totalDuration = screen.getByTestId("deregister-charge");
//     expect(totalDuration).toBeInTheDocument();
//   });
//   it("should render payment button", () => {
//     render(<ExitFromParking />);
//     const button = screen.getByTestId("deregister-payment-button");
//     expect(button).toBeInTheDocument();
//   });
//   it("should render back button", () => {
//     render(<ExitFromParking />);
//     const button = screen.getByTestId("deregister-back-button");
//     expect(button).toBeInTheDocument();
//   });
//   it("should make post request on click of pay now button", () => {
//     render(<ExitFromParking />);
//     const button = screen.getByTestId("deregister-payment-button");
//     fireEvent.click(button);
//     expect(button).toBeInTheDocument();
//   });
//   it("should make goto slots page click on back button", () => {
//     render(<ExitFromParking />);
//     const button = screen.getByTestId("deregister-back-button");
//     fireEvent.click(button);
//     expect(button).toGetAttribute("href", "/slots");
//   });
// });
