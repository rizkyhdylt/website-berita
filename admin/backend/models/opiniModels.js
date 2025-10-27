const { Schema, model } = require('mongoose');

const opiniSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
  nama: { type: String, required: true },
  email: { type: String, required: true },
  noHp: { type: String, required: true }, // ✅ Tambah nomor HP
  judul: { type: String, required: true },
  isi: { type: String, required: true },
  kategori: { type: String, default: 'Lainnya' },
  foto: { type: String },
  type: { type: String, enum: ["opini", "laporan"], default: "opini" },
  read: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = model('opinis', opiniSchema);