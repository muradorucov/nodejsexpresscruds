const express = require('express');
const app = express();

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