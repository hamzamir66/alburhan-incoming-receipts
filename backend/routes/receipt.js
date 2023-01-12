const express = require('express')
const router = express.Router();

const {
    newReceipt,
    getAdminReceipts,
    getSingleReceipt,
    updateReceipt

} = require('../controllers/receiptController')



const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/receipt/new').post(isAuthenticatedUser, newReceipt);
router.route('/receipt/:id')
    .get(isAuthenticatedUser, getSingleReceipt)
    .put(isAuthenticatedUser, updateReceipt);


router.route('/admin/receipts').get(isAuthenticatedUser, authorizeRoles('admin'), getAdminReceipts);


module.exports = router