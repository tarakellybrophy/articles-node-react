import Joi from 'joi';

import Article from '../models/Article.js';
import User from '../models/User.js';
import Category from '../models/Category.js';
import Tag from '../models/Tag.js';
import Image from '../models/Image.js';

const index = async function(req, res, next) {
    try {
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

const store = async function (req, res, next) {
    const article = req.body;

    const schema = Joi.object({
        title: Joi.string().required(),
        body: Joi.string().required(),
        author: Joi.string().pattern(new RegExp('^[0-9a-fA-F]{24}$')).required(),
        category: Joi.string().pattern(new RegExp('^[0-9a-fA-F]{24}$')).required(),
        tags: Joi.array().items(Joi.string().pattern(new RegExp('^[0-9a-fA-F]{24}$'))).required()
    });
    const { error } = schema.validate(article, { abortEarly: false } );
    if (error !== undefined) {
        const errors = error.details.map(error => error.message);
        res.status(422).json({
            success: false,
            errors: errors
        });
    }
    else {
        const errors = [];
        if (!await User.exists({_id: article.author})) {
            errors.push("Invalid author: " + article.author);
        }
        if (!await Category.exists({_id: article.category})) {
            errors.push("Invalid category: " + article.category);
        }
        for (let i = 0; i !== article.tags.length; i++) {
            let tag = article.tags[i];
            if (!await Tag.exists({_id: tag})) {
                errors.push("Invalid tag: " + tag);
            }
        }        console.log(errors);
        if (errors.length !== 0) {
            res.status(422).json({
                success: false,
                errors: errors
            });
        }
        else {
            const image = new Image();
            image.path = "http://placeimg.com/640/480/nature";
            image.save();

            const newArticle = new Article(article);
            newArticle.image = image._id;
            newArticle.save();

            res.json({ 
                success: true,
                article: newArticle
            });
        }
    }
};

export { index, show, store };