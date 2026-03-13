const connection = require('../db/connection');

const index = (req, res) => {
   const sql = 'SELECT * FROM posts'

   connection.query(sql, (err, results) => {
    if (err) return res.status(500).json({success: false, error: 'Database query failed'});
    res.json({
        success: true,
        result: results});
   })
    
};

const show = (req, res) => {
    const id = parseInt(req.params.id);
    // res.send(`Visualizzato post ${req.params.id}`);
    const post = posts.filter((post) => post.id === id);

    post.length != 0 ? res.json(post) : res.status(404).json(
        { 
        success: false,
        message: "Post non trovato."
    });


};
const store = (req, res) => {
    const postsCopy = [...posts];
    const { title, content, image, tags } = req.body;
    
    const newPost = {
        id: postsCopy[postsCopy.length - 1].id + 1,
        title: title,
        content: content,
        image: image,
        tags: tags
    };

    posts.push(newPost);

    console.log(newPost);
    res.send(postsCopy);
};
const update = (req, res) => {
    const id = parseInt(req.params.id);
    const { title, content, image, tags } = req.body;

    const post = posts.find((post) => post.id === id);

    post.title = title;
    post.content = content;
    post.image = image;
    post.tags = tags;


    res.json({
        success: true,
        result: post
    });
};
const modify = (req, res) => {
    res.send(`il post ${req.params.id} è stato modificato parzialmente`);
};
const destroy = (req, res) => {
    // res.send(`il post ${req.params.id} è stato eliminato`);
    const id = parseInt(req.params.id);
    const newPostsList = posts.filter((post) => post.id != id);
    console.log(newPostsList);
    const deletedPost = posts.filter((post) => post.id === id);

    deletedPost.length > 0? 
    res.status(204): 
    res.status(404).json(
        {
            success: false,
            message: "il post che si vuole eliminare non esiste"
        }
    );
    
    

};

module.exports = {index, show, store, update, modify, destroy};