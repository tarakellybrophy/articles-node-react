import connectDB from '../lib/database.js';
import Article from '../models/Article.js';
import Tag from '../models/Tag.js';
import Category from '../models/Category.js';
import User from '../models/User.js';
import Image from '../models/Image.js';
import Comment from '../models/Comment.js';

const index = async function(req, res, next) {
    try {
        await connectDB();
        const articles = await Article.find({})
                                      .populate('tags')
                                      .populate('category')
                                      .populate('author')
                                      .populate('image')
                                      .exec();
        res.json(articles);
    }
    catch(error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const show = async function(req, res, next) {
    try {
        await connectDB();
        const article = await Article.findById(req.params.id)
                                     .populate('tags')
                                     .populate('category')
                                     .populate('author')
                                     .populate('image')
                                     .populate({
                                         path: 'comments',
                                         populate: { path: 'author', model: 'User' }
                                      })
                                     .exec();

        if (article === null) {
            res.status(404).json({
                success: false,
                message: "article not found"
            });
        }
        else {
            res.json(article);
        }
    }
    catch(error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export { index, show };