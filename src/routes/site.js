const express = require("express");
const router = express.Router();

const siteController = require("../app/controllers/SiteController");

router.get("/search", siteController.search);
router.get("/", siteController.index); // cái "/" nên để ở cuối vì nó sẽ match tất cả các route khác trước

module.exports = router;
