var router = require("express").Router();

router.get("/:table/:id", require("./findByID"));
router.get("/:table", require("./find"));
router.post("/:table", require("./insert"));
router.put("/:table/:id", require("./update"));
// router.delete("/:table/:id", require("./delete"));

module.exports = router;
