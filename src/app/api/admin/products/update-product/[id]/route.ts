import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/dbConnect/dbConnect";
import { editProduct } from "@/controllers/product.controller";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const body = await req.formData();
    const updateData: any = {
      name: body.get("name") as string,
      description: body.get("description") as string,
      price: Number(body.get("price")),
      stock: Number(body.get("stock")),
      productImg: body.get("productImg") as string,
    };
    const { id } = await params;
    const product = await editProduct(updateData, id);
    return NextResponse.json({
      success: true,
      message: "Product updated successfully",
      product
    },
    {
      status: 200
    }
  )
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: "Product update failed",
      },
      {
        status: 400,
      },
    );
  }
}
