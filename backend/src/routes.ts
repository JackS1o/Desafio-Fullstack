import { Router } from 'express';
import multer from 'multer';

const multerConfig = multer();

const router = Router();

router.post('/products', multerConfig.single('file'), (request, response) => {
  const { file } = request;
  console.log(file?.buffer.toString('utf-8'));
  return response.json({ message: 'ok' });
});

export { router };
