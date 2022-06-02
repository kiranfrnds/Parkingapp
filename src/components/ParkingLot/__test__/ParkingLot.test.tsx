import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ParkingLot from "../ParkingLot";

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));
beforeAll(() => {
  jest.spyOn(global.console, "error").mockImplementation(() => {});
});

describe("ParkingLot", () => {
  it("should render", () => {
    render(<ParkingLot />);
    expect(screen.getByText("Parking Lot")).toBeInTheDocument();
  });
  it("should render parking-drawing-add-car-button", () => {
    render(<ParkingLot />);
    expect(
      screen.getByTestId("parking-drawing-add-car-button")
    ).toBeInTheDocument();
  });
  it("should render car number input", () => {
    render(<ParkingLot />);
    expect(screen.getByLabelText("Enter Car Number")).toBeInTheDocument();
  });
  it("should render parking-drawing-registration-input", () => {
    render(<ParkingLot />);
    expect(
      screen.getByTestId("parking-drawing-registration-input")
    ).toBeInTheDocument();
  });
  it("should alot parking slot", () => {
    render(<ParkingLot />);
    const carNumber = "KA-01-HH-1234";
    userEvent.type(screen.getByLabelText("Enter Car Number"), carNumber);
    userEvent.click(screen.getByTestId("parking-drawing-add-car-button"));
    expect(screen.getByText(carNumber)).toBeInTheDocument();
  });
});
