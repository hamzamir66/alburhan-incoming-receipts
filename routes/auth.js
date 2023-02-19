const express = require('express');
const router = express.Router();

const {
    loginUser,
    registerUser,
    logout,
    getUserProfile,
    allUsers,
    getUserDetails,
    updateUser,
    deleteUser

} = require('../controllers/authController');


const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')

router.route('/login').post(loginUser);
router.route('/logout').get(isAuthenticatedUser, logout);
router.route('/me').get(isAuthenticatedUser, getUserProfile)
    
router.route('/admin/register').post(isAuthenticatedUser, authorizeRoles('admin'), registerUser);
router.route('/admin/users').get(isAuthenticatedUser, authorizeRoles('admin'), allUsers)
router.route('/admin/user/:id')
    .get(isAuthenticatedUser, authorizeRoles('admin'), getUserDetails)
    .put(isAuthenticatedUser, authorizeRoles('admin'), updateUser)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteUser)

module.exports = router;