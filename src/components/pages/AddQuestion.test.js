import "@testing-library/jest-dom/extend-expect";

import { fireEvent, screen } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";

import { renderWithProviders } from "../../utils/testUtils";
import AddQuestion from "./AddQuestion";

describe("AddQuestion Component", () => {
  test("renders input fields and submit button", () => {
    renderWithProviders(
      <MemoryRouter>
        <AddQuestion />
      </MemoryRouter>
    );

    const firstOptionInput = screen.getByTestId("first-option");
    const secondOptionInput = screen.getByTestId("second-option");
    expect(firstOptionInput).toBeInTheDocument();
    expect(secondOptionInput).toBeInTheDocument();

    const submitButton = screen.getByTestId("form-button");
    expect(submitButton).toBeInTheDocument();
  });

  test("submits form with valid inputs", async () => {
    renderWithProviders(
      <MemoryRouter>
        <AddQuestion />
      </MemoryRouter>
    );

    const firstOptionInput = screen.getByTestId("first-option");
    const secondOptionInput = screen.getByTestId("second-option");
    fireEvent.change(firstOptionInput, { target: { value: "Option 1" } });
    fireEvent.change(secondOptionInput, { target: { value: "Option 2" } });

    const submitButton = screen.getByTestId("form-button");
    fireEvent.click(submitButton);

    expect(window.location.pathname).toEqual("/");
  });
});
