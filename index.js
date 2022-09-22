const express = require('express');
let bodyParser = require("body-parser");
const { parse } = require('path');
const app = express();


app.use(bodyParser.urlencoded());

app.use(bodyParser.json());


app.listen(3000, function () {
    console.log('listening on 3000')
})


const posts = [
    {
        id: 1,
        name: "Product1",
        unitPrice: 101
    },
    {
        id: 2,
        name: "Product2",
        unitPrice: 102
    },
    {
        id: 3,
        name: "Product3",
        unitPrice: 103
    },
    {
        id: 4,
        name: "Product4",
        unitPrice: 104
    }
]

app.get('/', (req, res) => {
    res.send(posts)
})

app.post('/add', (req, res) => {
    const email = req.body;
    posts.push(email);
    res.json(email);
})


app.put("/post/:id", function (req, res) {
    const idOfPost = parseInt(req.params.id);
    const PostIdx = posts.findIndex((post) => post.id === idOfPost);

    if (PostIdx !== -1) {
        const oldpost = posts[PostIdx];
        posts[PostIdx] = { ...oldpost, ...req.body };
        res.json(posts[PostIdx]);
    } else {
        res.status(404).json();
    }
});

app.delete("/:id", function (req, res) {
    const delIndex = posts.findIndex(
        (data) => data.is === parseInt(req.params.id)
    );
    posts.splice(delIndex, 1);
    res.send(posts);
});
