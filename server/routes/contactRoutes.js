const express = require("express");
const router = express.Router();

const {
  createContact,
  getContacts,
  deleteContact
} = require("../controllers/contactController");


// client sends message
router.post("/", createContact);

// admin fetches messages
router.get("/", getContacts);

// admin deletes message
router.delete("/:id", deleteContact);


module.exports = router;