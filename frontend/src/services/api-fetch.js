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


    export function createProduct( name, price, description, amount, category="besorolatlan" ) {
        const productData = {
            name: name,
            price: price,
            description: description,
            amount,
            category: category,
            //url: url,
        };
    
        return fetch(`${API_URL}/api/products`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(productData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Hiba az új termék létrehozása során.");
                }
                return response.json();
            })
            /*.then((data) => {
                const productId = data.name;
                return fetch(`${API_URL}termekek/${productId}.json`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id: productId,
                        categoryId: categoryId,
                        url: url,
                    }),
                });
            }) */
            .catch((error) => {
                console.log(error.message);
            });
    }


    export function updateProduct(id, name, price, description, amount ) {
        return fetch(`${API_URL}/api/products/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, price, description, amount }),
        })
            .then((data) => {
                if (!data.ok) {
                    throw new Error("Hiba a termék frissítése során.");
                }
                return data.json();
            })
            .catch((err) => {
                console.log(err.message);
            });
    }


    export function deleteProduct(id) {
        return fetch(`${API_URL}/api/products/${id}`, {
            method: "DELETE",
        })
            .then((data) => {
                if (!data.ok) {
                    throw new Error("Hiba a termék törlése során."),
                    console.log("ez lefut3")
                }
                return data,
                console.log("ez lefut5", data)
            })
            .catch((err) => {
                console.log(err.message);
            });
    }
    

    export function readUsers() {
        return fetch(`${API_URL}/api/users`)
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