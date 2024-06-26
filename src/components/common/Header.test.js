import React from "react";
import { renderWithProviders } from "../../utils/testUtils";
import Header from "./Header";
import { MemoryRouter } from "react-router-dom";

describe("Header Component", () => {
  it("matches snapshot", () => {
    const { container } = renderWithProviders(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(container).toMatchSnapshot();
  });
});
