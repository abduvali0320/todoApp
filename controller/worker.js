const Worker = require('../models/worker')
const get_all_worker = async (req, res) => {
  let limit = 4,
    page = req.query.page || 1,
    skip = (page - 1) * limit,
    count = await Worker.find().count()

  const all_worker = await Worker.find()
    .populate(['department']) // boshqa sxemadagi malumotlarni bog'lash uchun 
    .limit(limit)
    .skip(skip)
  res.json({
    statusbar: "success",
    data: all_worker,
    count,
    page,
    limit
  })
}

const add_new_worker = async (req, res) => {
  console.log(req.files);
  let filePath = null
  // uniqueName  => buni hosil qilishdan maqsad yangi rasm qo'shilganda uni (bir nom ostidagi rasmni) ustiga tushmasligi uchun 

  if (req.files) {
    let photo = req.files.photo
    let uniqueName = Date.now() + '-' + Math.floor(Math.random() * 1e9)
    filePath = `images/${uniqueName}_${photo.name}`
    await photo.mv(filePath) // photo.mv -> rasmni shu hosil qilingan path ga ko'chiradi
  }
  const new_worker = new Worker({ ...req.body, createdAt: new Date(), photo: filePath })
  await new_worker.save()
  res.json({
    status: "success",
    data: new_worker
  })
}

const get_one_worker = async (req, res) => {
  let _id = req.params.id
  let worker = await Worker.findById({ _id }).populate(['department'])
  if (_id && worker) {
    res.json({
      staut: "xodim malumotlari",
      data: worker
    })
  }
  else {
    res.json({
      staut: "bunday xodim mavjud emas",
    })
  }
}


const remove_worker = async (req, res) => {
  let _id = req.params.id
  let worker = await Worker.findById({ _id })
  // id va shu id dagi objectni topishdan maqsad shartga moslab olish agar shunday malumot bo'lmasa kerakli javob ketadi
  if (_id && worker) {
    await Worker.findByIdAndDelete({ _id })
    res.json({
      staut: "xodim malumotlari o'chirldi",
      data: worker
    })
  }
  else {
    res.json({
      staut: "bunday xodim topilmadi",
    })
  }
}


const edit_worker = async (req, res) => {
  let _id = req.params.id
  let worker = await Worker.findById(_id).lean()

  let filePath = null
  if (req.files) {
    let photo = req.files.photo
    let uniqueName = Date.now() + '-' + Math.floor(Math.random() * 1e9)
    filePath = `images/${uniqueName}_${photo.name}`
    await photo.mv(filePath) // photo.mv -> rasmni shu hosil qilingan path ga ko'chiradi
  }

  if (_id && worker && req.body) {
    worker = { _id, ...worker, ...req.body }
    let new_worker = await Worker.findByIdAndUpdate(_id, { ...worker, ...req.body, photo: filePath }, { new: true })
    console.log(new_worker);
    res.json({
      staut: "xodim malumotlari tahrirlandi",
      data: new_worker
    })
  }
}

module.exports = {
  get_all_worker,
  add_new_worker,
  get_one_worker,
  remove_worker,
  edit_worker,
}