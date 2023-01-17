const express = require('express')
const router = express.Router();

const {
    newReceipt,
    getAdminReceipts,
    getSingleReceipt,
    updateReceipt,
    getMyReceipts

} = require('../controllers/receiptController')



const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/receipt/new').post(newReceipt);
router.route('/receipt/:id')
    .get(getSingleReceipt)
    .put(updateReceipt);

router.route('/myreceipts/:id').get(getMyReceipts)

router.route('/admin/receipts').get(isAuthenticatedUser, authorizeRoles('admin'), getAdminReceipts);


module.exports = router