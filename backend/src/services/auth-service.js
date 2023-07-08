import usersModel from '../database/models/users-model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import HttpError from '../utils/httpError';
import { JWT_SECRET_KEY } from '../constants';

export default {
  register({ email, password }) {
    if (!email || !password) throw new HttpError('Missing required paramater', 400);
    if (password.length < 6) throw new HttpError('Weak password', 400);

    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt);

    return usersModel.create({ email, passwordHash });
  },
  login({ email, password }) {
    if (!email || !password) throw new HttpError('Missing fields', 400);

    return usersModel.getEmail(email).then((userWithPwHash) => {
      console.log('jelszó hash', userWithPwHash);
      const { passwordHash, ...user } = userWithPwHash;
      console.log('user ', user);
      const isValidPassword = bcrypt.compareSync(password, passwordHash);

      if (!isValidPassword) throw new HttpError('Invalid email/password', 400);
      const token = jwt.sign(user, JWT_SECRET_KEY, { expiresIn: '12h' });
      return { accessToken: token };
    });
  },
};
