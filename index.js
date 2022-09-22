const express = require("express");
let bodyParser = require("body-parser");
const app = express();
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads/productImages");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({
  storage: storage,
});
var uuid = require("uuid");

app.use(require('cors')());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000, function () {
  console.log("listening on 3000");
});

const posts = [
  {
    id: 1,
    name: "Product1",
    unitPrice: 101,
    quantity: 5,
    image: null,
  },
  {
    id: 2,
    name: "Product2",
    unitPrice: 102,
    quantity: 5,
    image: null,
  },
];

app.get("/", (req, res) => {
  try {
    res.send(posts);
  } catch (e) {
    console.log(e);
  }
});
app.get("/product/:id", (req, res) => {
    const idOfPost = req.params.id;
    const PostIdx = posts.find((post) => post.id == idOfPost);
    res.send(PostIdx);
});

app.post("/", upload.single("image"), (req, res) => {
  try {
    const fileName = req.file != null ? req.file.filename : null;
    const newProd = {
      id: uuid.v1(),
      name: req.body.name,
      price: req.body.price,
      quantity: req.body.quantity,
      image: fileName,
    };
    posts.push(newProd);
    res.json(newProd);
  } catch (e) {
    console.log(e);
  }
});

app.put("/:id", upload.single("image"), function (req, res) {
  const idOfPost = req.params.id;
  const PostIdx = posts.findIndex((post) => post.id == idOfPost);

  if (PostIdx !== -1) {
    const fileName = req.file != null ? req.file.filename : null;
    const oldpost = posts[PostIdx];
    posts[PostIdx] = { ...oldpost, ...req.body };
    posts[PostIdx].image = fileName;
    res.json(posts[PostIdx]);
  } else {
    res.status(404).json();
  }
});

app.delete("/:id", function (req, res) {
  const delIndex = posts.findIndex(
    (data) => data.is == req.params.id
  );
  posts.splice(delIndex, 1);
  res.send(posts);
});
