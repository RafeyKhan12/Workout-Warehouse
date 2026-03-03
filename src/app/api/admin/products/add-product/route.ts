import { createProduct } from "@/controllers/product.controller";
import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/dbConnect/dbConnect";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.formData();
    const data: any = {
      name: body.get("name") as string,
      description: body.get("description") as string,
      price: Number(body.get("price")),
      stock: Number(body.get("stock")),
      productImg: body.get("productImg") as string,
    };
    const product = await createProduct(data);

    return NextResponse.json(
      {
        success: true,
        product,
        message: "Product created successfully",
      },
      {
        status: 201,
      },
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 401,
      },
    );
  }
}
