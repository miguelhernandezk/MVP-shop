import React, {useContext} from 'react';
import { Link } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import AppContext from "../context/AppContext";
import "../styles/components/Checkout.css"

const Checkout = () => {
    const {state, removeFromCart} = useContext(AppContext);
    const {cart} = state;

    const handleRemoveFromCart = (product, index) => () => {
        removeFromCart(product, index);
    };

    const handleSumTotal = () => {
        const reducer = (acumulator, currentValue) => acumulator + currentValue.price;
        const sum = cart.reduce(reducer, 0);
        return sum;
    };

    return (
        <div className="Checkout">
            <div className="Checkout-content">
                {cart.length > 0 ? <h3>Lista de pedidos</h3> : <h3>Lista sin pedidos</h3>}
                {cart.map((item, index) => (
                    <div key={index} className="Checkout-item">
                    <div className="Checkout-element">
                        <div>
                            <img src={item.image} alt={item.title} />
                            <h4>{item.title}</h4>
                        </div>
                        <span> $ {item.price}</span>
                    </div>
                    <button type="button" onClick={handleRemoveFromCart(item, index)}>
                        <span className="fas"><FaTrashAlt/></span>
                    </button>
                </div>
                ))}
            </div>
            {cart.length > 0 && (
                <div className="Checkout-sidebar">
                    <h3>{`Precio total: $ ${handleSumTotal()}`}</h3>
                    <Link to="/checkout/information">
                        <button type="button">Continuar</button>
                    </Link>
                </div>
            )}
        </div>
    );
}

export default Checkout;