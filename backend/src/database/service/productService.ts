import client from "../client";
import IProducts from "../inteface/productsInterface";

export default class ProductService {
  create = async (products: IProducts[]) => {
    const list = [];
    for await (const { product, product_price, product_quantity } of products) {
      // await client.products.deleteMany({
      //   where: {
      //     product,
      //   },
      // });

      const result = await client.products.create({
        data: {
          product,
          product_price,
          product_quantity,
        },
      });
      list.push(result);
    }
    return list;
  };

  // getProducts = async () => {
  //   const result = await client.products.findMany();
  //   return result;
  // }
}
