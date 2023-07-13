import { API_URL } from '../constants/constants';


    export function readProducts() {
        return fetch(`${API_URL}/api/products`)
            .then((resp) => {
                if (!resp.ok) {
                    throw new Error("Hiba a termékek lekérdezése során.");
                }
                return resp.json();
            })
            .catch((err) => {
                console.log(err.message);
            });
    }