'use strict'

const { model, Schema } = require("mongoose");

const DOCUMENT_NAME = "Apikey";
const COLLECTION_NAME = "ApiKeys";
// Declare the Schema of the Mongo model
var apiKeySchema = new Schema(
    {
        key: {
            type: String,
            required: true,
            unique: true,   
        },
        status: {
            type: String,
            default: true,
        },
        permissions: {
            type: [String],
            required: true,
            enum: ['0000', '1111', '2222']
        },
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    }
);

//Export the model
module.exports = model(DOCUMENT_NAME, apiKeySchema);

