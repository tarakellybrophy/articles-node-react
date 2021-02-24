import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            unique: true
        },
        hash: String,
        salt: String
    },
    {
        timestamps: true
    }
);

userSchema.statics.findByLogin = async function (login) {
    let user = await this.findOne({
      username: login,
    });   
    return user;
};

const User = mongoose.model('User', userSchema);

export default User;