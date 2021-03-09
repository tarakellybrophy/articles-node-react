import Tag from '../models/Tag.js';

const index = async function(req, res, next) {
    try {
        const tags = await Tag.find({})
                              .exec();
        res.status(200).json(tags);
    }
    catch(error) {
        res.status(500).json({
            error: error.message
        });
    }
};

export { index };