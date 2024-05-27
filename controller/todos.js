const Todos = require("../models/todos")

const get_all_todos = async (req, res) => {
  const todos = await Todos.find()
  res.json({
    status: "barcha topshiriqlar",
    data: todos
  })
}
const add_new_todos = async (req, res) => {
  let filePath = null
  if (req.files) {
    let file = req.files.file
    let uniqueFile = Date.now() + '-' + Math.floor(Math.random() * 1e9)
    filePath = `files/${uniqueFile}_${file.name}`
    await file.mv(filePath)
  }
  const new_todos = new Todos({ ...req.body, createdAt: new Date(), status: true, files: filePath })
  await new_todos.save()
  res.json({
    status: "success",
    data: new_todos
  })
}

const get_one_todos = async (req, res) => {
  let _id = req.params.id
  let todo = await Todos.findById(_id)
  if (_id && todo) {
    res.json({
      staut: "topshiriq malumotlari",
      data: todo
    })
  }
  else {
    res.json({
      staut: "bunday topshriq mavjud emas",
    })
  }
}
const remove_todos = async (req, res) => {
  _id = req.params.id
  let todo = await Todos.findById(_id)
  if (_id && todo) {
    await Todos.findByIdAndDelete(_id)
    res.json({
      status: "topshiriq o'chirldi",
      data: todo
    })
  }
  else {
    res.json({
      status: "bunday topshiriq mavjud emas",
    })
  }
}


const edit_Todos = async (req, res) => {
  let _id = req.params.id
  let todo = await Todos.findById(_id).lean()

  let filePath = null
  if (req.files) {
    let file = req.files.file
    let uniqueName = Date.now() + '-' + Math.ceil(Math.random() * 2e9)
    filePath = `files/${uniqueName}_${file.name}`
    await file.mv(filePath)
  }

  if (_id && todo && req.body) {
    todo = { _id, ...todo, ...req.body }
    let new_todos = await Todos.findByIdAndUpdate(_id, { ...todo, ...req.body, files: filePath }, { new: true })
    res.json({
      staut: "topshiriq malumotlari tahrirlandi",
      data: new_todos
    })
  }
}


module.exports = {
  get_all_todos,
  add_new_todos,
  remove_todos,
  get_one_todos,
  edit_Todos
}