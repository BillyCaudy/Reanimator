const express = require("express");
const router = express.Router();
const passport = require('passport');

const Collection = require('../../models/Collection');
const Image = require('../../models/Image');
const validateCollectionInput = require('../../validation/collections');

//route to create a collection
router.post('/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { isValid, errors } = validateCollectionInput(req.body);

    if (!isValid) return res.status(400).json(errors);

    const newCollection = new Collection({
      owner: req.user.id,
      title: req.body.title,
      notificationFrequency: req.body.notificationFrequency,
      animationSpeed: req.body.animationSpeed
    });

    newCollection.save()
      .then(collection => res.json(collection));
  }
);

//route to get all collections
router.get('/', (req, res) => {
  Collection
    .find().sort({ date: -1 })
    .then(collections => res.json(collections))
    .catch(err => res.status(400).json(err));
});

//route to update collection
router.patch('/:collectionId',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { isValid, errors } = validateCollectionInput(req.body);
    if (!isValid) return res.status(400).json(errors);

    Collection.findById(req.params.collectionId)
      .then(collection => {

        if (!collection.owner.equals(req.user._id)) {
          return res.status(400).json({
            text: 'That is not your collection to edit'
          });
        }

        collection.updateOne({
          title: req.body.title,
          notificationFrequency: req.body.notificationFrequency,
          animationSpeed: req.body.animationSpeed
        }).then(collection => res.json(collection));
      });
  }
);

//route to get a specific collection
router.get('/:collectionId', (req, res) => {
  Collection
    .findById(req.params.collectionId)
    .then(collection => res.json(collection))
    .catch(err => res.status(400).json(err));
});

//route to get all collections from a particular user
router.get('/user/:userId', (req, res) => {
  Collection
    .find({ owner: req.params.userId }).sort({ date: -1 })
    .then(collections => res.json(collections))
    .catch(err => res.status(400).json(err));
});

//route to delete a collection
router.delete('/:collectionId',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const message1 = 'Collection deleted';
    const message2 = 'Images deleted';

    Image
      .deleteMany({
        parentCollection: req.params.collectionId
      })
      .then(() => res.json({ message2 }))
      .catch(err => res.status(400).json(err));

    Collection
      .deleteMany({
        _id: req.params.collectionId
      })
      .then(() => res.json({ message1 }))
      .catch(err => res.status(400).json(err));
  }
);

module.exports = router;
