import cartsModel from '../database/models/cart-model';

export default {
    addToCart(payload){
       return cartsModel.addToCart(payload);
    },
    deleteItem(payload){
        return cartsModel.deleteItem(payload);
    },
    updateItem(payload){
        return cartsModel.updateItem(payload);
    },
    getCart(payload){
        return cartsModel.getCart(payload)
    }
}