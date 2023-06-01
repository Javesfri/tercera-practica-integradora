import productModel from "../models/MongoDB/productModel.js";

export const getPagProducts = async (category, sort, page, limit) => {
  try {
    let query = {};
    if (category) {
      query.category = category;
    }
    let products = await productModel.paginate(query, {
      limit: limit,
      page: page,
      sort: sort,
    });
    return products;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getProductById = async (id) => {
  try {
    return await productModel.findById(id);
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const productAdd = async (product) => {
  try {
    return await productModel.insertMany([product]);
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const productDelete = async (id) => {
  try {
    return await productModel.findByIdAndDelete(product);
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const productUpdate = async (id, info) => {
  try {
    return await productModel.findByIdAndUpdate(id, info);
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getAllProducts = async () => {
  try {
    return await productModel.find();
  } catch (error) {
    return error;
  }
};
