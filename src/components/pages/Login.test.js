import "@testing-library/jest-dom/extend-expect";

import { fireEvent, screen } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";

import { renderWithProviders } from "../../utils/testUtils";
import Login from "./Login";

describe("Login Component", () => {
  test("renders input fields and submit button", () => {
    renderWithProviders(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const usernameInput = screen.getByTestId("username");
    const passwordInput = screen.getByTestId("password");
    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();

    const submitButton = screen.getByTestId("login-btn");
    expect(submitButton).toBeInTheDocument();
  });

  test("submits form with valid inputs", async () => {
    renderWithProviders(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    const usernameInput = screen.getByTestId("username");
    const passwordInput = screen.getByTestId("password");
    fireEvent.change(usernameInput, { target: { value: "Option 1" } });
    fireEvent.change(passwordInput, { target: { value: "Option 2" } });

    const submitButton = screen.getByTestId("login-btn");
    fireEvent.click(submitButton);

    expect(window.location.pathname).toEqual("/");
  });
});
