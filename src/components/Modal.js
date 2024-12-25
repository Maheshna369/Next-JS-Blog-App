"use client";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Script from "next/script";
// import Razorpay from "razorpay";
import { useContext } from "react";
import { ModalContext } from "@/app/context/ModalContext";
const Modal = () => {
  const [money, setMoney] = useState("");
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const { modal, setModal } = useContext(ModalContext);
  const handleChange = (e) => {
    if (e.target.value >= 0) {
      setMoney(e.target.value);
    }
  };
  const handlePayment = async () => {
    const response = await fetch("/payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: money * 100 }),
    });
    const data = await response.json();
    const options = {
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: data.amount,
      currency: "INR",
      name: "Maphy Inc",
      description: "A Donation to Maphy, Inc",
      order_id: data.id,
      handler: async () => {
        alert("Your Payment is Successful !");
      },
      notes: {
        address: "Chatrapur, India",
      },
      theme: "#3399cc",
    };
    const rzp1 = new window.Razorpay(options);
    // rzp1.on("Payment failed", () => {
    //   alert("Your Payment is failed !");
    // });
    rzp1.open();
    // const RazorpayObject= {
    //   Razorpay: Razorpay
    // };
  };
  return (
    <>
    <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
      <div className="h-screen w-screen fixed inset-0 flex flex-col justify-center items-center backdrop-blur-sm z-[100] ease-in transition-opacity duration-1000">
        <div>
          <div className="w-full flex justify-end items-center">
          <button
            onClick={() => setModal(false)}
            className="place-self-end h-10 w-10 text-black"
          >
            <CloseIcon className="h-10 w-10" color="black" />
          </button>
          </div>
          <div className="payment-container h-80 w-80 flex flex-col justify-evenly items-center bg-gray-300 border-2 border-black rounded-xl">
            <h1 className="text-4xl">Enter an amount</h1>
            <div className="money flex flex-row gap-3">
              <button
                className="text-2xl p-4 bg-white border-2 rounded-lg"
                onClick={() => setMoney("10")}
              >
                ₹10
              </button>
              <button
                className="text-2xl p-4 bg-white border-2 rounded-lg"
                onClick={() => setMoney("100")}
              >
                ₹100
              </button>
              <button
                className="text-2xl p-4 bg-white border-2 rounded-lg"
                onClick={() => setMoney("1000")}
              >
                ₹1000
              </button>
            </div>
            <div className="input-btn-container flex flex-col gap-2 justify-center items-center">
              <span className="absolute left-[635px] top-[430px] text-xl">
                ₹
              </span>
              <input
                className="w-72 h-10 border-2 rounded-xl p-5 text-xl"
                name="amount"
                onChange={handleChange}
                value={money}
                type="number"
              />
              <button
                onClick={handlePayment}
                className="bg-[#0d6efd] text-white border-2 border-black rounded-xl h-10 w-24"
              >
                Pay
              </button>
            </div>
          </div>
        </div>
      </div>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        onLoad={() => setRazorpayLoaded(true)} // Update state when script loads
        onError={() => alert("Failed to load Razorpay. Please try again.")}
      />
    </>
  );
};

export default Modal;
