/* eslint-disable testing-library/prefer-screen-queries */
import { fireEvent, getByText, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ParkingContext } from "../../ParkingContext/ParkingContext";
import ParkingLot from "../ParkingLot/ParkingLot";

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

const data = [
  {
    id: 1,
    carNumber: "1",
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

  it("should create car number with object", async () => {
    const { getByTestId } = render(
      <ParkingContext.Provider value={value}>
        <ParkingLot />
      </ParkingContext.Provider>
    );
    const input = getByTestId("parking-drawing-registration-input");
    const button = getByTestId("parking-drawing-add-car-button");
    fireEvent.change(input, { target: { value: "1" } });
    fireEvent.click(button);
    expect(value.parkingSlots[0].carNumber).toBe("1");
    expect(value.parkingSlots[0].available).toBe(false);
    expect(value.parkingSlots[0].time).toBeTruthy();
    // expect(value.setParkingSlots).toBeChecked();
  });

  it("click on card should naviagete to exit", async () => {
    const { getByTestId } = render(
      <ParkingContext.Provider value={value}>
        <ParkingLot />
      </ParkingContext.Provider>
    );
    const button = getByTestId("parking-drawing-space");
    fireEvent.click(button);
    expect(mockedUsedNavigate).toHaveBeenCalledWith("/exit");
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
});
