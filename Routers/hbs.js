const router = require('express').Router()
const { home, about, depart, departOne, new_department, add_new_department, remove_department, depart_save } = require('../controller/hbs')

router.get('/', home)
router.get('/about', about)
router.get('/depart', depart)
router.get('/depart/:id', departOne)
router.patch('/depart/:id', depart_save)
router.get('/newDepartments', new_department)
router.post('/newDepartments', add_new_department)
router.post('/depart/:id', remove_department)

module.exports = router