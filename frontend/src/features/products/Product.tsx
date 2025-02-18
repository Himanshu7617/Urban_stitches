import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetOrderIdMutation,
  useGetProductByIdQuery,
  useValidatePaymentMutation,
} from "../../slices/apiSlice";
import type { RazorPayOptions } from "../../slices/apiSlice";
import { useUser } from "@clerk/clerk-react";
// import Razorpay from "razorpay";

const Product = () => {
  const { id } = useParams();
  const { data: product } = useGetProductByIdQuery(String(id));
  const navigate = useNavigate();

  const [getOrderId] = useGetOrderIdMutation();
  const [validatePayment] = useValidatePaymentMutation();
  const {user}  = useUser();


  const modifiedProduct = {
    id: product?.id,
    name: product?.name,
    description: product?.description,
    images: product?.images.map((img: string) => img.split("---")[1]),
    price: product?.price,
    quantity: product?.quantity,
  };

  async function handlePurchase(e : React.MouseEvent<HTMLButtonElement>) {
    const options: RazorPayOptions = {
      amount: Number(modifiedProduct.price) * 100,
      currency: "INR",
      receipt: "receipt_id_12345",
    };
    const result = await getOrderId(options);
    console.log(result.data.id);

    //////// checkout
    console.log(options)

    const razorpayOptions = {
      key: "rzp_test_t6FZP489LAOf3Y", 
      amount: options.amount, //  paise
      currency: "INR",
      name: "UrbanStitches", //your business name
      description: "Test Transaction",
      order_id: result.data.id, // sample Order ID
      handler:async function (response: { 
        razorpay_payment_id: string; 
        razorpay_order_id: string; 
        razorpay_signature: string;
      }) {
        
        const resOptions = {
    
          razorpay_order_id : response.razorpay_order_id, 
          razorpay_payment_id : response.razorpay_payment_id, 
          razorpay_signature : response.razorpay_signature
        }

        const result = await validatePayment(resOptions)
        console.log(result);
      },
      
      prefill: {
        name: user?.fullName, 
        email: user?.primaryEmailAddress?.emailAddress,
        contact: user?.primaryPhoneNumber?.phoneNumber, 
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    console.log(razorpayOptions);
    const rzp1 = new window.Razorpay(razorpayOptions);
    (rzp1 as any).on("payment.failed", function (response) {
      console.log(response.error);
    });

    (rzp1 as any).open();
    e.preventDefault()
  }

  return (
    <div className="h-fit min-h-[100vh] w-full ">
      <nav className="w-full h-fit bg-blue-300 p-8 ">
        <button
          className="h-fit w-fit p-4 rounded-lg text-white bg-black"
          onClick={() => {
            navigate("/home");
          }}
        >
          {" "}
          back
        </button>
      </nav>
      <main className="min-h-[80vh] h-fit w-full flex gap-8 p-8">
        <div id="left" className="h-[50vh] w-2/5 border-2 border-red-700">
          {modifiedProduct.images && (
            <img
              className="h-full w-full object-cover"
              src={`http://localhost:3334/uploads/${modifiedProduct?.images[0]}`}
            ></img>
          )}
        </div>
        <div
          id="right"
          className="min-h-[50vh] h-fit w-3/5 flex flex-col gap-8 border-2  border-red-700"
        >
          <div className="text-[5rem] font-bold ">{modifiedProduct.name}</div>
          <div className="text-3xl "> {modifiedProduct.description}</div>
          <div className="text-3xl"> Rs. {modifiedProduct.price}</div>
          {modifiedProduct.quantity && modifiedProduct.quantity < 0 && (
            <span>out of stock</span>
          )}
          <button
            onClick={handlePurchase}
            className="h-fit text-3xl w-4/5 bg-black text-white p-2"
          >
            Purchase
          </button>
        </div>
      </main>
    </div>
  );
};

export default Product;
