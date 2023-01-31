const Receipt = require('../models/receipt')
const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
// const APIFeatures = require('../utils/apiFeatures')


// Create new receipt   =>   /api/v1/receipt/new
exports.newReceipt = catchAsyncErrors(async (req, res, next) => {

    // req.body.user = req.data.userId;

    const userId = req.user._id;
    const totalAmount = req.body.totalAmount;
    const user = await User.findById(userId);   
    const newAmount = Number(totalAmount) + user.amountToDeposit;

    const updateUser = await User.findOneAndUpdate(userId, {
        amountToDeposit: newAmount
    }, {
        new: true
    })

    const receipt = await Receipt.create(req.body);

    res.status(201).json({
        success: true,
        receipt
    });
})


// Get all Receipts (Admin)  =>   /api/v1/admin/receipts
exports.getAdminReceipts = catchAsyncErrors(async (req, res, next) => {

    const receipts = await Receipt.find().sort({_id: -1});

    res.status(200).json({
        success: true,
        receipts
    })

})

// Get single user receipts (admin)  =>  /api/v1/admin/receipts/user/:id
exports.getUserReceipts = catchAsyncErrors(async (req, res, next) => {
    const receipts = await Receipt.find({ user: req.params.id }).sort({ _id: -1 })

    res.status(200).json({
        success: true,
        receipts
    })
})


// Get my receipts   =>   /api/v1/myreceipts/:id
exports.getMyReceipts = catchAsyncErrors(async (req, res, next) => {
    const receipts = await Receipt.find({ user: req.params.id }).sort({ _id: -1 })

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
    const prevAmount = req.body.prevAmount
    const userId = req.user._id;
    const totalAmount = req.body.totalAmount;
    const user = await User.findById(userId);
    const newAmount = (Number(totalAmount) - Number(prevAmount)) + user.amountToDeposit;

    const updateUser = await User.findOneAndUpdate(userId, {
        amountToDeposit: newAmount
    }, {
        new: true
    })


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


// deposit amount    =>   /api/v1/user/depositamount/?amount=
exports.depositAmount = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    const amount = req.query.amount;
    const newAmount = user.amountDeposited + Number(amount);
    const subtractedAmount = user.amountToDeposit - Number(amount);

    const updateUser = await User.findOneAndUpdate(user._id, {
        amountDeposited: newAmount,
        amountToDeposit: subtractedAmount
    }, {
        new: true
    })

    res.status(200).json({
        success: true,
        user: updateUser
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

