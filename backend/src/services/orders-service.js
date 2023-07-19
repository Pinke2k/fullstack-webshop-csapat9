import orderModel from '../database/models/orders-model'
import cartModel from '../database/models/cart-model'

export default {
    createOrder(payload){
        cartModel.deleteCartIdByUserId(payload.userId)
        return orderModel.createOrder(payload)
    },
    getAllOrders(){
       return orderModel.getAllOrders()
    },
    getUserOrders(payload){
        return orderModel.getUserOrders(payload)
    }    
}