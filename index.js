const express = require('express')
const mongoose = require('mongoose')
const fileUpload = require('express-fileupload')
const { engine } = require('express-handlebars');
require('dotenv').config()
const routerList = require('./router')
const bodyParser = require('body-parser')

const app = express()
app.use(express.json()) // serverdan malumot olish va jo'natish uchun ishlaydi
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

app.engine('hbs', engine({
  extname: 'hbs'
}));
app.set('view engine', 'hbs');
app.set('views', './views');

app.use(fileUpload({
  limits: {
    fileSize: 1024 * 1024 * 10
  }
}))

app.use(routerList)
app.use('/images', express.static('images'))
app.use('/files', express.static('files'))
app.use('/assets', express.static('assets'))

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL)
    await app.listen(process.env.PORT)
    console.log(`server ${process.env.PORT} da ishga tushdi `);
  } catch (err) {
    console.log(err)
  }
}
start()