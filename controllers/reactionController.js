const { Reactions, Thoughts } = require("../models");

module.exports = {
  getReactions(req, res) {
    Reactions.find()
      .then((reaction) =>
        !reaction
          ? res.status(404).json({ message: "No Reaction with that ID" })
          : res.json(reaction)
      )
      .catch((err) => res.status(500).json(err));
  },
  getSingleReaction(req, res) {
    Reactions.findOne({ reactionId: req.params.reactionId })
      .then((reaction) =>
        !reaction
          ? res.status(404).json({ message: "No Reactions with that ID" })
          : res.json(reaction)
      )
      .catch((err) => res.status(500).json(err));
  },
  createReaction(req, res) {
    Reactions.create(req.body)
      .then((reaction) => res.json(reaction))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  deleteReaction(req, res) {
    Reactions.findOneAndRemove({ reactionId: req.params.reactionId })
      .then((reaction) =>
        !reaction
          ? res.status(404).json({ message: "This Reaction doesn't exist" })
          : Thoughts.findOneAndUpdate(
              { reactions: req.params.reactionId },
              { $pull: { reactions: req.params.reactionId } },
              { new: true }
            )
      )
      .then((reaction) =>
        !reaction
          ? res
              .status(404)
              .json({ message: "Reaction deleted, but no Thought found" })
          : res.json({ message: "Reaction successfully deleted" })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  updateReaction(req, res) {
    Reactions.findOneAndUpdate(
      { reactionId: req.params.reactionId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((reaction) =>
        !reaction
          ? res.status(404).json({ message: "No Reaction with this ID!" })
          : res.json(reaction)
      )
      .catch((err) => res.status(500).json(err));
  },
};