import React, {useContext} from 'react';
import AppContext from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import {PayPalButton } from "react-paypal-button-v2";
import "../styles/components/Payment.css"

const Payment = () => {
    const { state, addNewOrder, emptyCart } = useContext(AppContext);
    const {cart, buyer} = state;
    const navigate = useNavigate();

    const paypalOptions = {
        clientId: process.env.PAYPAL_CLIENT_ID,
        intent: 'capture',
        currency: 'USD',
    }
    const buttonStyles = {
        layout: "vertical",
        shape: 'rect'
    }
    
    const handlePaymentSuccess = (data) => {
        if(data.status === "COMPLETED"){
            const newOrder = {
                buyer,
                product: cart,
                payment: data
            } 
            addNewOrder(newOrder);
            navigate('/checkout/success');
            emptyCart();
            localStorage.clear();

        }
    }

    const handleSumTotal = () => {
        const reducer = (acumulator, currentValue) => acumulator + currentValue.price;
        const sum = cart.reduce(reducer, 0);
        return sum;
    }

    return (
        <div className="Payment">
            <div className="Payment-content">
                <h3>Resumen del pedido</h3>
                {cart.map((item, index) =>(
                    <div className="Payment-item" key={index}>
                        <div className="Payment-element">
                            <h4>{item.title}</h4>
                            <span>${item.price}</span>
                        </div>
                    </div>
                ))}
                <div className="Payment-button">
                    <PayPalButton
                        paypalOptions={paypalOptions}
                        buttonStyles={buttonStyles}
                        amount={handleSumTotal()}
                        onPaymentStart={() => console.log("Start Payment")}
                        onSuccess={data => handlePaymentSuccess(data)}
                        onError={error => console.log(error)}
                        onCancel={data => console.log(data)}
                    />
                </div>
            </div>
            <div />
        </div>
    );
}

export default Payment;