const { decoded } = require('../utils/decoded')
const Department = require('../models/department')
const mongoose = require('mongoose')
const getAll_department = async (req, res) => {
  let page = req.query.page || 1,
    limit = 5,
    skip = (page - 1) * 5
  const userID = decoded(req)
  const departments = await Department.find({ user: userID }).limit(limit).skip(skip)
  const allCount = await Department.find({ user: userID }).count()
  res.json({
    status: "success",
    count: allCount,
    limit,
    data: departments
  })
}

const add_new_department = async (req, res) => {
  if (req.body) {
    const new_department = new Department({ ...req.body, status: true })
    await new_department.save()
    res.json({
      status: "success",
      data: new_department
    })
  }
}

const getOne_department = async (req, res) => {
  if (req.params.id) {
    let ID = req.params.id
    if (mongoose.Types.ObjectId.isValid(ID)) {
      const department_one = await Department.findOne({ _id: ID })
      res.json({
        statusbar: "department malumotlari",
        data: department_one
      })
    }
    else {
      res.status(402).json({ msg: "berilgan id noto'g'ri" })
    }
  }
}

const remove_department = async (req, res) => {
  const ID = req.params.id
  if (mongoose.Types.ObjectId.isValid(ID)) {
    const department = await Department.findById({ _id: ID })
    if (req.params.id && department) {
      await Department.findByIdAndDelete({ _id: ID })
      res.json({
        status: 'malumot o`chirildi',
        data: department
      })
    }
    else {
      res.json({
        status: 'malumot topilmadi',
      })
    }
  }
  else {
    res.status(402).json({
      msg: 'berilgan id topilmadi'
    })
  }
}

const update_department = async (req, res) => {
  let _id = req.params.id
  if (mongoose.Types.ObjectId.isValid(_id)) {
    let department = await Department.findById(_id).lean()
    if (_id && department && req.body) {
      department = { _id, ...department, ...req.body }
      let up_department = await Department.findByIdAndUpdate(_id, { ...department, ...req.body }, { new: true })
      res.json({
        status: "success",
        data: up_department
      })
    }
  }
  else {
    res.status(402).json({
      msg: 'berilgan id topilmadi'
    })
  }
}


const change_status = async (req, res) => {
  let _id = req.params.id
  if (mongoose.Types.ObjectId.isValid(_id)) {
    let department = await Department.findById(_id).lean()
    if (_id && department, req.body) {
      department = { ...department, status: !department.status }
      let up_department = await Department.findByIdAndUpdate(_id, department, { new: true })
      res.json({
        statusbar: 'status o`zgartirildi',
        data: up_department
      })
    }
  }
  else {
    res.status(402).json({
      msg: 'berilgan id topilmadi'
    })
  }
}

module.exports = {
  getAll_department,
  add_new_department,
  getOne_department,
  remove_department,
  update_department,
  change_status
}