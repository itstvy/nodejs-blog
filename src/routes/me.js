const express = require("express");
const router = express.Router();

const meController = require("../app/controllers/MeController");

router.get("/stored/courses", meController.storedCourses); //get danh sách khóa học đã tạo và lưu
router.get("/trash/courses", meController.trashCourses); //get thùng rác

module.exports = router;
