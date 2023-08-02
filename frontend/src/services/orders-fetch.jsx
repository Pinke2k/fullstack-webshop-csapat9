import { API_URL } from '../constants/constants';
import { token } from '../constants/constants';

export default {
  getOrders(userId) {
    try {
      return fetch(`${API_URL}/api/orders/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: 'GET',
      });
    } catch (error) {
      console.log(error.message);
      return null;
    }
  },
  deleteOrder(orderId) {
    try {
      const response = fetch(`${API_URL}/api/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: 'DELETE',
      });
    } catch (error) {
      console.log(error.message);
      return null;
    }
  },
  setOrder(userId) {
    try {
      return fetch(`${API_URL}/api/orders`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      }).then(resp.json());
    } catch (error) {
      console.log(error.message);
      return null;
    }
  },
  allOrders() {
    try {
      return fetch(`${API_URL}/api/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        method: 'GET',
      }).then((resp) => resp.json());
    } catch (error) {
      console.log(error.message);
      return null;
    }
  },
  async orderById(orderId) {
    const result = await fetch(`${API_URL}/api/orders/details/${orderId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }).then((resp) => resp.json());
    return result;
  },
};
