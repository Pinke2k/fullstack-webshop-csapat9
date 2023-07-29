import orderService from "../services/orders-service"
import { nanoid } from "nanoid";
export default {
    getAllOrders(req, res, next){
        orderService.getAllOrders()
        .then(rows => {
            res.status(200).send(rows)
        })
        .catch(next)
    },
    createOrder(req, res, next){
        const { userId } = req.body;
        console.log(userId)
        const created = Date.now()
        const oneWeekLater = new Date(created + 7 * 24 * 60 * 60 * 1000);
        const deliveryDate = oneWeekLater.getTime();
        const isDone = false
        const id = nanoid(16)
        orderService.createOrder({ id, userId, created, isDone, deliveryDate })
        .then(resp => {
            res.status(200).send(resp)
        })
        .catch(next)
    },
    getUserOrders(req, res, next){
        const { userId } = req.params;
        orderService.getUserOrders(userId)
        .then(userOrders => {
            res.status(200).send(userOrders)
        })
        .catch(next)
    },
    deleteOrder(req, res, next){
    const { orderId } = req.params;
    orderService.deleteOrder(orderId)
    .then( resp => res.status(200).send(resp))
    .catch(next)
    },
    getOrderById(req, res, next){
        const { orderId } = req.params
        orderService.getOrderById(orderId)
        .then( rows => res.status(200).send(rows))
        .catch(next)
    }
}