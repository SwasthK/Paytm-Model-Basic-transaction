const express = require('express')
const UserRouter = express.Router()
const zod = require('zod')
const jwt = require('jsonwebtoken')
const { User, Account } = require('../db')
const { JWT_SECRET } = require('../config')
const userauth = require('../routes/middleware')

const signupbody = zod.object({
    firstname: zod.string(),
    lastname: zod.string(),
    username: zod.string().email(),
    password: zod.string()
})

UserRouter.post('/signup', async (req, res) => {
    const body = req.body
    const { success } = signupbody.safeParse(req.body)
    if (!success) {
        res.status(411).json({
            message: "Enter the Proper details !"
        })
        return;
    }

    const finduser = await User.findOne({
        username: req.body.username
    })

    if (finduser) {
        res.status(411).json({
            message: "This username already exists !"
        })
        return;
    }

    const user = new User({
        username: req.body.username,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname
    })

    await user.save();

    const userid = user._id

    const account = new Account({
        UserId: userid,
        balance: 1 + Math.random() * 1000
    })

    await account.save();

    const token = jwt.sign({ userid }, JWT_SECRET)

    res.status(200).json({
        message: "Your account has been created",
        token
    })

})

const signinbody = zod.object({
    username: zod.string().email(),
    password: zod.string()
})

UserRouter.post('/signin', async (req, res) => {
    console.log("-----------");
    console.log(req.body);
    const { success } = signinbody.safeParse(req.body)
    // console.log(success);
    if (!success) {
        res.status(411).json({
            message: "Please enter the valid input !"
        })
        return;
    }

    const userfound = await User.findOne({
        $and: [{
            username: req.body.username,
            password: req.body.password
        }]
    })

    if (!userfound) {
        res.status(411).json({
            message: "No such usernanme found"
        })
        return;
    }
    const userid = userfound._id

    const token = jwt.sign({ userid }, JWT_SECRET)

    res.status(200).json({
        message: "User signed in successfully !",
        token
    })
})

const updatebody = zod.object({
    username: zod.string().email(),
    password: zod.string(),
    firstname: zod.string(),
    lastname: zod.string()
})

UserRouter.put('/', userauth, async (req, res) => {
    const { success } = updatebody.safeParse(req.body)
    if (!success) {
        res.status(411).json({
            message: "Please Provide Proper Details"
        })
        return;
    }

    const update = await User.updateOne({ _id: req.userId },
        req.body
    )

    res.status(200).json({
        message: "Updated Successfully !"
    })
})

// UserRouter.get('/allusers', async (req, res) => {
//     const allusers = await User.find({})
//     try {
//         if (!allusers) {
//             return res.status(411).json({
//                 message: "Sorry we are unable to fetch the data!"
//             })
//         }
//         else {
//             console.log(allusers);
//             return res.status(200).json({
//                 bulkusers: allusers.map(u => ({
//                     firstname: u.firstname,
//                     lastname: u.lastname
//                 }))
//             })
//         }
//     } catch (error) {
//         console.log(error);
//         return res.status(411).json({
//             message: "Sorry we are unable to fetch the data!"
//         })
//     }
// })

UserRouter.get('/allusers', async (req, res) => {

    const search = req.query.filter || ""
    const user = await User.find({
        $or: [{
            firstname: {
                "$regex": search
            }
        }, {
            lastname: {
                "$regex": search
            }
        }]
    })

    res.status(200).json({
        users: user.map(element => ({
            firstname: element.firstname,
            lastname: element.lastname,
            username: element.username,
            id: element._id
        }))
    })

})

module.exports = UserRouter