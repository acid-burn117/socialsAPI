const { ObjectId } = require("mongoose").Types;
const { Users, Thoughts } = require("../models");

const totalUsers = async (userId) =>
  Users.aggregate([
    {
      $count: "totalUsers",
    },
  ]).then((numberOfStudents) => numberOfStudents);

module.exports = {
  getUsers(req, res) {
    Users.find()
      .then(async (users) => {
        const userObj = {
          totalUsers: await totalUsers(),
          users,
        };
        return res.json(userObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  getSingleUser(req, res) {
    Users.findOne({ userId: req.params.userId })
      .then(async (user) =>
        !user
          ? res.status(404).json({ message: "No users with that ID" })
          : res.json({
              user,
            })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  createUser(req, res) {
    Users.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  deleteUser(req, res) {
    Users.findOneAndDelete({ userId: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No User exists with that ID" })
          : Thoughts.deleteMany({ thoughtId: { $in: user.thoughts } })
      )
      .then(() => res.json({ message: "User and thoughts deleted!" }))
      .catch((err) => res.status(500).json(err));
  },
};
