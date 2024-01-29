const express = require('express')
const UserRouter = require('./user')
const MainRouter = express.Router()
const AccountRouter = require('./account')

MainRouter.get('/',(req,res)=>{
    res.json({
        msg:"hi"
    })
})

MainRouter.use('/user', UserRouter)
MainRouter.use('/account', AccountRouter)


module.exports = MainRouter