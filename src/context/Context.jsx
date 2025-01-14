import { createContext, useReducer } from "react";
import { products } from "../assets/data";

export const ShopContext = createContext();

export default function ShopProvider({ children }) {
  const reducer = (state, action) => {
    let { type, payload } = action;

    switch (type) {
      case "plus":
        return {
          ...state,
          products: state.products.map((item) => {
            item.id === payload ? { ...item, count: item.count + 1 } : item;
          }),
        };

      case "minus":
        const minElem = state.products.find((item) => item.id === payload);

        if (minElem.count > 0) {
          return {
            ...state,
            products: state.products.map((item) =>
              item.id === payload ? { ...item, count: item.count - 1 } : item
            ),
          };
        }

        return state;

      case "like":
        return {
          ...state,
          products: state.products.map((item) =>
            item.id === payload ? { ...item, liked: !item.liked } : item
          ),
        };

      default:
        return state;
    }
  };

  let [reduceShop, dispatch] = useReducer(reducer, {
    products: products,
    cart: [],
  });

  return (
    <ShopContext.Provider value={{ reduceShop, dispatch }}>
      {children}
    </ShopContext.Provider>
  );
}
