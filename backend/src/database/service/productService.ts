import client from "../client";

export default class ProductService {
  create = async (products: any) => {
    const list = [];
    for await (const { product, product_price, product_quantity } of products) {
      const result = await client.products.create({
        data: {
          product,
          product_price,
          product_quantity
        },
      });
      list.push(result);
    }
    return list;
  };
}


// const result = await Promise.all(products.map(async (pro: any) => {
//   const { product, product_price, product_quantity } = pro;
//   await client.products.create({
//     data: {
//       product,
//       product_price,
//       product_quantity,
//     },
//   });
// }));
// console.log(result);

// return result;