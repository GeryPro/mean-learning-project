const express = require('express');
const mongoose = require('mongoose');
const Post = require('./models/post');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/mean-prj');

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET, POST, PATCH, DELETE, OPTIONS'
	);
	next();
});

app.get('/api/posts', (req, res) => {
	Post.find().then((documents) =>
		res.status(200).json({
			message: 'Posts fetched successfully!',
			posts: documents,
		})
	);
});

app.post('/api/posts', (req, res) => {
	const post = new Post({
		title: req.body.title,
		content: req.body.content,
	});

	post.save();
	res.status(201).json({ message: 'Post added successfully.' });
});

module.exports = app;
