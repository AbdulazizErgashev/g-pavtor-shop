import React, { useContext } from "react";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { ShopContext } from "../context/Context";

export default function Home() {
  const { reduceShop, dispatch } = useContext(ShopContext);

  return (
    <main>
      <section className="max-w-[1200px] mx-auto py-5">
        <div className="grid grid-cols-5 items-center gap-5">
          {reduceShop.products.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center gap-y-3 p-4 sm:p-6 border-2 border-[#7fad39] rounded-lg shadow-md hover:shadow-lg transition-shadow max-w-[90vw]"
            >
              <div className="flex items-center justify-between w-full">
                <h1 className="bg-[#7FAD39] text-white text-xs sm:text-sm font-extrabold px-2 py-1 rounded-md">
                  {item.skidka}
                </h1>

                <div className="bg-[#D8E6C3] rounded-full cursor-pointer">
                  <FaRegHeart
                    className={`p-1 sm:p-2 text-2xl sm:text-4xl ${
                      item.liked
                        ? "bg-red-500 text-white rounded-full"
                        : "text-[#7FAD39]"
                    }`}
                    onClick={() => dispatch({ type: "like", payload: item.id })}
                    aria-label={`Mark ${item.title} as favorite`}
                  />
                </div>
              </div>

              <img
                src={item.img}
                alt={item.title}
                className="max-h-20 sm:max-h-32 object-contain"
              />

              <h1 className="text-gray-500 text-[0.65rem] sm:text-xs font-bold">
                {item.quality}
              </h1>

              <h1 className="text-gray-800 text-sm sm:text-base font-semibold">
                {item.title}
              </h1>

              <div className="flex items-center gap-x-2">
                <p className="text-[#7FAD39] text-sm sm:text-base font-semibold">
                  {item.newPrice}
                </p>

                <p className="text-gray-400 text-xs sm:text-sm font-semibold line-through">
                  {item.oldPrice}
                </p>
              </div>

              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-x-2 sm:gap-x-3">
                  <button
                    className="bg-gray-800 text-white text-xs sm:text-sm px-2 sm:px-3 py-1 rounded hover:bg-gray-700 transition"
                    onClick={() =>
                      dispatch({ type: "minus", payload: item.id })
                    }
                    aria-label={`Decrease quantity of ${item.title}`}
                  >
                    -
                  </button>
                  <p className="text-xs sm:text-sm font-semibold">
                    {item.count}
                  </p>
                  <button
                    className="bg-gray-800 text-white text-xs sm:text-sm px-2 sm:px-3 py-1 rounded hover:bg-gray-700 transition"
                    onClick={() => dispatch({ type: "plus", payload: item.id })}
                    aria-label={`Increase quantity of ${item.title}`}
                  >
                    +
                  </button>
                </div>

                <MdOutlineShoppingCart
                  onClick={() =>
                    dispatch({ type: "add-cart", payload: item.id })
                  }
                  className="text-gray-500 text-xl sm:text-3xl cursor-pointer hover:text-[#7FAD39] transition"
                  aria-label={`Add ${item.title} to cart`}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
