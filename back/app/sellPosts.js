const path = require('path');
const express = require('express');
const multer = require('multer');
const nanoid = require('nanoid');

const auth = require('../middleware/auth');

const config = require('../config');

const SellPost = require('../models/SellPost');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});

const upload = multer({storage});

const router = express.Router();

router.get('/', async (req, res) => {
    if (req.query.category) {
        try {
            const items = await SellPost.find({category: req.query.category});

            if (!items) {
                return res.status(404).send({message: 'Not found'});
            }

            res.send(items);
        } catch (e) {
            res.status(404).send({message: 'Not found'});
        }
    } else {
        const items = await SellPost.find();
        res.send(items);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const item = await SellPost.findById(req.params.id);

        if (!item) {
            return res.status(404).send({message: 'Not found'});
        }

        res.send(item);
    } catch (e) {
        res.status(404).send({message: 'Not found'});
    }
});

router.post('/', auth, upload.single('image'), async (req, res) => {
    const sellPostData = req.body;
    const user = req.user;
    sellPostData.user = user._id;

    if (req.file) {
        sellPostData.image = req.file.filename;
    }

    const posts = new SellPost(sellPostData);

    try {
        await posts.save();

        return res.send({message: "Successful posted"});
    } catch (e) {
        return res.status(400).send(e);
    }
});

router.delete('/:id', auth, async (req, res) => {
    try{
        const user = req.user;
        const post = await SellPost.findById(req.params.id);
        if(JSON.stringify(post.user) === JSON.stringify(user._id)){
            const delRes = await SellPost.deleteOne({_id: req.params.id});
            if (delRes) {
                return res.send({message: 'Deleted successfully'});
            } else{
                return res.status(400).send({error: "Could't delete your task"});
            }
        } else{
            return res.status(400).send({error: "Unauthorized user"});
        }

    } catch(e){
        res.status(400).send(e);
    }
});


module.exports = router;