import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProjectTable from './ProjectTable';

// Mocking the data
const mockProjects = [
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
    "percentage.funded": 50,
  },
  {
    "s.no": 3,
    "amt.pledged": 4567,
    "percentage.funded": 20,
  },
  {
    "s.no": 4,
    "amt.pledged": 7890,
    "percentage.funded": 75,
  },
  {
    "s.no": 5,
    "amt.pledged": 9890,
    "percentage.funded": 55,
  }
];

describe("ProjectTable Component", () => {

  it("should render the table with correct data", () => {
    render(<ProjectTable projects={mockProjects} />);
    
    // Checking data rendering without titles
    expect(screen.getByText("0")).toBeInTheDocument(); // s.no column
    expect(screen.getByText("15,823")).toBeInTheDocument(); // amt.pledged column
    expect(screen.getByText("186")).toBeInTheDocument(); // percentage.funded column
  });

  it("should show pagination buttons and allow navigation", () => {
    render(<ProjectTable projects={mockProjects} />);

    // Check if the pagination buttons are rendered
    expect(screen.getByText("Previous")).toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();

    // Check initial page number
    expect(screen.getByText("Page 1 of 2")).toBeInTheDocument();

    // Click Next button and check if page changes
    fireEvent.click(screen.getByText("Next"));
    expect(screen.getByText("Page 2 of 2")).toBeInTheDocument();

    // Click Previous button and check if page changes
    fireEvent.click(screen.getByText("Previous"));
    expect(screen.getByText("Page 1 of 2")).toBeInTheDocument();
  });

  it("should disable previous button on first page", () => {
    render(<ProjectTable projects={mockProjects} />);
    
    // Check if the previous button is disabled on the first page
    expect(screen.getByText("Previous")).toBeDisabled();
  });

  it("should disable next button on the last page", () => {
    render(<ProjectTable projects={mockProjects} />);
    
    // Go to the last page
    fireEvent.click(screen.getByText("Next"));
    
    // Check if the next button is disabled on the last page
    expect(screen.getByText("Next")).toBeDisabled();
  });

});
