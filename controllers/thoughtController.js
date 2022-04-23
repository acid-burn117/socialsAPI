const { ObjectId } = require('mongoose').Types;
const { Thought, User} = require('../models');

module.exports = {
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
 
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtid })
      .select('-__v')
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No Thought with that ID found' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  createThought(req, res) {
    Thought.create(req.body)
    .then((thought) => {
      return User.findOneAndUpdate(
        {_id: req.body.userid},
        {$addToSet: {thoughts: thought._id}},
        {new: true }
     )
    })
      .then((user) =>
      !user
        ? res.status(404).json({
          message: 'Thought created, no user with that ID found',
          })
        : res.json('Thought created')
    )
    .catch((err) =>{
      console.log(err);
        res.status(500).json(err);
    });
  },

  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtid })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No Thought with that ID found' })
          : User.findOneAndUpdate(
            { thoughts: req.params.thoughtid },
            { $pull: { thoughts: req.params.thoughtid } },
            { new: true }
          )
    )
    .then((user) =>
      !user
        ? res.status(404).json({
            message: 'Thought deleted, no users found',
          })
        : res.json({ message: 'Thought deleted' })
    )
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  },

  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtid },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No Thought with that ID found' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },


addReaction(req, res) {
  console.log('adding a reaction');
  console.log(req.body);
  Thought.findOneAndUpdate(
    { _id: req.params.thoughtid },
    { $addToSet: { reactions: req.body } },
    { runValidators: true, new: true }
  )
    .then((thought) =>
      !thought
        ? res
            .status(404)
            .json({ message: 'No thought with that ID found' })
        : res.json(thought)
    )
    .catch((err) => res.status(500).json(err));
},

removeReaction(req, res) {
  Thought.findOneAndUpdate(
    { _id: req.params.thoughtid },
    { $pull: { reactions: { reactionid: req.params.reactionid } } },
    { runValidators: true, new: true }
  )
    .then((thought) =>
      !thought
        ? res
            .status(404)
            .json({ message: 'No thought with that ID found' })
        : res.json(thought)
    )
    .catch((err) => res.status(500).json(err));
},
};