import userService from '../services/user-service';

export default {
  findALL(req, res, next) {
    userService
      .findALL()
      .then((userData) => {
        res.status(200).send(userData);
      })
      .catch(next);
  },
  findOne(req, res, next) {
    const { id } = req.params;
    userService
      .findOne(id)
      .then((users) => {
        res.status(200).send(users);
      })
      .catch(next);
  },
  uppdateUser(req, res, next) {
    const { id } = req.params;
    const { email, username } = req.body;
    userService
      .updateUser({ id, email, username })
      .then((user) => {
        res.status(200).send({ user });
      })
      .catch(next);
  },
  delete(req, res, next) {
    const { id } = req.params;
    userService
      .delete(id)
      .then((resp) => res.status(200).send('ok'))
      .catch(next);
  },
};
