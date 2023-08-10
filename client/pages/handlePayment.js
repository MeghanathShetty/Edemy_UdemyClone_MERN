import axios from 'axios';
import {useState,useContext,useEffect} from 'react';
import Script from "next/script";
import {Context} from "../context";
import { useRouter } from "next/router";



const payment=()=>{

	// state
	const {state}=useContext(Context);
	const {user}=state;
	// router
	const router=useRouter();

	useEffect(()=>
	{	
	if(user!==null) 
			router.push('/login');
	},[user]);


    const[book,setBook]=useState({
        name:'The Fault in Our Stars',
        author:'John Green',
        price:250,

    });
    //iniatialize payment
    const initPayment = (data) => {

		const options = {
			key: "",
			amount: data.amount,
			currency: data.currency,
			name: book.name,
			description: "Test Transaction",
			image: book.img,
			order_id: data.id,
			handler: async (response) => {
				try {
					const verifyUrl = "/api/payment/verify";
					const { data } = await axios.post(verifyUrl, response);
					console.log(data);
				} catch (error) {
					console.log(error);
				}
			},
			theme: {
				color: "#3399cc",
			},
		};
		const rzp1 = new window.Razorpay(options);
		rzp1.open();
	};

    //handle payment button

    const handlePayment=async()=>{
		console.log("ehhp")
        try{
            const orderURL="/api/payment/order";
            const {data} = await axios.post(orderURL,{amount:book.price});
            console.log(data);
            initPayment(data);
        }catch(err){
            console.log(err);
        }
    }
    return(
        <>
		 <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
        <h1 className="jumbotron bg-primary square text-center">Make Payment</h1>
        <div className="container col-md-4 offset-md-4 pb-5">
				<p className="book_name">{book.name}</p>
				<p className="book_author">By {book.author}</p>
				<p className="book_price">
					Price : <span>&#x20B9; {book.price}</span>
				</p>
				<button onClick={handlePayment}  className="buy_btn">
					buy now
				</button>
			</div>
        </>
    )
}

export default payment;