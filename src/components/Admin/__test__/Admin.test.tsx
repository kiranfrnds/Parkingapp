import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Admin from "../Admin";

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

describe("Admin", () => {
  it("should render", () => {
    render(<Admin />);
    expect(screen.getByText("Admin")).toBeInTheDocument();
  });

  it("input element in the admin page", () => {
    render(<Admin />);
    const inputElement = screen.getByTestId("parking-create-text-input");
    expect(inputElement).toBeInTheDocument();
  });

  it("button element in document", () => {
    render(<Admin />);
    const buttonElement = screen.getByTestId("parking-create-submit-button");
    expect(buttonElement).toBeInTheDocument();
  });

  it("value in the input field", () => {
    render(<Admin />);
    const inputElement = screen.getByTestId("parking-create-text-input");
    expect(inputElement).toHaveValue("");
  });
  it("should navigate to slots page and create entered number of slots", () => {
    render(<Admin />);
    const inputElement = screen.getByTestId("parking-create-text-input");
    const buttonElement = screen.getByTestId("parking-create-submit-button");
    userEvent.type(inputElement, "2");
    fireEvent.click(buttonElement);
    expect(mockedUsedNavigate).toHaveBeenCalledWith("/slots");
  });
  it("set slots to 2", () => {
    render(<Admin />);
    const inputElement = screen.getByTestId("parking-create-text-input");
    const buttonElement = screen.getByTestId("parking-create-submit-button");
    userEvent.type(inputElement, "2");
    fireEvent.click(buttonElement);
    expect(mockedUsedNavigate).toHaveBeenCalledWith("/slots");
  });
});
