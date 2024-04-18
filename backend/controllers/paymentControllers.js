import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import Order from "../models/order.js";

import Stripe from "stripe";
// 1) 初始化 Stripe
const stripe = Stripe(process.env.STRIPE_SECRET_KET);

// TODO: 建立 Stripe 結帳端點 => /api/v1/payment/checkout_session
export const stripeCheckoutSession = catchAsyncErrors(
  async (req, res, next) => {
    // 2) 設定運費
    const body = req?.body;

    const shipping_rate =
      body?.itemsPrice >= 2000
        ? "shr_1P62VMCq5oWqyU7yu0KL9qhd"
        : "shr_1P62UkCq5oWqyU7yYkXA0y3x";

    // 5) 設定送貨地址
    const shippingInfo = body?.shippingInfo;

    // 3) 設定商品
    const line_items = body?.orderItems.map((item) => {
      return {
        price_data: {
          currency: "twd",
          product_data: {
            name: item?.name,
            images: [item?.image],
            metadata: {
              productId: item?.product,
            },
          },
          unit_amount: item?.price * 100, // 金額
        },
        tax_rates: ["txr_1P62xVCq5oWqyU7ypul6yGYq"], // 稅率
        quantity: item?.quantity, // 數量
      };
    });

    // 4) 紀錄客戶資訊、金額、訂單資訊、付款方式等等
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"], // 付款方式
      success_url: `${process.env.FRONTEND_URL}/me/orders?order_success=true`, // 付款成功後導向
      cancel_url: `${process.env.FRONTEND_URL}`, // 付款取消後導向
      customer_email: req?.user?.email, // 顧客 Email
      client_reference_id: req?.user?._id?.toString(), // 訂單 ID
      mode: "payment", // 付款模式
      metadata: {
        ...shippingInfo, // 送貨資訊
        itemsPrice: body?.itemsPrice, // 商品價格
      }, // 送貨資訊
      shipping_options: [
        {
          shipping_rate,
        },
      ], // 運費
      line_items, // 商品
    });
    res.status(200).json({
      url: session.url,
    });
  }
);

// 設定 Stripe Webhook，用來接收付款成功後的建立新的訂單 => /api/v1/payment/webhook

const getOrderItems = async (line_items) => {
  return new Promise((resolve, reject) => {
    let cartItems = [];

    line_items?.data?.forEach(async (item) => {
      const product = await stripe.products.retrieve(item.price.product);
      const productId = product.metadata.productId;
      cartItems.push({
        product: productId,
        name: product.name,
        quantity: item.quantity,
        price: item.price.unit_amount_decimal / 100,
        quantity: item.quantity,
        image: product.images[0],
      });
      if (cartItems.length === line_items?.data?.length) {
        resolve(cartItems);
      }
    });
  });
};

export const stripeWebhook = catchAsyncErrors(async (req, res, next) => {
  try {
    const signature = req.headers["stripe-signature"]; // 取得簽名
    // 6) 驗證簽名
    const event = stripe.webhooks.constructEvent(
      req.rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
    // 7) 處理事件
    if (event.type === "checkout.session.completed") {
      const session = event.data.object; // 取得訂單
      const line_items = await stripe.checkout.sessions.listLineItems(
        session.id
      ); // 取得商品
      const orderItems = await getOrderItems(line_items); // 取得訂單商品
      const user = session.client_reference_id; // 取得使用者
      const totalAmount = session.amount_total / 100; // 取得總價
      const taxAmount = session.total_details.amount_tax / 100; // 取得稅金
      const shippingAmount = session.total_details.amount_shipping / 100; // 取得運費
      const itemsPrice = session.metadata.itemsPrice; // 取得商品價格
      const shippingInfo = {
        address: session.metadata.address,
        city: session.metadata.city,
        phoneNo: session.metadata.phoneNo,
        zipCode: session.metadata.zipCode,
        country: session.metadata.country,
      }; // 取得送貨資訊

      const paymentInfo = {
        id: session.payment_intent,
        status: session.payment_status,
      }; // 取得付款資訊

      const orderData = {
        shippingInfo,
        orderItems,
        itemsPrice,
        taxAmount,
        shippingAmount,
        totalAmount,
        paymentInfo,
        paymentMethod: "Card",
        user,
      }; // 訂單資訊

      await Order.create(orderData); // 建立訂單
      res.status(200).json({ success: true });
    }
  } catch (error) {
    console.log("Error => ", error);
  }
});
