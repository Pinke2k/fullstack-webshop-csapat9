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


    export function createProduct(price, title, description, categoryId, url) {
        const productData = {
            title: title,
            price: price,
            description: description,
            categoryId: categoryId,
            url: url,
        };
    
        return fetch(`${API_URL}/api/products.json`, {
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
            .then((data) => {
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
            })
            .catch((error) => {
                console.log(error.message);
            });
    }


    export function updateProduct(id, name, price, description, ) {
        return fetch(`${API_URL}/api/categories/${id}.json`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, price, description,  }),
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
    

    