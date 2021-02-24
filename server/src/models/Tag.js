import mongoose from 'mongoose';

const TagSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, unique: true }
    },
    {
        timestamps: true
    }
);

const Tag = mongoose.model('Tag', TagSchema );

export default Tag;