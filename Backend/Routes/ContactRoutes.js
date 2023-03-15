const express = require("express");
const router = express.Router();
const { getContact, createContact, getIndividual, updateContact, deleteContact } = require("../Controllers/contactController")


router.route("/").get(getContact);


router.route("/").post(createContact);


router.route("/:id").get(getIndividual);


router.route("/:id").put(updateContact);


router.route("/:id").delete(deleteContact);

module.exports = router;