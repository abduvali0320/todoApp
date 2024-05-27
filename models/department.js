const { Schema, model } = require('mongoose')

const department = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    red: 'User',
    // required: [false, 'foydalanuvchi id yo\'']
  },
  name: {
    type: String,
    default: 'no name'
  },
  phone: {
    type: String,
    default: '+998 (93) 455 17 27'
  },
  status: {
    type: Boolean,
    defeult: true
  }
})
module.exports = model('Department', department)
