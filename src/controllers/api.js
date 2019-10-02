import { Router } from 'express';

const router = Router();

router.get('/add', (req, res) => {
  res.status(200).json({ code: 200, message: 'Added' });
});

router.get('/delete', (req, res) => {
  res.status(200).json({ code: 200, message: 'Removed' });
});

export default router;