const router = require('express').Router()
const { regUser, login, meFind } = require('../controller/auth')
const { auth } = require('../middleware/auth')
router.post('/reg', regUser)
router.post('/login', login)
router.get('/me', auth, meFind)
module.exports = router