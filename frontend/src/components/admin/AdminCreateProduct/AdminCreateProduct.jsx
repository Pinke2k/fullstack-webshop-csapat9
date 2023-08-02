import './AdminCreateProduct.css';
import { createProduct } from '../../../services/api-fetch';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getCategoryList } from '../../../services/api-fetch';

export default function AdminCreateProduct() {
  const navigate = useNavigate();
  const [newProduct, setNewProduct] = useState();
  const [newName, setNewName] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newAmount, SetNewAmount] = useState('');
  const [newCategory, SetNewCategory] = useState('');
  const [categoryList, setCategoryList] = useState();
  const [file, setFile] = useState();

  useEffect(() => {
    getCategoryList().then((data) => {
      setCategoryList(data);
    });
  }, []);

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

  function handleFileChange(e) {
    const selectedFile = e.target.files[0];
    console.log(selectedFile);
    setFile(selectedFile);
  }

  function handleSubmit(e) {
    e.preventDefault();

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
    <form onSubmit={handleSubmit}>
      <div className="form-group">
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
      </div>

      <div className="form-group">
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
      </div>

      <div className="form-group">
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
      </div>

      <div className="form-group">
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
      </div>

      <div className="form-group">
        <label htmlFor="category">Kategóriák:</label>
        <select name="categoryId" value={newCategory} onChange={handleCategoryChange}>
          <option key={0} value={''}>
            Válassz kategóriát!
          </option>
          {categoryList?.map((category, idx) => {
            return (
              <option key={idx + 1} value={category.id}>
                {category.name}
              </option>
            );
          })}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="image">Kép feltöltése:</label>
        <input type="file" onChange={handleFileChange} />
      </div>

      <div className="button-group">
        {/* <button onClick={upload}>upload</button> */}
        <button type="submit">Mentés</button>
        <button onClick={() => navigate('/admin/products')}>Mégsem</button>
      </div>
    </form>
  );
}
