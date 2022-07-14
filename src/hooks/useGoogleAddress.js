import { useState, useEffect } from "react";
import axios from "axios";

const useGoogleAddress =  (address, apto, city, country, state, cp) => {
    const fullAddress = `${address} ${apto}, ${cp}, ${city}, ${state}, ${country}`;
    const [map, setMap] = useState({});
    const API = `https://maps.googleapis.com/maps/api/geocode/json?address=${fullAddress}&key=${process.env.GOOGLE_MAPS_API_KEY}`;

    useEffect(() => {
        async function handler(){
            const response = await axios(API);
            console.log(response.data); /* API is restricted, so map won't show */
            setMap(response.data.results[0].geometry.location);
            console.log(response.data.results[0].geometry.location);
        }
        handler();
    }, []);
    return map;
};

export default useGoogleAddress;