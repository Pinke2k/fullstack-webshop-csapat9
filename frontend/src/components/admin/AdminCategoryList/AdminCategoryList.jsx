import './AdminCategorylist.css';
import { useEffect, useState } from 'react';
import { getCategoryList } from '../../../services/api-fetch';
import { useNavigate } from 'react-router-dom';

export default function AdminProducts() {
  const [categoryList, setCategoryList] = useState();
  //const [SortedList, setSortedList] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    getCategoryList().then((category) => {
      setCategoryList(category);
      console.log(category);
    });
  }, []);

  console.log('fdgd', categoryList);

  function CreateCategory() {
    navigate(`/admin/categories/new-category`);
  }

  function ModifyCategory(id) {
    navigate(`/admin/categories/${id}/update`);
  }

  function DeleteCategory(id) {
    navigate(`/admin/categories/${id}/delete`);
  }

  return (
    <>
      <div className="button-container">
        <button className="new-category" onClick={() => CreateCategory()}>
          {' '}
          Új Kategória
        </button>
      </div>
      <label htmlFor="category">Kategóriák</label>
      <div className="category-box">
        {categoryList?.map((category, idx) => {
          return (
            <div key={idx + 10}>
              {' '}
              {category.name}
              <button
                className="modify-category"
                key={category.id}
                onClick={() => ModifyCategory(category.id)}
              >
                {' '}
                Módosit
              </button>
              <button className="delete-category" onClick={() => DeleteCategory(category.id)}>
                {' '}
                Törlöl
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}
