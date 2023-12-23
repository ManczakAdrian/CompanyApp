const express = require('express');
const router = express.Router();
const db = require('./../db');

router.get('/employees', (req, res) => {
  req.db.collection('employees')
    .find()
    .toArray()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
  //res.json(db.employees);
});

router.get('/employees/random', (req, res) => {
  req.db.collection('employees')
    .aggregate([{ $sample: { size: 1 } }])
    .toArray()
    .then((data) => {
      res.json(data[0]);
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
  //res.json(db.employees[Math.floor(Math.random() * db.length)]);
});

router.get('/employees/:id', (req, res) => {
  req.db.collection('employees')
  .findOne({ _id: ObjectId(req.params.id) })
  .then((data) => {
    if(!data) res.status(404).json({ message: 'Not found' });
    else res.json(data);
  })
  .catch((err) => {
    res.status(500).json({ message: err });
  });
  //res.json(db.employees.find(item => item.id == req.params.id));
});

router.post('/employees', (req, res) => {
  const { firstName, lastName } = req.body;
  req.db.collection('employees')
  .insertOne({ firstName: name })
  .insertOne({ lastName: name })

  .then(() => {
    res.json({ message: 'OK' });
  })
  .catch((err) => {
    res.status(500).json({ message: err });
  })
  //db.employees.push({ id: 3, firstName, lastName })
  //res.json({ message: 'OK' });
});

router.put('/employees/:id', (req, res) => {
  const { firstName, lastName } = req.body;
  req.db.collection('employees')
  .updateOne({ _id: ObjectId(req.params.id) }, { $set: { name: name }})
  .then(() => {
    res.json({ message: 'OK' });
  })
  .catch((err) => {
    res.status(500).json({ message: err });
  })
  //db = db.employees.map(item => (item.id == req.params.id) ? { ...item, firstName, lastName } : item );
 // res.json({ message: 'OK' });
});

router.delete('/employees/:id', (req, res) => {
  const { firstName, lastName } = req.body;
  req.db.collection('departments')
  .deleteOne({ _id: ObjectId(req.params.id) })
  .then(() => {
    res.json({ message: 'OK' });
  })
  .catch((err) => {
    res.status(500).json({ message: err });
  })
  //db = db.employees.filter(item => item.id != req.params.id)
  //res.json({ message: 'OK' });
});

module.exports = router;
