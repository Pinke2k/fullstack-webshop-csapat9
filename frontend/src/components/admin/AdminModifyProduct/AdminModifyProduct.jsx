import './AdminModifyProduct.css';

import { updateProduct, readProducts } from '../../../services/api-fetch';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getCategoryList, updateCategory } from '../../../services/api-fetch';

export default function AdminUpdateProduct() {
  const [productUpdate, setProductUpdate] = useState({});
  const { id } = useParams('productId');
  const navigate = useNavigate();
  const [newName, setNewName] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [categoryList, setCategoryList] = useState();
  const [file, setFile] = useState();

  useEffect(() => {
    readProducts().then((data) => {
      console.log(data, id);
      const productToUpdate = data.find((product) => product.id === id);
      console.log(productToUpdate);
      setProductUpdate(productToUpdate);
    });
  }, []);

  useEffect(() => {
    getCategoryList().then((data) => {
      setCategoryList(data.map((elem) => elem));
    });
  }, []);

  function handleNameChange(e) {
    e.preventDefault();
    setProductUpdate({ ...productUpdate, name: e.target.value });
  }

  function handlePriceChange(e) {
    e.preventDefault();
    setProductUpdate({ ...productUpdate, price: e.target.value });
  }

  function handleDescChange(e) {
    e.preventDefault();
    setProductUpdate({ ...productUpdate, description: e.target.value });
  }
  function handleAmountChange(e) {
    e.preventDefault();
    setProductUpdate({ ...productUpdate, amount: e.target.value });
  }
  function handleCategoryChange(e) {
    //e.preventDefault()

    setProductUpdate({ ...productUpdate, categoryId: e.target.value });
  }
  function handleFileChange(e) {
    const selectedFile = e.target.files[0];
    console.log(selectedFile);
    setFile(selectedFile);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const fd = new FormData(e.target);
    fd.append('imageFile', file);

    updateProduct(id, fd)
      .then(() => {
        navigate('/admin/products');
        toast.success('Termék sikeresen módosítva!', {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((error) => {
        toast.error(`Hiba történt a termék módosítása közben: ${error.message}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  }

  return (
    <>
      <div className="modifyProduct">
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Új név:</label>
          <input
            className="input"
            maxLength={100}
            id="title"
            type="text"
            name="name"
            value={productUpdate?.name}
            onChange={handleNameChange}
            required
          />

          <label htmlFor="price">Új ár:</label>
          <input
            className="input"
            id="price"
            type="number"
            name="price"
            value={productUpdate?.price}
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
            value={productUpdate?.description}
            onChange={handleDescChange}
            required
          />
          <label htmlFor="amount">Új mennyiseg:</label>
          <input
            className="input"
            id="amount"
            type="number"
            name="amount"
            value={productUpdate?.amount}
            onChange={handleAmountChange}
            required
          />
          <label htmlFor="category">kategóriák</label>
          <select
            name="categoryId"
            value={productUpdate?.categoryId}
            onChange={handleCategoryChange}
          >
            <option key={0}>Válassz kategóriát!</option>
            {categoryList?.map((category, idx) => {
              return (
                <option key={idx + 1} value={category.id}>
                  {category.name}
                </option>
              );
            })}
          </select>
          <input type="file" onChange={handleFileChange} />

          {/* <button onClick={upload}>upload</button> */}

          <button type="submit">Mentés</button>
          <button onClick={() => navigate('/admin/products')}>Mégsem</button>
        </form>
      </div>
    </>
  );
}
