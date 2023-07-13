import HttpError from '../utils/httpError';
import cartsService from '../services/carts-service'

export default {
    addToCart(req, res, next){
        const {userID, productID, amount, price} = req.body
        if(!userID || !productID || !amount || !price) throw new HttpError('Missing required parameter', 400);
        cartsService.addToCart({ userID, productID, amount, price })
        .then( id => res.status(200).send(id))
        .catch(next);
    },
    deleteItem(req, res, next){
        const { id } = req.params
        if(!id) throw new HttpError('Missing required parameter', 400);
        cartsService.deleteItem(id)
        .then( resp => res.status(200).send(resp))
        .catch(next);
    },
    updateItem(req, res, next){
        const { id } = req.params;
        const { amount, price } = req.body;
        if(!id) throw new HttpError('Missing required parameter', 400);
        cartsService.updateItem({id, amount, price})
        .then( resp => res.status(200).send(resp))
        .catch(next);
    },
    getCart(req, res, next){
        const { id } = req.params
        cartsService.getCart(id)
        .then(cart => res.status(200).send(cart))
        .catch(next)
    }
}