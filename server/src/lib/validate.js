import Validator from 'validatorjs';

import Models from '../models/index.js';

Validator.registerAsync('exists', function(value,  attribute, req, passes) {
    if (!attribute) throw new Error('Specify requirements i.e fieldName: exists:table,column');

    //split table and column
    let attArr = attribute.split(",");

    if (attArr.length !== 2) throw new Error(`Invalid format for validation rule on ${attribute}`);
    
    //assign array index 0 and 1 to table and column respectively
    const { 0: table, 1: column } = attArr;

    //check if the value can be cast to a MongoDB ObjectId
    const regex = /^[0-9a-fA-F]{24}$/;

    if (!value.match(regex)){
        passes(false, `Invalid format`);
        return;
    }

    //check if incoming value already exists in the database
    Models[table].exists({ [column]: value })
    .then((result) => {
        if(!result){
            // return false if value does not exist
            passes(false, `${column} not found`); 
            return;
        }
        passes();
    });
});

const validator = (body, rules, customMessages, callback) => {
    const validation = new Validator(body, rules, customMessages);
    validation.passes(() => callback(null, true));
    validation.fails(() => callback(validation.errors, false));
};

export default validator;