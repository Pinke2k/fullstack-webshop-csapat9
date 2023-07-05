import sessionUtils from '../utils/sessionUtils';

async function verifySession(req, res) {
  try {
    const { sessionID } = req.body;
    console.log('verify', sessionID);

    const sessionData = sessionUtils.get(sessionID);

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
