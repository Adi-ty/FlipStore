"use client";

import MainNav from "../Components/MainNav";
import Product from "../Components/Product";
import ProductCart from "../Components/ProductCart";
import Link from "next/link";
import SuggestedCard from "../Components/SuggestedCard";
import { useEffect, useState } from "react";
import { ProductType } from "@/utils/types";
import axios from "axios";
import Loading from "../Components/Loading";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Cart() {
  const [cart, setCart] = useState<ProductType[]>([]);
  const [similarProduct, setSimilarProduct] = useState<ProductType>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");

    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);

        if (Array.isArray(parsedCart)) {
          setCart(parsedCart);
          console.log("Saved cart:", parsedCart);
        } else {
          console.error("Saved cart is not an array:", parsedCart);
        }
      } catch (error) {
        console.error("Error parsing saved cart:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (cart.length) {
      const lastItem = cart[cart.length - 1];
      const lastItemName = lastItem.item;

      axios
        .get(API_URL + "/api/similarProducts/predict/" + lastItemName)
        .then((response) => {
          const data = response.data;
          console.log("Similar products:", data);
          setSimilarProduct(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setLoading(false);
        });
    }
  }, [cart]);

  return (
    <div>
      <div className="bg-[#f2f2f2]">
        <MainNav />
        <div className="container mx-auto m">
          <div className="flex pb-10">
            <div className="w-3/4 bg-white px-10 py-10">
              <div className="flex justify-between border-b pb-8">
                <h1 className="font-semibold text-2xl">Shopping Cart</h1>
              </div>
              <div className="flex mt-10 mb-5">
                <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
                  Product Details
                </h3>
                <h3 className="font-semibold text-gray-600 text-xs uppercase w-1/5 text-center">
                  Price
                </h3>
                <h3 className="font-semibold text-gray-600 text-xs uppercase w-1/5 text-center">
                  Total
                </h3>
              </div>
              {Array.isArray(cart) &&
                cart.map((product) => {
                  return <ProductCart key={product.item} product={product} />;
                })}

              <Link href="/home">
                <div className="flex font-semibold text-indigo-600 text-sm mt-10">
                  <svg
                    className="fill-current mr-2 text-indigo-600 w-4"
                    viewBox="0 0 448 512"
                  >
                    <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
                  </svg>
                  Continue Shopping
                </div>
              </Link>
            </div>

            <div id="summary" className="w-1/4 px-8 py-10">
              <h1 className="font-semibold text-2xl border-b pb-8">
                Order Summary
              </h1>
              <div className="flex justify-between mt-10 mb-5"></div>
              <div>
                <label className="font-medium inline-block mb-3 text-sm uppercase">
                  Shipping
                </label>
                <select className="block p-2 text-gray-600 w-full text-sm">
                  <option>Standard shipping - ₹ 10.00</option>
                </select>
              </div>

              <button className="bg-red-500 hover:bg-red-600 px-5 py-2 mt-5 text-sm text-white uppercase">
                Apply
              </button>
              <div className="border-t mt-8">
                <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                  <span>Total cost</span>
                  {cart.length > 0 && <span>{cart[0].price}</span>}
                </div>
                <button className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-[2vh] text-center   font-medium  tracking-wide  font-mono  text-3xl	">
          - Similar Choices -
        </div>

        <div className="mt-[3vh]   flex flex-row justify-center flex-wrap ">
          <div className="flex flex-row">
            <div className=" flex flex-row  flex-wrap	mt-7 max-w-[63vw] ml-5">
              {loading ? (
                <Loading />
              ) : (
                similarProduct && <Product product={similarProduct} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}