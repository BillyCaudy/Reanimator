const express = require("express");
const router = express.Router();
const passport = require('passport');

const Image = require('../../models/Image');
const validateImageInput = require('../../validation/images');

//route to create an image inside of a collection
router.post('/collection/:collectionId',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { isValid, errors } = validateImageInput(req.body);

    if (!isValid) return res.status(400).json(errors);

    const newImage = new Image({
      parentCollection: req.params.collectionId,
      imgName: req.body.imgName,
      imgUrl: req.body.imgUrl
    });

    newImage.save()
      .then(image => res.json(image));
  }
);

//route to get all images for specific collection
router.get('/collection/:collectionId', (req, res) => {
  Image
    .find({ parentCollection: req.params.collectionId })
    .then(images => res.json(images))
    .catch(err => res.status(400).json(err));
});

//route to get a single image
router.get('/image/:imageId', (req, res) => {
  Image
    .findById(req.params.imageId)
    .then(image => res.json(image))
    .catch(err => res.status(400).json(err));
});

module.exports = router;
