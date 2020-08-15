const express = require("express");

const searchController = require("../controllers/searchController");
const entityController = require("../controllers/entityController");
const clearCacheController = require("../controllers/clearCacheController");

const router = express.Router();
router.route("/search").post(searchController);
router.route("/entities").get(entityController);
router.route("/clear-cache").delete(clearCacheController);

module.exports = router;
