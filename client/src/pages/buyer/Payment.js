import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import CardIcon from "../../assets/images/credit-card.svg";
import ProductImage from "../../assets/images/product-image.jpg";

import "../../assets/css/checkout.css";
import { useLocation } from "react-router-dom";
import axios from "axios";

let stripePromise;

const getStripe = () => {
  
  
  if (!stripePromise) {
    stripePromise = loadStripe("pk_test_51KTtekDmwis8SNF30YGyHTrvPnSHZHOGcG79ISmdmojtJk5xjcUFbJAlqrPEiAoM3w6Kacz6F0MgfE8Pk30pLLiS00Mi64gyLS");
  }

  return stripePromise;
};

const Payment = () => {
  const location = useLocation()
  const thePath = location.pathname
  const lastItem = thePath.substring(thePath.lastIndexOf('/') + 1)
  const [stripeError, setStripeError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const item = {
    price: "price_1MTV9jDmwis8SNF3FK7wPdzA",
    quantity: 1
  };

  const checkoutOptions = {
    lineItems: [item],
    mode: "payment",
    successUrl: `${window.location.origin}/success/${lastItem}`,
    cancelUrl: `${window.location.origin}/cancel/${lastItem}`
  };

  const redirectToCheckout = async () => {
    setLoading(true);
    console.log("redirectToCheckout");

    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout(checkoutOptions);
    console.log("Stripe checkout error", error);

    if (error) setStripeError(error.message);
    setLoading(false);
  };

  if (stripeError) alert(stripeError);

  const [property, setProperty] = useState([])
  const [temp,setTemp]=useState()
  useEffect(()=>{
    async function fetchProperty(){
      const  response =  await axios.get(
          `http://localhost:3001/api/property/${lastItem}`
      );
      // console.log(response.data)
      setProperty(response.data);
      setTemp(response.data.price)
  }
  fetchProperty()
  },[])

  return (
    <div className="checkout">
      <p className="checkout-title">E-Mali Property Purchase</p>
      <p className="checkout-description">
        Buy property now via VISA,Mastercard etc.
      </p>
      <h1 className="checkout-price">$ {temp?.toLocaleString(navigator.language, { minimumFractionDigits: 0 })||''}</h1>
      <img
        className="checkout-product-image"
        src={`/uploads/${property.image_01}`}
        alt="Product"
      />
      <button
        className="checkout-button"
        onClick={redirectToCheckout}
        disabled={isLoading}
      >
        <div className="grey-circle">
          <div className="purple-circle">
            <img className="icon" src={CardIcon} alt="credit-card-icon" />
          </div>
        </div>
        <div className="text-container">
          <p className="text">{isLoading ? "Loading..." : "Buy"}</p>
        </div>
      </button>
    </div>
  );
};

export default Payment;
