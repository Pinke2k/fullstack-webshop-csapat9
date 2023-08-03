import HttpError from '../utils/httpError';

export default function verifyAdmin(req, res, next) {
  if (req.user.isAdmin) next();
  else next(new HttpError('You do not have authorization', 403));
}
