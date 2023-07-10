import { API_URL } from '../constants/constants';

export default {
  userLogin(formData) {
    console.log(formData);
    return fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    }).then((resp) => resp.json());
  },
  userRegister(formData) {
    return fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
  },
};
