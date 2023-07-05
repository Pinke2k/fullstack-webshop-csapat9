import usersService from '../services/users-service';
import sessionUtils from '../utils/sessionUtils';
import HttpError from '../utils/httpError';

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    console.log('email', email);

    if (!email || !password) {
      res.status(403).send({ errors: ['itt a hiba nevee'] });
      // throw new HttpError('Missing required parameter', 403);
    }

    const user = await usersService.login({ email, password });

    if (user) {
      const sessionID = sessionUtils.create(user, res);
      const sessionData = sessionUtils.get(sessionID);

      res.send({ ...sessionData, sessionID });
    } else {
      throw new HttpError('Invalid login credentials', 401);
    }
  } catch (error) {
    next(error);
  }
}

async function register(req, res, next) {
  try {
    const { email, password, username, permission } = req.body;
    if (!email || !password) {
      throw new HttpError('Missing required parameter', 403);
    }
    const userID = await usersService.register({ email, password, username, permission });
    console.log(userID);

    if (userID) {
      res.send({ succes: true });
    } else {
      throw new HttpError('Failed to create user', 500);
    }
  } catch (err) {
    next(err);
  }
}

export default {
  login,
  register,
};
