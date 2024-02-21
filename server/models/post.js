const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const postSchema = new Schema({
    caption: { type: String, required: true },
    image: { type: String, required: true },
    createdBy: { type: String, required: true },
    comments : [
        {
            commentText: {
                type: String,
                required: true,
                minlength: 1,
                maxlength: 280,
            },
            createdAt: {
                type: Date,
                default: Date.now,
                get: (timestamp) => dateFormat(timestamp),
            }
        }
    ]
});

const Post = model('Post', postSchema);

module.exports = Post;