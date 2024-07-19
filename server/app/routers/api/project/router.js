const express = require("express");
const upload = require("../../../services/multerConfig")

const router = express.Router();

// Define a route to fetch projects with their recipes
const { browse, add, read, destroy } = require(`../../../controllers/projectActions`);
// Route to get a list of projects

router.get("/", browse);
router.get("/read", read);

router.post("/", upload.single('image'), add);

// Route to delete an item
router.delete("/delete", destroy);

module.exports = router;
