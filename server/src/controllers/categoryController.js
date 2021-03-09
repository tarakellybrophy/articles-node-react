import Category from '../models/Category.js';

const index = async function(req, res, next) {
    try {
        const categories = await Category.find({})
                                         .exec();
        res.status(200).json(categories);
    }
    catch(error) {
        res.status(500).json({
            error: error.message
        });
    }
};

export { index };