const express = require('express');
const router = express.Router();

const checkAuth = require('../auth/check-auth');

const controllerUser = require('../controllers/users');

// Sign up
router.post('/signup', controllerUser.signup);

// Log in
router.post('/login', controllerUser.login);

// Delete user - Issue, any authorized user can delete other users
router.delete('/:userId', checkAuth, controllerUser.delete_user);

module.exports = router;
