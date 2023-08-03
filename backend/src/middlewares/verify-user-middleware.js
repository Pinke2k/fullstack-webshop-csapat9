import HttpError from '../utils/httpError';

export default function verifyUser(req, res, next) {
  if (req.user.isAdmin) next();
  else if (req.params.id === req.user.id) next();
  else next(new HttpError('You do not have authorization', 403));
}
