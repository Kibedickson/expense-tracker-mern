const Transaction = require('../models/transactionModel');

exports.getTransactions = async (req, res, next) => {
    try {
        const transactions = await Transaction.find()
        return res.status(201).json({
            success: true,
            data: transactions
        })
    } catch (e) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
}

exports.addTransaction = async (req, res, next) => {
    try {
        const transaction = await Transaction.create({
            text: req.body.text,
            amount: req.body.amount,
        })
        return res.status(201).json({
            success: true,
            data: transaction
        })
    } catch (e) {
        if (e.name === 'ValidationError') {
            const messages = Object.values(e.errors).map(val => val.message)

            return res.status(422).json({
                success: false,
                error: messages
            })
        } else {
            return res.status(422).json({
                success: false,
                error: 'Server Error'
            })
        }
    }
}

exports.deleteTransaction = async (req, res, next) => {
    try {
        await Transaction.findOneAndDelete({_id: req.body._id})
        return res.status(200).json({
            success: true,
            data: {}
        });
    } catch (e) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
}