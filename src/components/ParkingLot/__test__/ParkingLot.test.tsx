/* eslint-disable testing-library/prefer-screen-queries */
import { fireEvent, getByText, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ParkingContext } from "../../../ParkingContext/ParkingContext";
import ParkingLot from "../ParkingLot";

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

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
  stateId: "",
  setParkingSlots: jest.fn(),
  setStateId: jest.fn(),
};

describe("Parking Lot", () => {
  beforeAll(() => {
    jest.spyOn(window, "alert").mockImplementationOnce(() => {});
    jest.spyOn(console, "error").mockImplementationOnce(() => {});
  });

  it("snap shot", () => {
    const { container } = render(<ParkingLot />);
    expect(container).toMatchSnapshot();
  });

  it("input", async () => {
    const { getByTestId } = render(
      <ParkingContext.Provider value={value}>
        <ParkingLot />
      </ParkingContext.Provider>
    );
    const input = getByTestId("parking-drawing-registration-input");
    const button = getByTestId("parking-drawing-add-car-button");
    fireEvent.change(input, { target: { value: "1" } });
    fireEvent.click(button);
    expect(input).toBeDefined();
  });
  it("button", async () => {
    const { getByTestId } = render(
      <ParkingContext.Provider value={value}>
        <ParkingLot />
      </ParkingContext.Provider>
    );
    const button = getByTestId("parking-drawing-add-car-button");
    fireEvent.click(button);
    expect(button).toBeDefined();
  });
  it("should create number of slots", async () => {
    const { getByTestId } = render(
      <ParkingContext.Provider value={value}>
        <ParkingLot />
      </ParkingContext.Provider>
    );
    const input = getByTestId("parking-drawing-registration-input");
    const button = getByTestId("parking-drawing-add-car-button");
    fireEvent.change(input, { target: { value: "1" } });
    fireEvent.click(button);
    expect(value.parkingSlots.length).toBe(1);
  });
  it("render exit button", async () => {
    const { getByText } = render(
      <ParkingContext.Provider value={value}>
        <ParkingLot />
      </ParkingContext.Provider>
    );
    const button = getByText("Exit");
    expect(button).toBeDefined();
  });
  it("should render Card after entering car number", async () => {
    const { getByTestId } = render(
      <ParkingContext.Provider value={value}>
        <ParkingLot />
      </ParkingContext.Provider>
    );
    const input = getByTestId("parking-drawing-registration-input");
    const button = getByTestId("parking-drawing-add-car-button");
    fireEvent.change(input, { target: { value: "1" } });
    fireEvent.click(button);
    const card = getByTestId("parking-drawing-space");
    expect(card).toBeDefined();
  });
  it("set exit id when click on exit button", async () => {
    const { getByTestId } = render(
      <ParkingContext.Provider value={value}>
        <ParkingLot />
      </ParkingContext.Provider>
    );
    const input = getByTestId("parking-drawing-registration-input");
    const button = getByTestId("parking-drawing-add-car-button");
    fireEvent.change(input, { target: { value: "1" } });
    fireEvent.click(button);
    const exitButton = getByTestId("parking-drawing-exit-button-1");
    fireEvent.click(exitButton);
    expect(value.stateId).toBe("1");
  });
});

// describe("ParkingLot", () => {
//   it("should render", () => {
//     render(<ParkingLot />);
//     expect(screen.getByText("Parking Lot")).toBeInTheDocument();
//   });
//   it("should render parking-drawing-add-car-button", () => {
//     render(<ParkingLot />);
//     expect(
//       screen.getByTestId("parking-drawing-add-car-button")
//     ).toBeInTheDocument();
//   });
//   it("should render car number input", () => {
//     render(<ParkingLot />);
//     expect(screen.getByLabelText("Enter Car Number")).toBeInTheDocument();
//   });
//   it("should render parking-drawing-add-car-button", () => {
//     render(<ParkingLot />);
//     expect(
//       screen.getByTestId("parking-drawing-registration-input")
//     ).toBeInTheDocument();
//   });
// it("should alot parking slot", () => {
//   render(<ParkingLot />);
//   const carNumber = "KA-01-HH-1234";
//   userEvent.type(screen.getByLabelText("Enter Car Number"), carNumber);
//   userEvent.click(screen.getByTestId("parking-drawing-add-car-button"));
//   expect(screen.getByText(carNumber)).toBeInTheDocument();
// });
// });
