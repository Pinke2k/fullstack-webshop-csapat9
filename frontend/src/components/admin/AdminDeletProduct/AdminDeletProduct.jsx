
import { deleteProduct, readProducts } from '../../../services/api-fetch';
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";


export default function AdminDeleteProduct() {
	 const [productDelete, setProductDelete] = useState("");
	 const { id } = useParams();
	const navigate = useNavigate();



	
    useEffect(() => {
        readProducts().then((data) => {
            console.log("ezt keresem", data)
            const productToDelete = data.find(
                product => product.id = id)
            
            setProductDelete(productToDelete);
            console.log("amit torlok ",productToDelete)
            
        });
    }, [id]) 

	
function deleteProductfcn () {
		deleteProduct(id)
			.then(() => {
                
				navigate(`/admin/products/`);
				toast.success("A termék sikeresen törölve lett");
                console.log("ez lefut1")
			}) 
			.catch((err) => {
				console.error(err);
				toast.error("Hiba történt a termék törlése során");
                console.log("ez lefut2")
			});
            console.log("ez lefut3")
        }
         
	

	return (
		<div className="delete-product">
			<h3>
				Biztosan törölni
				<span className="delete-product-card"></span> szeretnéd ?
			</h3>
			<button className="delete-btn"  onClick={deleteProductfcn} >
				Törlés
			</button>
			<button className="cancel-btn" onClick={() => navigate(`/admin/products`)} >
				Mégse
			</button>
		</div>
	);
}




