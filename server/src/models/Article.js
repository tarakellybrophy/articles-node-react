import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const articleSchema = new Schema(
    {
        title: { 
            type: String, 
            required: true 
        },
        body: { 
            type: String, 
            required: true 
        },
        comments: [{ 
            type: Schema.Types.ObjectId, 
            ref: 'Comment'
        }],
        author: { 
            type: Schema.Types.ObjectId, 
            ref: 'User', 
            required: true 
        },
        image: { 
            type: Schema.Types.ObjectId, 
            ref: 'Image', 
            required: true 
        },
        category: { 
            type: Schema.Types.ObjectId, 
            ref: 'Category', 
            required: true 
        },
        tags: [{ 
            type: Schema.Types.ObjectId, 
            ref: 'Tag'
        }]
    },
    {
    timestamps: true
    }
);

const Article = mongoose.model('Article', articleSchema);

export default Article;