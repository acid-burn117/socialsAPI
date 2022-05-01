const router = require('express').Router();
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');
const reactionRoutes = require("./reactionRoutes");

router.use('/user', userRoutes);
router.use('/thought', thoughtRoutes);
router.use("/reactions", reactionRoutes);
module.exports = router;
