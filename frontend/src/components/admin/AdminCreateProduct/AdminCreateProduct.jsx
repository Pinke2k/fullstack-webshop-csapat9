import './AdminCreateProduct.css';
import { createProduct } from '../../../services/api-fetch';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function AdminCreateProduct(){
    const navigate = useNavigate();
    const [newProduct, setNewProduct] = useState ()
    const [newName, setNewName] = useState("");
	const [newPrice, setNewPrice] = useState("");
	const [newDescription, setNewDescription] = useState("");
    const [newAmount, SetNewAmount] = useState ("")
    const [newCategory, SetNewCategory] = useState("")

  /*  useEffect(() => {
		readProducts()
        .then((data) => {
            console.log("data",data)
			const productToUpdate = data.find(
				product => product.id = id,
                console.log("id", id)
                
			)
            console.log("ezt frissitem", productToUpdate)
			setNewProduct(productToUpdate);
			setNewName(productUpdate.name);
			setNewPrice(productUpdate.price);
			setNewDescription(productUpdate.description);
            SetNewAmount(productToUpdate.amount)
            //setNewCategory(productToUpdate.category)
		
		});
	}, [
		id,
		productUpdate.name,
		productUpdate.price,
		productUpdate.description,
        productUpdate.amount,
        //productUpdate.category
	]); */

    function handleNameChange(e) {
		setNewName(e.target.value);
        e.preventDefault()
	}

	function handlePriceChange(e) {
		setNewPrice(e.target.value);
        e.preventDefault()
	}

	function handleDescChange(e) {
		setNewDescription(e.target.value);
        e.preventDefault()
	}
    function handleAmountChange(e) {
		SetNewAmount(e.target.value);
        e.preventDefault()
	}
    function handleCategoryChange(e) {
		SetNewCategory(e.target.value);
        e.preventDefault()
	}
  

    function handleSubmit(e) {
		e.preventDefault();
		createProduct( newName, newPrice, newDescription, newAmount, /*category*/)
			//.then(() => fileUpload(id))
			.then(() => {
				navigate("/admin/products");
				//toast.success("Termék sikeresen módosítva!", {
					//position: toast.POSITION.TOP_RIGHT,});
			})
			.catch((error) => {
				//toast.error(`Hiba történt a termék módosítása közben: ${error.message}`, {
					//position: toast.POSITION.TOP_RIGHT,});
			})
	}

 
        return (
            <>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="title">Új név:</label>
                    <input
                        className="input"
                        maxLength={100}
                        id="title"
                        type="text"
                        value={newName}
                        onChange={handleNameChange}
                        required
                    />
    
                    <label htmlFor="price">Új ár:</label>
                    <input
                        className="input"
                        id="price"
                        type="number"
                        value={newPrice}
                        onChange={handlePriceChange}
                        required
                    />
    
                    <label htmlFor="description">Új leírás:</label>
                    <input
                        rows={8}
                        cols={30}
                        id="description"
                        type="text"
                        value={newDescription}
                        onChange={handleDescChange}
                        required
                    />
                    <label htmlFor="price">Új mennyiseg:</label>
                    <input
                        className="input"
                        id="price"
                        type="number"
                        value={newAmount}
                        onChange={handleAmountChange}
                        required
                    />
                   { /*<label htmlFor="category">kategóriák</label>
                    <select value={category} onChange={categoryChange}>
                        <option key={0} value={""}>
                            Válassz kategóriát!
                        </option>
                        {categoryList.map((category, idx) => {
                            return (
                                <option key={idx + 1} value={category.id}>
                                    {category.name}
                                </option>
                            );
                        })}
                    </select>
                    <label htmlFor="upload">File feltöltés</label>
                    <input name="image" type="file" onChange={handleUrlChange} /> */}
    
                    <button type='submit'>Mentés</button>
                </form>
                <button onClick={() => navigate("/admin/products")}>Mégsem</button>
            </>
        );
    
}