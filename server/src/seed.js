import mongoose from 'mongoose';

import connectDB from './lib/database.js';
import User from './models/User.js';
import Category from './models/Category.js';
import Tag from './models/Tag.js';
import Image from './models/Image.js';
import Article from './models/Article.js';
import Comment from './models/Comment.js';
import { passwordHash } from './lib/utils.js';
import './lib/faker.min.js';

const numberOfUsers = 15;
const numberOfArticles = 100;
const maxCommentsPerArticle = 5;

try {
    await connectDB();

    await Article.deleteMany({});
    await Comment.deleteMany({});
    await Image.deleteMany({});
    await User.deleteMany({});
    await Category.deleteMany({});
    await Tag.deleteMany({});

    const tags = [
        "Small",
        "Ergonomic",
        "Rustic",
        "Intelligent",
        "Gorgeous",
        "Incredible",
        "Fantastic",
        "Practical",
        "Sleek",
        "Awesome",
        "Generic",
        "Handcrafted",
        "Handmade",
        "Licensed",
        "Refined",
        "Unbranded",
        "Tasty"
    ];
    for (let i = 0; i != tags.length; i++) {
        const tag = new Tag();
        tag.title = tags[i];
        tag.save();
    }
    
    const categories = [
        "Books",
        "Movies",
        "Music",
        "Games",
        "Electronics",
        "Computers",
        "Home",
        "Garden",
        "Tools",
        "Grocery",
        "Health",
        "Beauty",
        "Toys",
        "Kids",
        "Baby",
        "Clothing",
        "Shoes",
        "Jewelery",
        "Sports",
        "Outdoors",
        "Automotive",
        "Industrial"
    ];
    for (let i = 0; i != categories.length; i++) {
        const category = new Category();
        category.title = categories[i];
        category.save();
    }
    
    for (let i = 0; i !== numberOfUsers; i++) {
        const saltHash = passwordHash("secret");
        const user = new User();
        user.username = faker.internet.userName();
        user.hash = saltHash.hash;
        user.salt = saltHash.salt;
        await user.save();
    }

    const dbTags = await Tag.find({});
    for (let i = 0; i != numberOfArticles; i++) {
        const image = new Image();
        image.path = "http://placeimg.com/640/480/nature";
        await image.save();
        
        let random = Math.floor(Math.random() * numberOfUsers);
        const author = await User.findOne().skip(random).exec();

        random = Math.floor(Math.random() * categories.length);
        const category = await Category.findOne().skip(random).exec();

        const randomTags = dbTags.filter(tag => Math.random() > 0.8);

        const randomNumComments = Math.floor(Math.random() * maxCommentsPerArticle);
        const comments = [];
        for (let j = 0; j != randomNumComments; j++) {
            random = Math.floor(Math.random() * numberOfUsers);
            const commentAuthor = await User.findOne().skip(random).exec();
            const comment = new Comment();
            comment.body = faker.lorem.sentences()
            comment.author = commentAuthor._id;
            await comment.save();
            comments.push(comment._id);
        }

        const article = new Article();
        article.title = faker.lorem.sentence();
        article.body = faker.lorem.paragraphs();
        article.author = author._id;
        article.image = image._id;
        article.category = category._id;
        article.tags = randomTags.map(tag => tag._id);
        article.comments = comments;
        await article.save();
    }
}
catch(error) {
    console.log(error);
}
finally {
  if (mongoose.connection !== null && mongoose.connection.readyState === 1) {
    await mongoose.connection.close();
    console.log("Disconnected successfully to server");
  }
}