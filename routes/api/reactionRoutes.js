const router = require("express").Router();
const {
  getReactions,
  getSingleReaction,
  createReaction,
  deleteReaction,
  updateReaction,
} = require("../../controllers/reactionController");

router.route("/").get(getReactions).post(createReaction);

router
  .route("/:reactionId")
  .get(getSingleReaction)
  .put(updateReaction)
  .delete(deleteReaction);

router.route("/create").post(createReaction);

module.exports = router;