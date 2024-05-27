const router = require("express").Router();

const {
    getAll_department,
    add_new_department,
    getOne_department,
    remove_department,
    update_department,
    change_status,
} = require("../controller/department");
const { auth } = require("../middleware/auth");

router.route("/").all(auth).get(getAll_department).post(add_new_department);

router
    .all(auth)
    .route("/:id")
    .get(getOne_department)
    .delete(remove_department)
    .patch(update_department);

router.all(auth).post("/:id/status", change_status);
module.exports = router;
