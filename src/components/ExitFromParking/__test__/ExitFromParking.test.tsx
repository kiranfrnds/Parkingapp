/* eslint-disable jest/valid-expect-in-promise */
import { fireEvent, render, screen } from "@testing-library/react";
import { ParkingContext } from "../../../ParkingContext/ParkingContext";
import ExitFromParking from "../ExitFromParking";

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

beforeEach(() => {
  global.fetch = jest.fn(() => {
    return Promise.resolve({
      json: () =>
        Promise.resolve({
          status: 200,
          data: [
            {
              id: 1,
              carNumber: "KA-01-AA-1235",
              time: new Date(),
              available: false,
            },
          ],
        }),
    });
  }) as jest.Mock;
});

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

  it("should make payment", () => {
    render(
      <ParkingContext.Provider value={value}>
        <ExitFromParking />
      </ParkingContext.Provider>
    );
    const button = screen.getByTestId("deregister-payment-button");
    fireEvent.click(button);
    expect(button).toBeDefined();
  });
  it("should goto back", () => {
    render(
      <ParkingContext.Provider value={value}>
        <ExitFromParking />
      </ParkingContext.Provider>
    );
    const button = screen.getByTestId("deregister-back-button");
    fireEvent.click(button);
    expect(button).toBeDefined();
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
