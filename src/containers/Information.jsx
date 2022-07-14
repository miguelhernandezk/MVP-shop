import React, {useRef, useContext} from 'react';
import { Link, useNavigate } from "react-router-dom";
import AppContext from '../context/AppContext';
import "../styles/components/Information.css"

const Information = () => {
    const {state, addToBuyer } = useContext(AppContext);
    const form = useRef(null);
    const navigate = useNavigate();
    const {cart} = state;

    const handleSubmit = () => {
        const formData = new FormData(form.current);
        const buyer = {
            'name': formData.get('name'),
            'email': formData.get('email'),
            'address': formData.get('address'),
            'apto': formData.get('apto'),
            'city':  formData.get('city'),
            'country': formData.get('country'),
            'state':  formData.get('state'),
            'cp': formData.get('cp'),
            'phone': formData.get('phone'),
        }
        addToBuyer(buyer);
        navigate('/checkout/payment')
    }

    return (
        <div className="information">
            <div className="Information-content">
                <div className="Information-head">
                    <h2>Información de contacto:</h2>
                </div>
                <div className="Information-form">
                    <form ref={form}>
                        <input type="text" placeholder="Nombre completo" name="name" required/>
                        <input type="text" placeholder="Correo electrónico" name="email" required/>
                        <input type="text" placeholder="Dirección" name="address" required/>
                        <input type="text" placeholder="Apto" name="apto" />
                        <input type="text" placeholder="Ciudad" name="city" required/>
                        <input type="text" placeholder="Estado" name="state" required/>
                        <input type="text" placeholder="País" name="country" required/>
                        <input type="text" placeholder="Código postal" name="cp" required/>
                        <input type="text" placeholder="Teléfono" name="phone" required/>
                    </form>
                </div>
                <div className="Information-buttons">
                    <div className="Information">
                        <Link to="/checkout">
                            Regresar
                        </Link>
                    </div>
                    <div className="Information">
                        <button type="button" onClick={handleSubmit}>Pagar</button>
                    </div>
                </div>
            </div>
            <div className="Information-sidebar">
                <h3>Pedido</h3>
                {cart.map((item, index) => (
                    <div className="Information-item" key={index}>
                    <div className="Information-element">
                        <div>
                            <img src={item.image} alt={item.title} />
                            <h4>{item.title}</h4>
                        </div>
                        <span>${item.price}</span>
                    </div>
                    </div>
                ))}
                
            </div>
        </div>
    );
}

export default Information;