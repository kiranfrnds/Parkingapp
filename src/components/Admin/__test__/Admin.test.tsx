/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Admin from "../Admin";
import { ParkingContext } from "../../../ParkingContext/ParkingContext";

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

const value = {
  parkingSlots: [],
  stateId: "",
  setParkingSlots: jest.fn(),
  setStateId: jest.fn(),
};

describe("Admin", () => {
  beforeAll(() => {
    jest.spyOn(window, "alert").mockImplementationOnce(() => {});
    jest.spyOn(console, "error").mockImplementationOnce(() => {});
  });

  it("snap shot", () => {
    const { container } = render(<Admin />);
    expect(container).toMatchSnapshot();
  });

  it("input", async () => {
    const { getByTestId } = render(
      <ParkingContext.Provider value={value}>
        <Admin />
      </ParkingContext.Provider>
    );
    const input = getByTestId("parking-create-text-input");
    const button = getByTestId("parking-create-submit-button");
    userEvent.type(input, "1");
    userEvent.click(button);
    expect(value.setParkingSlots).toHaveBeenCalledTimes(1);
  });

  // it("should render", () => {
  //   render(<Admin />);
  //   expect(screen.getByText("Admin")).toBeInTheDocument();
  // });

  // it("input element in the admin page", () => {
  //   render(<Admin />);
  //   const inputElement = screen.getByTestId("parking-create-text-input");
  //   expect(inputElement).toBeInTheDocument();
  // });

  // it("button element in document", () => {
  //   render(<Admin />);
  //   const buttonElement = screen.getByTestId("parking-create-submit-button");
  //   expect(buttonElement).toBeInTheDocument();
  // });
});
