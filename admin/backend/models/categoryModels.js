// models/categoryModel.js
const { Schema, model } = require('mongoose');

const categorySchema = new Schema({
  name: { type: String, required: true, unique: true }
});

module.exports = model("Categorys", categorySchema);
