import categoriesService from '../services/categories-service';
import HttpError from '../utils/httpError';

export default {
    create(req, res, next){
        const { name } = req.body
        if( !name ) throw new HttpError('missing required parameter', 400);
        if( name.length < 4 ) throw new HttpError('parameter length has to be 4 or greater', 400);
        categoriesService.create(name)
        .then(name => res.status(201).send(name))
        .catch(next)
    },
    delete(req, res, next){
        const { id } = req.params
        if( id.length < 16 ) throw new HttpError('there is no category with this id', 400);
        categoriesService.getOne(id)
        .then(resp => {
            console.log(resp)
            if(!resp) res.status(400).send(`there is no category with this id: ${id}`)
            else{
                categoriesService.delete(id)
                .then(resp => res.status(200).send("deleted succesfully"))
                .catch(next);
            }
        })
        .catch(next);
    },
    getOne(req, res, next){
        const { id } = req.params
        categoriesService.getOne(id)
        .then(row => {
            console.log(row)
            if(!row) res.status(400).send(`there is no category with this id: ${id}`)
            else{
                res.status(200).send(row)
            }
        })
        .catch(next)
    },
    getAll(req, res, next){
        categoriesService.getAll()
        .then(rows => res.status(200).send(rows))
        .catch(next)
    },
    updateCategory(req, res, next){
        const { id } = req.params;
        const { name } = req.body;
        if( !name ) throw new HttpError('missing required parameter', 400);
        if( name.length < 4 ) throw new HttpError('parameter length has to be 4 or greater', 400);
        categoriesService.getOne(id)
        .then(resp => {
            if(!resp) res.status(400).send(`there is no category with this id: ${id}`)
            else{
                categoriesService.updateCategory({ id, name })
                .then( resp => res.status(201).send(resp))
                .catch(next);
            }
        })
        .catch(next);
    }
}