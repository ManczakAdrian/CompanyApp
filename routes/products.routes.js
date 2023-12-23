// post.routes.js

const express = require('express');
const router = express.Router();
const db = require('./../db');

router.get('/products', (req, res) => {
  req.db.collection('products')
    .find()
    .toArray()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
  //res.json(db.products);
});

router.get('/products/random', (req, res) => {
  req.db.collection('departments')
    .aggregate([{ $sample: { size: 1 } }])
    .toArray()
    .then((data) => {
      res.json(data[0]);
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });

 //res.json(db.products[Math.floor(Math.random() * db.length)]);
});

router.get('/products/:id', (req, res) => {
  req.db.collection('products')
  .findOne({ _id: ObjectId(req.params.id) })
  .then((data) => {
    if(!data) res.status(404).json({ message: 'Not found' });
    else res.json(data);
  })
  .catch((err) => {
    res.status(500).json({ message: err });
  });
 // res.json(db.products.find(item => item.id == req.params.id));
});

router.post('/products', (req, res) => {
  const { name, client } = req.body;
  req.db.collection('departments')
  .insertOne({ name: name })
  .then(() => {
    res.json({ message: 'OK' });
  })
  .catch((err) => {
    res.status(500).json({ message: err });
  })
  //db.products.push({ id: 3, name, client })
  //res.json({ message: 'OK' });
});

router.put('/products/:id', (req, res) => {
  const { name, client } = req.body;
  req.db.collection('departments')
  .updateOne({ _id: ObjectId(req.params.id) }, { $set: { name: name }})
  .then(() => {
    res.json({ message: 'OK' });
  })
  .catch((err) => {
    res.status(500).json({ message: err });
  })
  
  //db = db.products.map(item => (item.id == req.params.id) ? { ...item, name, client } : item );
  //res.json({ message: 'OK' });
});

router.delete('/products/:id', (req, res) => {
  const { name, client } = req.body;
  req.db.collection('departments')
    .deleteOne({ _id: ObjectId(req.params.id) })
    .then(() => {
      res.json({ message: 'OK' });
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });

  //db = db.products.filter(item => item.id != req.params.id)
  //res.json({ message: 'OK' });
});

module.exports = router;
