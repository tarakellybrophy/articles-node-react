import mongoose from 'mongoose';

const ImageSchema = new mongoose.Schema(
    {
        path: { type: String, required: true }
    },
    {
        timestamps: true
    }
);

const Image = mongoose.model('Image', ImageSchema );

export default Image;