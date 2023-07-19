import { API_URL } from '../constants/constants';

export default {
  async getCartItems(id) {
    try {
      const response = await fetch(`${API_URL}/api/cart/${id}`);

      if (!response.ok) {
        if (response.status === 500) {
          return []; // Válasz helyett üres tömb
        }
        throw new Error('Hiba a kosártermékek lekérdezésénél');
      }

      const cartItems = await response.json();
      return cartItems;
    } catch (error) {
      console.log(error.message);
      return null; // Visszatérünk null értékkel, ha valamilyen hiba történik
    }
  },

  async createCartItem(userId, productId, quantity) {
    try {
      const response = await fetch(`${API_URL}/api/cart/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, productId, quantity }),
      });

      if (!response.ok) {
        throw new Error('Hiba a kosár elemek létrehozása közben');
      }

      const result = await response.json();
      console.log('Kosár elemek sikeresen létrehozva:', result);
    } catch (error) {
      console.error('Hiba a kosár elemek létrehozása közben:', error);
    }
  },
  async updateCart(id, productId, quantity) {
    if (!quantity) {
      throw new Error('Missing required parameter: quantity');
    }

    const url = `${API_URL}/api/cart/${id}`;
    const data = { productId, quantity };

    try {
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to update cart');
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error updating cart:', error);
      throw error;
    }
  },

  async deleteCartItem(userId) {
    try {
      const response = await fetch(`${API_URL}/api/cart/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) {
        throw new Error('Hiba a kosár törlése közben');
      }

      const result = await response.json();
      console.log('Kosár elemek sikeresen törölve:', result);
      // További műveletek a kapott válasszal
    } catch (error) {
      console.error('Hiba a kosár  törlése közben:', error);
    }
  },
};
