const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  handle: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model("users", UserSchema);
//first argument is what you want the model to be called, the second
//argument is the schema you defined (what it means to be a user)
// module.exports = User;
