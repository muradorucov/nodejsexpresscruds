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

app.post('/add', (req, res) => {
    const email = req.body;
    posts.push(email);
    console.log(email);
    res.json(email);
})