import React, { useContext } from "react";
import { ShopContext } from "../context/Context";
import { MdDelete } from "react-icons/md";

export default function Cart() {
  const { reduceShop, dispatch } = useContext(ShopContext);

  return (
    <main>
      <section className="max-w-[1200px] mx-auto py-5">
        <h1 className="text-slate-700 font-mono font-bold text-3xl">
          <span className="text-[#7FAD39]">#</span>Cart
        </h1>
        <div className="py-10">
          <table className="border-4 border-[#7FAD39] w-[100%] text-center">
            <thead>
              <tr>
                <th className="border border-[#7FAD39] text-slate-700 py-3">
                  №
                </th>
                <th className="border border-[#7FAD39] text-slate-700">
                  Title
                </th>
                <th className="border border-[#7FAD39] text-slate-700">
                  Price
                </th>
                <th className="border border-[#7FAD39] text-slate-700">
                  Discount
                </th>
                <th className="border border-[#7FAD39] text-slate-700">
                  Quantity
                </th>
                <th className="border border-[#7FAD39] text-slate-700">
                  Image
                </th>
                <th className="border border-[#7FAD39] text-slate-700">Like</th>
                <th className="border border-[#7FAD39]">
                  <button
                    className="text-red-700 font-black"
                    onClick={() => dispatch({ type: "deleteAll" })}
                  >
                    Delete All
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {reduceShop.cart.length ? (
                reduceShop.cart.map((item, index) => {
                  return (
                    <tr key={index}>
                      <th className="border border-[#7FAD39]">{index + 1}</th>
                      <td className="border border-[#7FAD39]">{item.title}</td>
                      <td className="border border-[#7FAD39]">
                        {item.newPrice}
                      </td>
                      <td className="border border-[#7FAD39]">{item.skidka}</td>
                      <td className="border border-[#7FAD39]">{item.count}</td>
                      <td className="border border-[#7FAD39]">
                        <img
                          src={item.img}
                          alt={item.title}
                          className="w-20 m-auto py-3"
                        />
                      </td>
                      <td className="border border-[#7FAD39]">
                        {item.liked ? "True" : "False"}
                      </td>
                      <td className="border border-[#7FAD39]">
                        <button
                          className="text-[red] text-2xl"
                          onClick={() =>
                            dispatch({ type: "delete", payload: item.id })
                          }
                        >
                          <MdDelete />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <th colSpan={100} className="text-center py-5">
                    Hech qanday mahsulot qoshilmadi...
                  </th>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
