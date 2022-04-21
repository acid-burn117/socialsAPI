const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../controllers/userController.js');

router.route('/').get(getUsers).post(createUser);

router
.route('/:userid')
.get(getSingleUser)
.delete(deleteUser)
.put(updateUser);

router.route('/:userid/friends').post(addFriend);

 router.route('/:userid/friends/:friendsid').delete(removeFriend);

module.exports = router;