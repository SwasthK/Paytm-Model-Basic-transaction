
const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://swasth319:0n3zjDv1KMXiDIok@cluster0.oqytlgg.mongodb.net/MyPaytm')

const UserSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    username: String,
    password: String
})

const AccountSchema = new mongoose.Schema({
    UserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
})

const User = new mongoose.model('users', UserSchema)

const Account = new mongoose.model('account', AccountSchema)

module.exports = {
    User,
    Account
}