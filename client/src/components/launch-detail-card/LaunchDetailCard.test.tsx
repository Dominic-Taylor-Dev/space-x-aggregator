import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import LaunchDetailCard, { formattedDate } from "./LaunchDetailCard";
import { Launch } from "../../types";

jest.mock("../launch-status/LaunchStatus", () => {
  return {
    __esModule: true,
    default: function MockLaunchStatus(props: any) {
      return (
        <div data-testid="mock-launch-status">{props.success.toString()}</div>
      );
    },
  };
});

const testLaunchData: Launch = {
  id: "test-id",
  launchName: "FalconSat",
  rocketName: "Falcon 1",
  launchpadName: "Kwajelein Atoll",
  details: "Engine failure at 33 seconds and loss of vehicle.",
  date: "2006-03-17T00:00:00.000Z",
  success: true,
};

describe("Date formatter", () => {
  it("when given an ISO Datetime input, should return (d)d/(M)M/yyyy, HH:mm:ss AM/PM", () => {
    expect(formattedDate(testLaunchData.date)).toBe("17/3/2006, 00:00:00 AM");
  });
});

describe("Launch Status component", () => {
  describe("when given test launch details", () => {
    it("should render a fixed image with the correct alt text alongside each launch details card (N.B. this is mocked via identity-obj-proxy)", () => {
      render(<LaunchDetailCard launch={testLaunchData} />);

      expect(screen.getByAltText("Starry night sky"));
    });

    it("should render launch name in H2", () => {
      render(<LaunchDetailCard launch={testLaunchData} />);

      expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
        testLaunchData.launchName
      );
    });

    it("should attempt to render LaunchStatus child element with the correct success prop value", () => {
      render(<LaunchDetailCard launch={testLaunchData} />);

      const mockLaunchStatus = screen.getByTestId("mock-launch-status");
      expect(mockLaunchStatus).toHaveTextContent(
        testLaunchData.success.toString()
      );
    });

    it("should render datetime string in format provided by formatting function", () => {
      render(<LaunchDetailCard launch={testLaunchData} />);

      expect(screen.getByText(formattedDate(testLaunchData.date)));
    });

    it("should render description", () => {
      render(<LaunchDetailCard launch={testLaunchData} />);

      expect(screen.getByText(testLaunchData.details));
    });

    it("should render details section", () => {
      render(<LaunchDetailCard launch={testLaunchData} />);

      expect(screen.getByText("Details"));
      expect(screen.getByText(`Rocket Name: ${testLaunchData.rocketName}`));
      expect(
        screen.getByText(`Launchpad Name: ${testLaunchData.launchpadName}`)
      );
    });
  });
});
