const Receipt = require('../models/receipt')
const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
// const APIFeatures = require('../utils/apiFeatures')


// Create new receipt   =>   /api/v1/receipt/new
exports.newReceipt = catchAsyncErrors(async (req, res, next) => {

    // req.body.user = req.data.userId;

    const receipt = await Receipt.create(req.body);

    res.status(201).json({
        success: true,
        receipt
    })
})


// Get all Receipts (Admin)  =>   /api/v1/admin/receipts
exports.getAdminReceipts = catchAsyncErrors(async (req, res, next) => {

    const receipts = await Receipt.find();

    res.status(200).json({
        success: true,
        receipts
    })

})

// Get my receipts   =>   /api/v1/myreceipts/:id
exports.getMyReceipts = catchAsyncErrors(async (req, res, next) => {
    const receipts = await Receipt.find({ user: req.params.id })

    res.status(200).json({
        success: true,
        receipts
    })
})

// Get single receipt details   =>   /api/v1/receipt/:id
exports.getSingleReceipt = catchAsyncErrors(async (req, res, next) => {

    const receipt = await Receipt.findById(req.params.id);

    if (!receipt) {
        return next(new ErrorHandler('receipt not found', 404));
    }


    res.status(200).json({
        success: true,
        receipt
    })

})

// Update Receipt   =>   /api/v1/receipt/:id
exports.updateReceipt = catchAsyncErrors(async (req, res, next) => {

    let receipt = await Receipt.findById(req.params.id);

    if (!receipt) {
        return next(new ErrorHandler('Receipt not found', 404));
    }

    receipt = await Receipt.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        receipt
    })

})

// Delete Receipt   =>   /api/v1/admin/product/:id
// exports.deleteReceipt = catchAsyncErrors(async (req, res, next) => {

//     const receipt = await Receipt.findById(req.params.id);

//     if (!receipt) {
//         return next(new ErrorHandler('Receipt not found', 404));
//     }

//     await receipt.remove();

//     res.status(200).json({
//         success: true,
//         message: 'receipt is deleted.'
//     })

// })

