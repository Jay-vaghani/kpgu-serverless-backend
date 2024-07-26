const express = require("express")
const { admissionInquiry } = require("../controllers/admissionInquiryControllers")
const routes = express.Router()

routes.post("/inquiry", admissionInquiry)

module.exports = routes