import { updateOrderStatus } from "@/controllers/order.controller";
import { dbConnect } from "@/dbConnect/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{id: string}> },
) {
  try {
    await dbConnect();
    const body = await req.json();
    const { id } = await params;
    const updatedStatusOrder = await updateOrderStatus(req, {
        ...body,
      orderId: id,
    });
    return NextResponse.json(
      {
        success: true,
        message: "Order status updated successfully",
        updatedStatusOrder,
      },
      {
        status: 200,
      },
    );
  } catch (error: any) {
    console.log("Error from route: ", error.message);
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 400,
      },
    );
  }
}
