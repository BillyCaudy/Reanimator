const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  parentCollection: {
    type: Schema.Types.ObjectId,
    ref: 'collections'
  },
  imgName: {
    type: String,
    required: false
  },
  imgUrl: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Image = mongoose.model('images', ImageSchema);
