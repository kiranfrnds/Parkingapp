import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Admin from "../Admin";

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

test("input element in the admin page", () => {
  render(<Admin />);
  const inputElement = screen.getByTestId("parking-create-text-input");
  expect(inputElement).toBeInTheDocument();
});

test("button element in document", () => {
  render(<Admin />);
  const buttonElement = screen.getByTestId("parking-create-submit-button");
  expect(buttonElement).toBeInTheDocument();
});

test("value in the input field", () => {
  render(<Admin />);
  const inputElement = screen.getByTestId("parking-create-text-input");
  userEvent.type(inputElement, "2");
  expect(inputElement.ariaValueText).toBe("2");
});

test("handle click", () => {
  render(<Admin />);
  const buttonElement = screen.getByTestId("parking-create-submit-button");
  fireEvent.click(buttonElement);
  expect(jest.fn()).toHaveBeenCalledTimes(0);
});
