import { Request, Response } from "express";
import { Readable } from 'stream';
import readline from 'readline';
import IProducts from "../inteface/productsInterface";
import ProductService from "../service/productService";
export default class ProductsController {
  constructor(private service: ProductService) {}
  
  create = async (req: Request, res: Response) => {
    const { file } = req;
    const { buffer } = file as unknown as Buffer;

  const readFile = new Readable(); 
  readFile.push(buffer);
  readFile.push(null);

  const rl = readline.createInterface({
    input: readFile,
  });
  
  const products: IProducts[] = [];
  
  for await (const line of rl) {
    const product = line.split(',');
    products.push({
      product: product[0],
      product_price: Number(product[1]),
      product_quantity: Number(product[2])
    });
  }
  
  const result = await this.service.create(products);
  
  return res.status(200).json(result);
  }

  // getProducts = async (req: Request, res: Response) => {
  //   const result = await this.service.getProducts();
  //   return res.status(200).json(result);
  // }
}
