const mongoose = require("mongoose")
const Department = require("../models/department")

const home = (req, res) => {
  res.render('page/home')
}
const about = (req, res) => {
  res.render('page/about')
}

const depart = async (req, res) => {
  const list = await Department.find().sort({ _id: -1 }).lean()
  res.render('page/department', {
    list
  })
}
const depart_save = async (req, res) => {
  const list = await Department.find().sort({ _id: -1 }).lean()
  res.render('page/department', {
    list
  })
}

const departOne = async (req, res) => {
  let _id = req.params.id
  if (mongoose.Types.ObjectId.isValid(_id)) {
    let department = await Department.findById(_id).lean()
    res.render('page/departOne', {
      department
    })
  } else {
    res.status(402).json({
      msg: 'bunday malumot topilamdi'
    })
  }
}

const new_department = async (req, res) => {
  res.render('page/newDepartments',)
}


const add_new_department = async (req, res) => {
  if (req.body) {
    const new_department = new Department({ ...req.body, status: true })
    await new_department.save()
      .then(() => {
        res.redirect('/depart')
      }).catch((e) => {
        res.redirect('/depart')
        console.log(e);
      })
  }
  res.render('page/newDepartments')
}

const remove_department = async (req, res) => {
  let _id = req.params.id
  if (mongoose.Types.ObjectId.isValid(_id)) {
    const department = await Department.findById({ _id })
    if (req.params.id && department) {
      await Department.findByIdAndDelete({ _id })
        .then(() => {
          res.redirect('/depart')
        })
        .catch((e) => {
          res.redirect('/depart')
          console.log(e);
        })
    }
  } else {
    res.json('bunday id mavjud emas')
  }
}

module.exports = {
  home,
  about,
  depart,
  departOne,
  new_department,
  add_new_department,
  remove_department,
  depart_save
}