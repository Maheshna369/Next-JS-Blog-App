import Razorpay from "razorpay";
import { NextResponse} from "next/server";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const POST = async (Request) => {
    const {amount}= await Request.json();
  try {
    const order = await razorpay.orders.create({
      amount: amount.toString().subString(),
      currency: "INR"
    });
    return NextResponse.json({message: `Payment is successful`, status: 200, order});
  } catch (error) {
    return NextResponse.json({message: 'Error while processing the payment in server side.', status: 400});
  }
};
