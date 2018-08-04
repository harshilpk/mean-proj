const mongoose = require('mongoose');
const uniqueValidtaor = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

userSchema.plugin(uniqueValidtaor);

module.exports = mongoose.model('User', userSchema);
