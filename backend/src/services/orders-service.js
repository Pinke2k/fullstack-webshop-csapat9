import orderModel from '../database/models/orders-model'
import cartModel from '../database/models/cart-model'

export default {
    async createOrder(payload){
        const cartItems = await cartModel.getOne(payload.userId)
        cartModel.deleteCartIdByUserId(payload.userId)
        return orderModel.createOrder(payload,cartItems)
    },
    getAllOrders(){
       return orderModel.getAllOrders()
    },
    getUserOrders(payload){
        return orderModel.getUserOrders(payload)
    },
    deleteOrder(payload){
       return orderModel.deleteOrder(payload)
    }
}