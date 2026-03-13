const connection = require('../db/connection');

const index = (req, res) => {
   const sql = 'SELECT * FROM posts'

   connection.query(sql, (err, results) => {
       if (err) return res.status(500).json({ success: false, error: 'Errore interno del database operazione fallita'});
    res.json({
        success: true,
        result: results});
        console.log(results);
   })
    
};

const show = (req, res) => {
    const id = parseInt(req.params.id);
    
    const sql = 'SELECT * FROM posts WHERE id = ?';

    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({
            success: false,
            message: 'Errore interno del database operazione fallita'
        });

        if (results.length === 0) return res.status(404).json({
            success: false,
            message: "Post non trovato." 
        });

        res.json({
            success: true,
            result: results
        })

        console.log(results.affectedRows);
    })


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
    const id = parseInt(req.params.id);
    const sql = 'DELETE FROM posts WHERE id = ?';

    connection.query(sql,[id], (err, results) => {
        if (err) return res.status(500).json({
                success: false,
                message: 'Errore interno del database operazione fallita'
            });

        if (results.affectedRows === 0) return res.status(404).json({
            success: false,
            message: 'il post che si vuole eliminare non esiste'
        });

        res.status(204).json({
            success: true,
            message: 'il post è stato eliminato'
        });
    })
};

module.exports = {index, show, store, update, modify, destroy};