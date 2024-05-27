const { Schema, model } = require('mongoose')
const Worker = new Schema({
  name: {
    type: String,
    required: true
  },
  lName: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    default: "+998 99 456 62 51"
  },
  age: {
    type: Number,
    required: true,
    validate: {
      validator: (v) => {
        return v >= 18
      },
      message: props => ` ${props.value} yoshli xodim bo'lishi mumkin emas`
    }
  },
  department: {
    type: Schema.Types.ObjectId,
    ref: "Department",
    required: true
  },
  createdAt: {
    type: String
  },
  photo: {
    type: String,
  }
})
module.exports = model('Worker', Worker)