const mongoose = require('mongoose')

const receiptSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter name'],
        trim: true,
        maxLength: [100, 'name cannot exceed 100 characters']
    },
    email: {
        type: String,
        trim: true,
        maxLength: [100, 'email cannot exceed 100 characters']
    },
    mobileNo: {
        type: Number,
        maxLength: [11, 'Invalid Phone Number'],
        minLength: [11, 'Invalid Phone Number'],
    },
    referenceNo: {
        type: Number,
        maxLength: [7, 'Invalid Reference Number'],
        minLength: [7, 'Invalid Reference Number'],
    },
    receiptNo: {
        type: Number,
        maxLength: [7, 'Invalid Receipt Number'],
        minLength: [7, 'Invalid Receipt Number'],
        unique: true,
    },
    address: {
        type: String,
        trim: true,
        maxLength: [400, 'address cannot exceed 400 characters']
    },
    paymentDate: {
        type: Date,
        default: Date.now,
        required: [true, 'payment date required']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    paymentEntries : [
        {
            title: {
                type: String,
                required: true
            },
            amount: {
                type: Number,
                required: true
            }
        }
    ],
    totalAmount: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Receipt', receiptSchema);