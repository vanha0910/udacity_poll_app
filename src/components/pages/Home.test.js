import "@testing-library/jest-dom/extend-expect";

import { screen, fireEvent } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";

import { renderWithProviders } from "../../utils/testUtils";
import Home from "./Home";

describe("Home Component", () => {
  test("renders header", async () => {
    renderWithProviders(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    const logoutButton = screen.getByTestId("logout-btn");
    const linkHome = screen.getByTestId("nav-1");
    const linkLeaderBoard = screen.getByTestId("nav-2");
    const linkNew = screen.getByTestId("nav-3");

    expect(logoutButton).toBeInTheDocument();
    expect(linkHome).toBeInTheDocument();
    expect(linkLeaderBoard).toBeInTheDocument();
    expect(linkNew).toBeInTheDocument();
    expect(linkHome).toHaveTextContent("Home");
    expect(linkLeaderBoard).toHaveTextContent("Leaderboard");
    expect(linkNew).toHaveTextContent("New");
  });
});
