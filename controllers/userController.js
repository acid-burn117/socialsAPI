const { user, thought } = require('../models');

module.exports = {

  getUsers(req, res) {
    user.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(500).json(err));
  },
 
  getSingleUser(req, res) {
    user.findOne({ _id: req.params.userid })
      .select('-__v')
      .lean()
      .then(async(user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  createUser(req, res) {
    user.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  
  deleteUser(req, res) {
    user.findOneAndDelete({ _id: req.params.userid })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No such user exists' })
          : thought.deleteMany({ _id: { $in: user.thoughts} })
      )
        .then(() => res.json({ message: 'user and thoughts deleted!' }))
        .catch((err) => res.status(500).json(err));   
  },

  updateUser(req, res) {
    user.findOneAndUpdate(
      { _id: req.params.userid },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with this id!' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  addFriend(req, res) {
    console.log('You are adding a new friend');
    console.log(req.body);
    user.findOneAndUpdate(
      { _id: req.params.userid },
      { $addToSet: { friends: req.body } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: 'No user found with that ID :(' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

 
  removeFriend(req, res) {
    console.log(req.params.friendsid)
    console.log(req.params.userid)
    user.findOneAndUpdate(
      { _id: req.params.userid },
      { $pull: { friends: req.params.friendsid } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: 'No friend found with that ID :(' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  };