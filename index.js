const express = require('express');
let bodyParser = require("body-parser");
const app = express();
const multer = require("multer")
const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, './public/uploads/productImages')
    },
    filename: function (req, file, cb){
        cb(null, file.originalname)
    }
})
const upload = multer({
    storage: storage
})
var uuid = require('uuid');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


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

app.post('/', upload.single('image'), (req, res) => {
    const fileName = req.file != null ? req.file.filename : null
    const newProd = 
    {
        id: uuid.v1(),
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity,
        image: fileName
    }
    posts.push(newProd);
    res.json(newProd);
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
