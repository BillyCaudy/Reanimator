const express = require("express");
const router = express.Router();

router.get("/test", (req, res) => res.json({ msg: "IMAGES TEST ROUTE" }));

module.exports = router;
