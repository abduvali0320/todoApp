const { Schema, model } = require('mongoose')

const Todos = new Schema({
  body: {
    type: String,
    default: "no heading"
  },
  text: {
    type: String,
    default: 'no text'
  },
  // workers: [{
  //   worker: {
  //     type: String,
  //     ref: 'worker'
  //   }
  // }],
  deadline: {
    type: String,
  },
  startTime: {
    type: String,
  },
  files: {
    type: String,
  },
  from_worker: {
    type: Schema.Types.ObjectId,
    ref: 'workers',
    required: true
  },
  status: {
    type: Boolean,
    default: true
  }
})
module.exports = model('todos', Todos)