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
            item.id === payload
              ? {
                  ...item,
                  count: item.count + 1,
                  // newPrice: item.newPrice * (item.count + 1),
                }
              : item
          ),
          cart: state.cart.map((item) =>
            item.id === payload
              ? {
                  ...item,
                  count: item.count + 1,
                  // newPrice: item.newPrice * (item.count + 1),
                }
              : item
          ),
        };

      case "minus":
        const minElem = state.products.find((item) => item.id === payload);

        if (minElem.count > 0) {
          return {
            ...state,
            products: state.products.map((item) =>
              item.id === payload
                ? {
                    ...item,
                    count: item.count - 1,
                    // newPrice: item.newPrice * (item.count - 1),
                  }
                : item
            ),
            cart: state.cart.map((item) =>
              item.id === payload
                ? {
                    ...item,
                    count: item.count - 1,
                    // newPrice: item.newPrice * (item.count - 1),
                  }
                : item
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
            text: `${payload.title} mahsulotining miqdori oshirildi!`,
            timer: 1500,
            showConfirmButton: false,
          });

          return {
            ...state,
            cart: state.cart.map((item) =>
              item.id === payload.id
                ? {
                    ...item,
                    count: item.count + payload.count,
                    // newPrice: item.newPrice * (item.count + payload.count),
                  }
                : item
            ),
          };
        } else {
          Swal.fire({
            icon: "success",
            title: "Mahsulot savatchaga qo'shildi!",
            text: `${payload.title} savatchaga qo'shildi.`,
            timer: 1500,
            showConfirmButton: false,
          });

          return {
            ...state,
            cart: [
              ...state.cart,
              {
                ...payload,
                count: payload.count,
                // newPrice: payload.originalPrice * payload.count,
                addedToCart: true,
              },
            ],
          };
        }

      case "delete":
        Swal.fire({
          title: "Ishonchingiz komilmi?",
          text: "Bu mahsulotni savatdan o'chirmoqchimisiz?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Ha, albatta!",
          cancelButtonText: "Yo'q",
        }).then((result) => {
          if (result.isConfirmed) {
            let deletedProduct = state.cart.find((item) => item.id === payload);
            Swal.fire({
              icon: "info",
              title: "Mahsulot savatdan o'chirildi",
              text: `${deletedProduct?.title} o'chirildi`,
              timer: 1500,
              showConfirmButton: false,
            });

            dispatch({
              type: "updateCart",
              payload: state.cart.filter((item) => item.id !== payload),
            });
          }
        });

        return state;

      case "deleteAll":
        Swal.fire({
          title: "Ishonchingiz komilmi?",
          text: "Hamma mahsulotlarni savatdan o'chirmoqchimisiz?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, albatta",
          cancelButtonText: "Yo'q",
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              icon: "warning",
              title: "Savat tozalandi",
              text: "Hamma mahsulotlar o'chirildi",
              timer: 1500,
              showConfirmButton: false,
            });

            dispatch({
              type: "updateCart",
              payload: [],
            });
          }
        });
        return state;

      case "updateCart":
        return {
          ...state,
          cart: payload,
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
