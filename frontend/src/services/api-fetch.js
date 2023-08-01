import { API_URL } from '../constants/constants';
import { token } from '../constants/constants';

export function readProducts() {
  return fetch(`${API_URL}/api/products`)
    .then((resp) => {
      if (!resp.ok) {
        throw new Error('Hiba a termékek lekérdezése során.');
      }
      return resp.json();
    })
    .catch((err) => {
      console.log(err.message);
    });
}

export function createProduct(formdata) {
  return fetch(`${API_URL}/api/products`, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${token}`,
    },
    body: formdata,
  }).then((response) => {
    if (!response.ok) {
      throw new Error('Hiba az új termék létrehozása során.');
    }
    return response.json();
  });
}

export function updateProduct(id, formdata) {
  console.log('productid', id);
  console.log('formdata', formdata);
  return fetch(`${API_URL}/api/products/${id}`, {
    method: 'PUT',
    headers: {
      authorization: `Bearer ${token}`,
    },
    body: formdata,
  })
    .then((data) => {
      if (!data.ok) {
        throw new Error('Hiba a termék frissítése során.');
      }
      return data.json();
    })
    .catch((err) => {
      console.log(err.message);
    });
}

export function deleteProduct(id) {
  return fetch(`${API_URL}/api/products/${id}`, {
    method: 'DELETE',
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
    .then((data) => {
      if (!data.ok) {
        throw (new Error('Hiba a termék törlése során.'), console.log('ez lefut3'));
      }
      return data, console.log('ez lefut5', data);
    })
    .catch((err) => {
      console.log(err.message);
    });
}

export function readUsers() {
  return fetch(`${API_URL}/api/users`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
    .then((resp) => {
      if (!resp.ok) {
        throw new Error('Hiba a termékek lekérdezése során.');
      }
      return resp.json();
    })
    .catch((err) => {
      console.log(err.message);
    });
}

export function getCategoryList() {
  return fetch(`${API_URL}/api/categories`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Hiba a kategórialista lekérésekor');
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error('Hiba a kategórialista lekérésekor:', error);
      throw error;
    });
}

export function updateCategory(id, name) {
  return fetch(`${API_URL}/api/categories/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name }),
  })
    .then((data) => {
      if (!data.ok) {
        throw new Error('Hiba a termék frissítése során.');
      }
      return data.json();
    })
    .catch((err) => {
      console.log(err.message);
    });
}

export function createCategory(name) {
  return (
    fetch(`${API_URL}/api/categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name }),
    })
      .then((data) => {
        if (!data.ok) {
          throw new Error('Hiba az új termék létrehozása során.');
        }
        return data.json();
      })
      //.then((resp) => setCategoryId(resp.name))
      .catch((err) => {
        console.log(err.message);
      })
  );
}

export function deleteCategory(id) {
  return fetch(`${API_URL}/api/categories/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  })
    .then((data) => {
      if (!data.ok) {
        throw new Error('Hiba a kategória törlése során.');
      }
      return data;
    })
    .catch((err) => {
      console.log(err.message);
    });
}
