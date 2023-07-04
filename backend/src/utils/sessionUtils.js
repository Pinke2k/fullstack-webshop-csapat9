import cookiesUtils from './cookiesUtils';
import { nanoid } from 'nanoid';

const sessions = {};

export default {
  create(user, res) {
    const sessionID = nanoid(10);
    const sessionData = { userID: user.id, email: user.email };
    sessions[sessionID] = sessionData;

    cookiesUtils.set(res, 'sessionID', sessionID);
    return sessionID;
  },

  get(sessionID) {
    return sessions[sessionID];
  },
};
