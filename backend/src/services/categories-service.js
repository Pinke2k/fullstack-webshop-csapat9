import categoriesModel from '../database/models/category-model';

export default {
    create(payload){
        return categoriesModel.create(payload)
    },
    delete(payload){
        return categoriesModel.delete(payload)
    },
    getOne(payload){
        return categoriesModel.getOne(payload)
    },
    getAll(){
        return categoriesModel.getAll();
    },
    updateCategory(payload){
        return categoriesModel.updateCategory(payload)
    }
}