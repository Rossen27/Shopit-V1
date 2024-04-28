import mongoose from "mongoose";
import products from "../seeder/data.js";
import Product from "../models/product.js";

const seedProducts = async () => {
  try {
    // await mongoose.connect("mongodb://localhost:27017/shopit-v1"); // 連接到 MongoDB
    await mongoose.connect(
      "mongodb+srv://rossen:Rossen791127@cluster0.sbbdfz9.mongodb.net/RossenHua?retryWrites=true&w=majority&appName=Cluster0"
    ); // 連接到 MongoDB

    await Product.deleteMany(); // 刪除所有產品
    console.log("商品已刪除");

    await Product.insertMany(products); // 插入產品
    console.log("商品已插入");

    process.exit(); // 退出 Node.js 進程
  } catch (error) {
    console.log(error.message);
    process.exit(); // 退出 Node.js 進程
  }
};

seedProducts();
