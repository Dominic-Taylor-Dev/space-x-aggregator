import { render, screen } from "@testing-library/react";


import LaunchStatus from './LaunchStatus'

describe("Launch Status component", () => {
  it('when given success prop as true, should render "Succeeded"', () => {
    render(<LaunchStatus success={true} />);
    expect(screen.getByText("Succeeded"));
  });

  it('when given success prop as false, should render "Failed"', () => {
    render(<LaunchStatus success={false} />);
    expect(screen.getByText("Failed"));
  });
})
