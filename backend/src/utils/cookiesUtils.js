export default {
  set(res, name, value, options = {}) {
    res.cookie(name, value, options);
  },

  get(req, name) {
    return req.cookies[name];
  },

  clear(res, name) {
    res.clearCookie(name);
  },
};
