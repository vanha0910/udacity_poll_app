import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import store from "../../redux";
import Header from "./Header";

test("renders Header component correctly", () => {
  const { container } = render(
    <MemoryRouter>
      <Provider store={store}>
        <Header />
      </Provider>
    </MemoryRouter>
  );

  expect(container).toMatchSnapshot();
});
