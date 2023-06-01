import mongoose, { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

let productModel;

if (mongoose.models["products"]) {
  productModel = mongoose.models("products");
} else {
  const productSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
  });
  productSchema.plugin(mongoosePaginate);
  productModel = mongoose.model("products", productSchema);
}

export default productModel;
