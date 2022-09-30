import { Request, Response, Router } from 'express';
import { Readable } from 'stream';
import readline from 'readline';
import multer from 'multer';
import IProducts from './database/inteface/productsInterface';
import client from './database/client';

const multerConfig = multer();

const router = Router();

router.post('/products', multerConfig.single('file'), async (req: Request, res: Response) => {
  const { file } = req;
  const { buffer } = file as any;

  const readFile = new Readable(); 
  readFile.push(buffer);
  readFile.push(null);

  const rl = readline.createInterface({
    input: readFile,
    crlfDelay: Infinity
  });

  const products: IProducts[] = [];
  let id = 1;

  for await (const line of rl) {
    const a = line.split(',');
    products.push({
      id: id,
      product: a[0],
      product_price: Number(a[1]),
      product_quantity: Number(a[2])
    });
    id += 1;
  }

  for await (const { product, product_price, product_quantity } of products) {
    await client.products.create({
      data: {
        product,
        product_price,
        product_quantity
      },
    })
  }
  return res.status(200).json(products);
});

export { router };
