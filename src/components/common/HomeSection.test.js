import { renderWithProviders } from "../../utils/testUtils";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import HomeSection from "./HomeSection";

describe("HomeSection Component", () => {
  it("matches snapshot", () => {
    const { container } = renderWithProviders(
      <MemoryRouter>
        <HomeSection />
      </MemoryRouter>
    );

    expect(container).toMatchSnapshot();
  });
});
