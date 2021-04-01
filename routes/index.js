const express = require("express");
const router = express.Router();

const titleController = require("../controllers/webTitles/index")
router.get("/", titleController.getTitles);
router.get("/async", titleController.getTitlAsync)
router.get("/stream", titleController.getTitleStream)
router.get("/call", titleController.getTitleCall)

module.exports = router;