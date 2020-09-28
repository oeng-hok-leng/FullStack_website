const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get Posts 

router.get('/', async (req,res)=>{
    const posts = await loadPostCollection();
    res.send(await posts.find({}).toArray());

});

// Add Post 
router.post('/',async (req, res) => {
    const posts = await loadPostCollection();
    await posts.insertOne({
        text: req.body.text ,
        createdAt : new Date()
    })
    res.status(201).send();
})

// Delete
router.delete('/:id', async (req,res) =>{
    const posts = await loadPostCollection();
    await posts.deleteOne({_id: mongodb.ObjectID(req.params.id)});
    res.status(200).send();
})

// loadPostCollectiont
async function loadPostCollection () {
    const client = await mongodb.MongoClient.connect
    ('mongodb+srv://oenghokleng:1234@cluster0.fqmth.gcp.mongodb.net/Mylist',{
        useNewUrlParser: true
    })
    return client.db('Mylist').collection('posts');
}

module.exports = router ;