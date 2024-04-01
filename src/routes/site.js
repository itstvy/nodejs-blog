const express = require("express");
const router = express.Router();

const siteController = require("../app/controllers/SiteController");

router.use("/search", siteController.search);
router.use("/", siteController.index); // cái "/" nên để ở cuối vì nó sẽ match tất cả các route khác trước

module.exports = router;
