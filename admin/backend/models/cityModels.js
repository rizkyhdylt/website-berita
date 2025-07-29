// models/cityModel.js
const { Schema, model } = require('mongoose');

const citySchema = new Schema({
  name: { type: String, required: true, unique: true }
});

module.exports = model("Citys", citySchema);
