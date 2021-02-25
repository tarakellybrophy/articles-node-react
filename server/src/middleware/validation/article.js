import validator from '../../lib/validate.js';

const validateNewArticle = (req, res, next) => {
    const rules = {
        "title": "required|string",
        "body": "required|string",
        "author": "required|exists:User,_id",
        "category": "required|exists:Category,_id",
        "tags": "required|array",
        "tags.*": "exists:Tag,_id"
    }
    validator(req.body, rules, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } 
        else {
            next();
        }
    });
}

const validateArticleId = (req, res, next) => {
    const rules = {
        "id": "required|exists:Article,_id"
    }
    validator(req.params, rules, {}, (err, status) => {
        if (!status) {
            res.status(404).json({
                success: false,
                message: "Article not found"
            });
        } 
        else {
            next();
        }
    });
}

const validateArticleUpdate = (req, res, next) => {
    const rules = {
        "title": "required|string",
        "body": "required|string",
        "category": "required|exists:Category,_id",
        "tags": "required|array",
        "tags.*": "exists:Tag,_id"
    }
    validator(req.body, rules, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } 
        else {
            next();
        }
    });
}

export { validateNewArticle, validateArticleId, validateArticleUpdate }