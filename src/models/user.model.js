const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const autoIncrement = require('mongoose-auto-increment');

const saltRounds = 10

const userSchema = new mongoose.Schema({
    _id: Number,
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    balance: {
        type: Number,
        default: 0
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    sex: {
        type: String,
        enum: ['male', 'female'],
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false
    }
}, {
    timestamps: true,
    versionKey: false
})

userSchema.plugin(autoIncrement.plugin, { 
    model: 'User',
    startAt: 1
})

userSchema.pre('save', async function(next) {
    const user = this;

    if (!user.isModified('password')) return next();

    const hashedPassword = await bcrypt.hash(user.password, saltRounds)
    user.password = hashedPassword
    next();
});

userSchema.methods.comparePassword = async function(password) {
    const hashedPassword = this.password
    const isPasswordCorrect = await bcrypt.compare(password, hashedPassword)
    return isPasswordCorrect
}

mongoose.model("User", userSchema)
