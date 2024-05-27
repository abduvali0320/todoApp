const router = require('express').Router()

const { get_all_todos, add_new_todos, remove_todos, get_one_todos, edit_Todos } = require('../controller/todos')
const { auth } = require('../middleware/auth')
router
  .route('/')
  .all(auth)
  .get(get_all_todos)
  .post(add_new_todos)
router
  .route('/:id')
  .all(auth)
  .get(get_one_todos)
  .delete(remove_todos)
  .patch(edit_Todos)

module.exports = router