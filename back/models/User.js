const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const nanoid = require('nanoid');

const SALT_WORK_FACTOR = 10;

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    login: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: async function (value) {
                if (!this.isModified('login')) return true;

                const user = await User.findOne({login: value});
                if (user) throw new Error('This user is already registered');
            }
        }
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    }
});

UserSchema.methods.generateToken = function() {
    this.token = nanoid();
};

UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    const hash = await bcrypt.hash(this.password, salt);

    this.password = hash;
    next();
});

UserSchema.set('toJSON', {
    transform: (doc, ret, options) => {
        delete ret.password;
        return ret;
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;