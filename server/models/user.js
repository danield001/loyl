const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    username: {
        required: 'Username is required', 
        type: String,
        maxlength: 280,
        unique: true,
    },
    email: {
        type: String,
        required: "Email address is required",
        unique: true,
        match: [/.+@.+\..+/, 'Must match an email address!'],
    },
    password: {
        type: String,
        required: 'Password is required',
        minlength: 8,
    },
    isBusiness: {
        type: Boolean,
        required: true,
        default: false, //default value for non-business users
    }
});

userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds)
    }

    next()
});

userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password)
};

const User = model('User', userSchema);

module.exports = User;