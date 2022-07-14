import {useState} from "react";
import useLocalStorage from "./useLocalStorage";
import initialState from "../initialState";

const useInitialState = () => {
    const {saveCart, error} = useLocalStorage("Shopping_cart")
    const [state, setState] = useState(!localStorage.getItem("Shopping_cart") ? initialState :  JSON.parse(localStorage.getItem("Shopping_cart")));

    const emptyCart = () =>{
        setState({
            ...state,
            cart: [], 
        })
    }

    const addToCart = payload =>{
        const newCart = {
            ...state, 
            cart: [...state.cart, payload]
        }; 
        saveCart(newCart);
        setState({
            ...state,
            cart: [...state.cart, payload],
        })
    }

    const removeFromCart = (payload,indexToRemove) => {
        const newCartNoItem = [...state.cart];
        newCartNoItem.splice(indexToRemove, 1);
        const newCart = {
            ...state, 
            cart: [...newCartNoItem]
        }; 
        saveCart(newCart);
        setState({ 
            ...state,
            cart: state.cart.filter((items, index) => items.id !== payload.id || indexToRemove !== index),
        })
    }

    const addToBuyer = payload => {
        setState({
            ...state,
            buyer: [...state.buyer, payload],
        })
    }

    const addNewOrder = payload => {
        setState({
            ...state,
            order: [...state.orders, payload],
        })
    }

    return {
        addToCart,
        removeFromCart,
        addToBuyer,
        addNewOrder,
        state,
        emptyCart
    }
};

export default useInitialState;