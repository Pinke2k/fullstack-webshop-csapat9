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

      if (!response.ok) {
        if (response.status === 500) {
          return [];
        }
        throw new Error('Hiba a megrendelés törlése közben');
      }
    } catch (error) {}
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
    } catch (error) {}
  },
};
