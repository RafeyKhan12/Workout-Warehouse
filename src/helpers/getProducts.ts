import { dbConnect } from "@/dbConnect/dbConnect";
import { Product } from "@/models/product.model";


export async function getProducts() {
  try {
    await dbConnect();
    const products = await Product.find({});
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}