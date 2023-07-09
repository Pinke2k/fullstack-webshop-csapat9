import authService from '../services/auth-service';

export default {
  login(req, res, next) {
    const { email, password } = req.body;
    authService
      .login({ email, password })
      .then(({ accessToken }) => {
        res.status(200).send({ accessToken });
      })
      .catch(next);
  },
  register(req, res, next) {
    const { email, password } = req.body;
    authService
      .register({ email, password })
      .then((user) => {
        res.status(200).send(user);
      })
      .catch((err) => next(err));
  },
};
