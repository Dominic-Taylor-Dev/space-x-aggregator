import { act, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import LaunchList from "./LaunchList";
import { AxiosResponse } from "axios";
import { LaunchDetailCardProps } from "../launch-detail-card/LaunchDetailCard";
import { AggregatedLaunchDataResponse } from "../../apis/launches";
import { Launch } from "../../types";

const mockLaunches = [
  {
    id: "1",
    launchName: "Launch 1",
    rocketName: "Rocket 1",
    launchpadName: "Launchpad 1",
    details: "Details 1",
    date: "2023-10-30T10:00:00Z",
    success: true,
  },
  {
    id: "2",
    launchName: "Launch 2",
    rocketName: "Rocket 2",
    launchpadName: "Launchpad 2",
    details: "Details 2",
    date: "2023-10-31T11:00:00Z",
    success: false,
  },
];

let mockApiResponseStatusCode = 0;
let mockApiResponseData: Launch[] = [];
jest.mock("../../apis/launches", () => {
  return {
    __esModule: true,
    getAggregatedLaunchData: (): Promise<
      Partial<AxiosResponse<AggregatedLaunchDataResponse, any>>
    > => {
      return Promise.resolve({
        status: mockApiResponseStatusCode,
        data: { results: mockApiResponseData },
      });
    },
  };
});

jest.mock("../launch-detail-card/LaunchDetailCard", () => {
  return {
    __esModule: true,
    default: ({ launch }: LaunchDetailCardProps) => {
      return (
        <div data-testid={`mock-detail-card-${launch.id}`}>
          {launch.id +
            launch.launchName +
            launch.rocketName +
            launch.launchpadName +
            launch.details +
            launch.date +
            launch.success}
        </div>
      );
    },
  };
});

jest.mock("../spinner/Spinner", () => {
  return {
    __esModule: true,
    default: () => {
      return <div data-testid={"mock-spinner"} />;
    },
  };
});

it("should render a loading spinner while fetching data", async () => {
  mockApiResponseStatusCode = 200;
  mockApiResponseData = [];

  render(<LaunchList />);

  const loadingSpinner = screen.getByTestId("mock-spinner");
  expect(loadingSpinner).toBeInTheDocument();
});

it("should render message informing user that no launch data has been found in event of a successful, but empty, API response", async () => {
  mockApiResponseStatusCode = 200;
  mockApiResponseData = [];

  await act(async () => {
    render(<LaunchList />);
  });

  expect(screen.getByText("No launches found."));
});

it("should attempt to render LaunchDetailCard child element with the correct prop values for multiple cards", async () => {
  mockApiResponseStatusCode = 200;
  mockApiResponseData = mockLaunches;

  await act(async () => {
    render(<LaunchList />);
  });

  mockLaunches.forEach((launch) => {
    const mockLaunchDetailCard = screen.getByTestId(
      `mock-detail-card-${launch.id}`
    );

    Object.values(launch).forEach((launchPropertyValue) => {
      expect(mockLaunchDetailCard).toHaveTextContent(`${launchPropertyValue}`);
    });
  });
});
