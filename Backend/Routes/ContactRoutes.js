const express = require("express");
const router = express.Router();
const { getContact, createContact, getIndividual, updateContact, deleteContact } = require("../Controllers/contactController");
const validation = require("../Middleware/validateToken");

router.use(validation)
router.route("/").get(getContact).post(createContact);
router.route("/:id").get(getIndividual).put(updateContact).delete(deleteContact);

module.exports = router;