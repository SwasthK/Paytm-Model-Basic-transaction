const express = require('express')
const { Account } = require('../db')
const AccountRouter = express.Router()
const userauth = require('./middleware')

AccountRouter.get('/balance', userauth, async (req, res) => {
    const finduser = await Account.findOne({
        UserId: req.userId
    })
    console.log(finduser);
    res.status(200).json({
        message: finduser.balance
    })
})

AccountRouter.put('/transfer', userauth, async (req, res) => {
    const { to, ammount } = req.body

    const money = parseInt(ammount)

    const senduser = await Account.findOne({
        UserId: req.userId
    })


    if (!senduser) {
        res.status(411).json({})
        return
    }

    if (senduser.balance < money) {
        res.status(411).json({ message: "Insuffiecnt balance" })
        return
    }

    const recieveuser = await Account.findOne({
        UserId: to
    })


    if (!recieveuser) {
        res.status(411).json({ message: " Invalid account" })
        return
    }

    await Account.updateOne({ UserId: senduser.UserId },
        {
            $inc:
                { balance: -money }
        })

    console.log(senduser);

    await Account.updateOne({ UserId: recieveuser.UserId },
        {
            $inc:
                { balance: money }
        })

    console.log(recieveuser);

    res.status(200).json({
        message: "Transaction successfull!"
    })

})

module.exports = AccountRouter