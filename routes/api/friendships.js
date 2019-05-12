const express = require("express");
const router = express.Router();

router.get("/test", (req, res) => res.json({ msg: "friendships TEST ROUTE" }));

module.exports = router;
