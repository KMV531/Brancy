import { writeClient } from "@/sanity/lib/client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const payload = await request.json();

    if (
      payload.eventType === "REQUEST.COMPLETED" &&
      payload.resource.status === "SUCCESSFUL"
    ) {
      const resourceId = payload.resource.requestId;
      const existingOrders = await writeClient.fetch(
        '*[_type == "order" && resourceId == $resourceId]',
        { resourceId }
      );

      if (existingOrders.length === 0)
        return NextResponse.json({ error: "Order not found" }, { status: 404 });

      const orderId = existingOrders[0]._id;

      await writeClient
        .patch(orderId)
        .set({
          paymentStatus: "completed",
          status: "paid",
          transactionId: payload.resource.transactionId,
          payerNote: payload.resource.payerNote || "",
          transactionTime: payload.resource.transactionTime || "",
        })
        .commit();

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}
