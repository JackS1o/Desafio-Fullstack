import { Request, Response } from "express";
import { Readable } from 'stream';
import readline from 'readline';
import IProducts from "../inteface/productsInterface";
import ProductService from "../service/productService";

export default class ProductsController {
  constructor(private service: ProductService) {}
  create = async (req: Request, res: Response) => {
    const { file } = req;
    const { buffer } = file as any;

  const readFile = new Readable(); 
  readFile.push(buffer);
  readFile.push(null);

  const rl = readline.createInterface({
    input: readFile,
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
  
  const result = await this.service.create(products);

  return res.status(200).json(result);
  }
}
