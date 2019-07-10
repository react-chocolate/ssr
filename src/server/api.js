import { Router } from 'express';

const router = Router();

router.get('*', (req, res) => {
  res.send('Esta es la API y no hay nada! :D');
})

export default router;
