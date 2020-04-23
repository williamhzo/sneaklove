const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sneakerSchema = new Schema({
  name: { type: String, required: true },
  ref: { type: String, required: true },
  sizes: { type: Number },
  description: { type: String },
  price: { type: Number },
  image: { type: String, default: '/medias/img/blank.jpg' },
  category: { type: String, enum: ['men', 'women', 'kids'] },
  id_tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
});

const Sneaker = mongoose.model('Sneaker', sneakerSchema);

module.exports = Sneaker;
