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
        id: 2,
        name: "Product1",
        unitPrice: 2374
    },
    {
        id: 2,
        name: "Product1",
        unitPrice: 2374
    },
    {
        id: 2,
        name: "Product1",
        unitPrice: 2374
    },
    {
        id: 2,
        name: "Product1",
        unitPrice: 2374
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