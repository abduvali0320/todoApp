const { Schema, model } = require('mongoose')

const user = new Schema({
  login: {
    type: String,
    required: [true, "Foydalanuvchi ligin bo'lishi shart"],
    unique: [true, "Bunday foydalanuvchi yo'q"]
  },
  password: {
    type: String,
    required: [true, "Foydalanuvchi paroli bo'lishi shart"],
    minlength: [5, "Mahfiy kalit kamida 5 ta simvol bo'lsin"]
  },
  createdAt: Date,
  status: {
    type: Boolean,
    default: true
  }
})

module.exports = model('User', user)