const express = require("express");
const router = express.Router();

const newsController = require("../app/controllers/NewsController");

router.get("/:slug", newsController.show);
router.get("/", newsController.index); // cái "/" nên để ở cuối vì nó sẽ match tất cả các route khác trước

module.exports = router;
