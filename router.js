const router = require('express').Router()
router.use('/department', require('./Routers/department'))
router.use('/worker', require('./Routers/worker'))
router.use('/todos', require('./Routers/todos'))
router.use('/auth', require('./Routers/auth'))
router.use('/', require('./Routers/hbs'))
module.exports = router