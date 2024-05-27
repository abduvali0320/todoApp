const router = require('express').Router()

const { get_all_worker, add_new_worker, get_one_worker, remove_worker, edit_worker } = require('../controller/worker')
const { auth } = require('../middleware/auth')

router
  .route('/')
  .all(auth)
  .get(get_all_worker)
  .post(add_new_worker)

router
  .route('/:id')
  .all(auth)
  .get(get_one_worker)
  .delete(remove_worker)
  .patch(edit_worker)
module.exports = router