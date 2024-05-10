import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // To extend Jest matchers

import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import store from "../../redux";
import AddQuestion from "./AddQuestion"; // Assuming the file path to your component

describe("AddQuestion Component", () => {
  test("renders input fields and submit button", () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <AddQuestion />
        </Provider>
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
    render(
      <MemoryRouter>
        <Provider store={store}>
          <AddQuestion />
        </Provider>
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
