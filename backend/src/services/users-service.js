import usersModel from '../database/models/users-model';

export default {
  login(payload) {
    console.log(payload);
    return usersModel.login(payload);
  },
  register(payload) {
    console.log('register payload', payload);
    return usersModel.register(payload);
  },
};
