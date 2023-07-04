import cookiesUtils from '../utils/cookiesUtils';
import sessionUtils from '../utils/sessionUtils';

async function verifySession(req, res) {
  try {
    const sessionID = cookiesUtils.get(req, 'sessionID');

    const sessionData = sessionUtils.get(sessionID);
    console.log(sessionData);

    if (sessionData) {
      res.send({ ...sessionData, sessionID });
    } else {
      // A session nem található vagy érvénytelen
      res.status(401).json({ error: 'Unauthorized' });
    }
  } catch (error) {
    res.status(error.status || 500).send({ error: error.message });
  }
}
export default {
  verifySession,
};
