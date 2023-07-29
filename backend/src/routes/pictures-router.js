import express from 'express';
import path from 'path';

const router = express.Router();

router.get('/src/uploads/:imgpath', (req, res) => {
  const { imgpath } = req.params;
  res.sendFile(path.resolve(`./src/uploads/${imgpath}`));
});

export default router;
