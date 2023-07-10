import usersModel from '../database/models/users-model';

export default {
  findALL() {
    return usersModel.getALL().then((userData) => {
      const simplifiedData = userData.map(({ id, email, is_admin }) => ({ id, email, is_admin }));

      console.log(simplifiedData);

      return simplifiedData;
    });
  },

  findOne(payload) {
    return usersModel.readById(payload);
  },
  updateUser(payload) {
    return usersModel.updateUser(payload);
  },
  delete(payload) {
    return usersModel.delete(payload);
  },
};
