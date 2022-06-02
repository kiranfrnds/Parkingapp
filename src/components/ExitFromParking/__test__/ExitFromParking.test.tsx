import React from "react";
import { findByText, fireEvent, render } from "@testing-library/react";
import ExitFromParking from "../ExitFromParking";

describe("ExitFromParking", () => {
  it("should render", () => {
    const { asFragment } = render(<ExitFromParking />);
    expect(asFragment()).toMatchSnapshot();
  });
  // it("should render total duration", () => {
  //   render(<ExitFromParking />);
  //   const totalDuration = screen.getByTestId("deregister-time-spent");
  //   expect(totalDuration).toBeInTheDocument();
  // });
  // it("should render total charge", () => {
  //   render(<ExitFromParking />);
  //   const totalDuration = screen.getByTestId("deregister-charge");
  //   expect(totalDuration).toBeInTheDocument();
  // });
  // it("should render payment button", () => {
  //   const { getByTestId } = render(<ExitFromParking />);
  //   const button = getByTestId("deregister-payment-button");
  //   expect(button).toBeInTheDocument();
  // });
  // it("should render back button", () => {
  //   const { getByTestId } = render(<ExitFromParking />);
  //   const button = getByTestId("deregister-back-button");
  //   expect(button).toBeInTheDocument();
  // });

  // it("should make post request on click of pay now button", () => {
  //   const { getByTestId } = render(<ExitFromParking />);
  //   const button = getByTestId("deregister-payment-button");
  //   fireEvent.click(button);
  //   expect(button).toBeInTheDocument();
  // } );
  // it("should make goto slots page click on back button", () => {
  //    render(<ExitFromParking />);
  //   const button = screen.getByTestId("deregister-back-button");
  //   fireEvent.click(button);
  //   expect(button).toGetAttribute("href", "/slots");
  // } );
});
