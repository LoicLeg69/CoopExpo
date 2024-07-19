const express = require("express");

const router = express.Router();

// Define a route to fetch users with their recipes
const { browse, read} = require(`../../../controllers/userActions`);
// Route to get a list of users

router.get("/", browse);
router.get("/read", read);

module.exports = router;
