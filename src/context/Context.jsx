import { createContext, useReducer } from "react";
import { products } from "../assets/data";
import Swal from "sweetalert2";

export const ShopContext = createContext();

export default function ShopProvider({ children }) {
  const reducer = (state, action) => {
    let { type, payload } = action;

    switch (type) {
      case "plus":
        return {
          ...state,
          products: state.products.map((item) =>
            item.id === payload ? { ...item, count: item.count + 1 } : item
          ),
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

      case "add-cart":
        let existingProduct = state.cart.find((item) => item.id === payload.id);

        if (existingProduct) {
          Swal.fire({
            icon: "success",
            title: "Mahsulotlar savati mavaffaqiyatli yangilandi!",
            text: `${payload.title} -ning miqdori oshirildi!`,
            timer: 1500,
            showConfirmButton: false,
          });

          return {
            ...state,
            cart: state.cart.map((item) =>
              item.id === payload.id
                ? { ...item, count: item.count + payload.count }
                : item
            ),
          };
        } else {
          Swal.fire({
            icon: "success",
            title: "Mahsulot savatchaga qo'shildi!",
            text: `${payload.title} has been added to your cart.`,
            timer: 1500,
            showConfirmButton: false,
          });

          return {
            ...state,
            cart: [
              ...state.cart,
              { ...payload, count: payload.count, addedToCart: true },
            ],
          };
        }

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
