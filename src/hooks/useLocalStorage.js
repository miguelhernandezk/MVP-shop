import React from "react";

function useLocalStorage(itemName) {
    const [error, setError] = React.useState(false);

    const saveCart = (newItem) => {
        try{
            const stringifiedItem = JSON.stringify(newItem);
            localStorage.setItem(itemName, stringifiedItem);
        }catch(error){
            setError(true);
        }
    };

    return {
        saveCart,
        error
    };
}

export default useLocalStorage;