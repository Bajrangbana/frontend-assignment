import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ProjectTable from "./components/ProjectTable";
import App from "./App";

// Mocking the fetch API
global.fetch = jest.fn();

describe("ProjectTable Component", () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it("should render the table with paginated data", async () => {
    const mockData = [
      {
        "s.no": 0,
        "amt.pledged": 15823,
        "percentage.funded": 186,
      },
      {
        "s.no": 1,
        "amt.pledged": 6859,
        "percentage.funded": 8,
      },
      {
        "s.no": 2,
        "amt.pledged": 12345,
        "percentage.funded": 35,
      },
      {
        "s.no": 3,
        "amt.pledged": 5432,
        "percentage.funded": 50,
      },
      {
        "s.no": 4,
        "amt.pledged": 9876,
        "percentage.funded": 75,
      },
      {
        "s.no": 5,
        "amt.pledged": 4321,
        "percentage.funded": 90,
      },
    ];

    render(<ProjectTable projects={mockData} />);

    // Check if the first page data is rendered
    await waitFor(() => screen.getByText("0"));
    expect(screen.getByText("0")).toBeInTheDocument();
    expect(screen.getByText("186")).toBeInTheDocument();
    expect(screen.getByText("15,823")).toBeInTheDocument();

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("8")).toBeInTheDocument();
    expect(screen.getByText("6,859")).toBeInTheDocument();

    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("35")).toBeInTheDocument();
    expect(screen.getByText("12,345")).toBeInTheDocument();

    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("50")).toBeInTheDocument();
    expect(screen.getByText("5,432")).toBeInTheDocument();

    expect(screen.getByText("4")).toBeInTheDocument();
    expect(screen.getByText("75")).toBeInTheDocument();
    expect(screen.getByText("9,876")).toBeInTheDocument();

    // Verify pagination
    expect(screen.getByText("Page 1 of 2")).toBeInTheDocument();
  });

  it("should change page when next button is clicked", async () => {
    const mockData = [
      {
        "s.no": 0,
        "amt.pledged": 15823,
        "percentage.funded": 186,
      },
      {
        "s.no": 1,
        "amt.pledged": 6859,
        "percentage.funded": 8,
      },
      {
        "s.no": 2,
        "amt.pledged": 12345,
        "percentage.funded": 35,
      },
      {
        "s.no": 3,
        "amt.pledged": 5432,
        "percentage.funded": 50,
      },
      {
        "s.no": 4,
        "amt.pledged": 9876,
        "percentage.funded": 75,
      },
      {
        "s.no": 5,
        "amt.pledged": 4321,
        "percentage.funded": 90,
      },
    ];

    render(<ProjectTable projects={mockData} />);

    // Check if the first page data is rendered
    await waitFor(() => screen.getByText("0"));
    expect(screen.getByText("0")).toBeInTheDocument();

    // Click the Next button to go to page 2
    fireEvent.click(screen.getByText("Next"));

    // Check if the second page data is displayed
    await waitFor(() => screen.getByText("5"));
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("90")).toBeInTheDocument();
    expect(screen.getByText("4,321")).toBeInTheDocument();

    expect(screen.getByText("Page 2 of 2")).toBeInTheDocument();
  });

  it("should not navigate past the last page", async () => {
    const mockData = [
      {
        "s.no": 0,
        "amt.pledged": 15823,
        "percentage.funded": 186,
      },
      {
        "s.no": 1,
        "amt.pledged": 6859,
        "percentage.funded": 8,
      },
      {
        "s.no": 2,
        "amt.pledged": 12345,
        "percentage.funded": 35,
      },
      {
        "s.no": 3,
        "amt.pledged": 5432,
        "percentage.funded": 50,
      },
      {
        "s.no": 4,
        "amt.pledged": 9876,
        "percentage.funded": 75,
      },
      {
        "s.no": 5,
        "amt.pledged": 4321,
        "percentage.funded": 90,
      },
    ];

    render(<ProjectTable projects={mockData} />);

    // Go to page 2
    fireEvent.click(screen.getByText("Next"));

    // Try clicking Next again, should be disabled
    expect(screen.getByText("Next")).toBeDisabled();
  });

  it("should display no projects message when no projects are provided", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([]), // Returning an empty array to simulate no projects
      })
    );

    render(<App />);

    // Wait for the fetch to complete and check the "No projects to display" message
    await waitFor(() =>
      expect(screen.getByText(/No projects to display./i)).toBeInTheDocument()
    );
  });
});
