import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import SmoothieConstructor from "./SmoothieConstructor";
import { fetchIngredients } from "../../api/asyncActions";

jest.mock("../../api/asyncActions");

fetchIngredients.mockImplementation(() => {
  return (dispatch) => {
    return new Promise((resolve) => {
      dispatch({ type: "FETCH_INGREDIENTS_SUCCESS", payload: mockIngredients });
      resolve();
    });
  };
});

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const initialState = {
  ingredient: {
    ingredients: [
      { _id: "1", name: "Banana", pricePerLiter: 10 },
      { _id: "2", name: "Apple", pricePerLiter: 5 },
    ],
  },
};

describe("<SmoothieConstructor />", () => {
  beforeEach(() => {
    fetchIngredients.mockResolvedValue({
      type: "FETCH_INGREDIENTS",
      payload: initialState.ingredient.ingredients,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("correctly calculates the price for different sizes of smoothies", async () => {
    const store = mockStore(initialState);

    await act(async () => {
      render(
        <Provider store={store}>
          <SmoothieConstructor />
        </Provider>
      );
    });

    fireEvent.click(screen.getByText("Banana 100ml"));

    expect(screen.getByText("Total Price: 1.00$")).toBeInTheDocument();

    fireEvent.change(
      screen.getByRole("combobox", { name: /Select Smoothie Size/i }),
      { target: { value: 500 } }
    );
    fireEvent.click(screen.getByText("Apple 200ml"));

    expect(screen.getByText("Total Price: 2.00$")).toBeInTheDocument();
  });
});
