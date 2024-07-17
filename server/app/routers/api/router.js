const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Import And Use Routers Here
/* ************************************************************************* */


const authRouter = require("./auth/router");
const projectRouter = require("./project/router");

router.use("/auth", authRouter);
router.use("/project", projectRouter);

/* ************************************************************************* */

module.exports = router;
