import './AdminCreateProduct.css';
import { createProduct } from '../../../services/api-fetch';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function AdminCreateProduct() {
  const navigate = useNavigate();
  const [newProduct, setNewProduct] = useState();
  const [newName, setNewName] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newAmount, SetNewAmount] = useState('');
  const [newCategory, SetNewCategory] = useState('');
  const [file, setFile] = useState();

  /*  useEffect(() => {
    readProducts().then((data) => {
      console.log('data', data);
      const productToUpdate = data.find((product) => (product.id = id), console.log('id', id));
      console.log('ezt frissitem', productToUpdate);
      setNewProduct(productToUpdate);
      setNewName(productUpdate.name);
      setNewPrice(productUpdate.price);
      setNewDescription(productUpdate.description);
      SetNewAmount(productToUpdate.amount);
      //setNewCategory(productToUpdate.category)
    });
  }, [
    id,
    productUpdate.name,
    productUpdate.price,
    productUpdate.description,
    productUpdate.amount,
    //productUpdate.category
  ]);*/

  function handleNameChange(e) {
    setNewName(e.target.value);
    e.preventDefault();
  }

  function handlePriceChange(e) {
    setNewPrice(e.target.value);
    e.preventDefault();
  }

  function handleDescChange(e) {
    setNewDescription(e.target.value);
    e.preventDefault();
  }
  function handleAmountChange(e) {
    SetNewAmount(e.target.value);
    e.preventDefault();
  }
  function handleCategoryChange(e) {
    SetNewCategory(e.target.value);
    e.preventDefault();
  }
  function upload() {
    // multipart kódolású adatok küldéséhez a fetchnek string helyett egy FormData
    // objektumot kell megadni
    const fd = new FormData();
    // a FormData objektumhoz az append metódussal tudunk felvenni egy kulcs-érték párt
    // - lényegében a `name` és a `value` attribútumok programmatikus megadása
    fd.append('picture', file);
    fd.append('filenewname', 'ujfile.jpg');

    fetch('http://localhost:8080/upload', {
      method: 'POST',
      // headers: { "Content-Type": "text/plain" },  // FIGYELEM: nem adjuk meg a Content-Type headert!
      // - ha nincs megadva, a böngésző fogja megpróbálni meghatározni
      body: fd,
    })
      .then((resp) => resp.text())
      .then((body) => console.log(body));
  }
  function handleFileChange(e) {
    // A kiválasztott képfájl beállítása az állapotba
    const selectedFile = e.target.files[0];
    console.log(selectedFile);
    setFile(selectedFile);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const formdata = {
      newName,
      newPrice,
      newDescription,
      newAmount,
      newCategory,
    };

    const fd = new FormData(e.target);
    fd.append('imageFile', file);

    createProduct(fd)
      .then(() => {
        navigate('/admin/products');
        toast.success('Termék sikeresen létrehozva!', {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((error) => {
        toast.error(`Hiba történt a termék létrehozása közben: ${error.message}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
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
          name="name"
          value={newName}
          onChange={handleNameChange}
          required
        />

        <label htmlFor="price">Új ár:</label>
        <input
          className="input"
          id="price"
          type="number"
          name="price"
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
          name="description"
          value={newDescription}
          onChange={handleDescChange}
          required
        />
        <label htmlFor="amount">Új mennyiseg:</label>
        <input
          className="input"
          id="amount"
          type="number"
          name="amount"
          value={newAmount}
          onChange={handleAmountChange}
          required
        />
        {/* <label htmlFor="category">kategóriák</label>
        <select value={category} onChange={categoryChange}>
          <option key={0} value={''}>
            Válassz kategóriát!
          </option>
          {categoryList.map((category, idx) => {
            return (
              <option key={idx + 1} value={category.id}>
                {category.name}
              </option>
            );
          })}
        </select> */}
        <input type="file" onChange={handleFileChange} />

        {/* <button onClick={upload}>upload</button> */}

        <button type="submit">Mentés</button>
      </form>
      <button onClick={() => navigate('/admin/products')}>Mégsem</button>
    </>
  );
}
