const mongoose = require('mongoose');

const blogSchemma = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: String
})

const Blog = mongoose.model("Blog", blogSchemma);

module.exports = Blog;