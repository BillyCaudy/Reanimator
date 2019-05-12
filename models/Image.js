const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  collectionId: {
    type: Number,
    required: true
  },
  imgName: {
    type: String,
    required: true
  },
  imgData: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Image = mongoose.model('images', ImageSchema);
