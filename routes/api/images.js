const express = require("express");
const router = express.Router();
const passport = require('passport');

const Image = require('../../models/Image');
const validateImageInput = require('../../validation/images');

//route to create an image inside of a collection
router.post('/collection/:collection_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { isValid, errors } = validateImageInput(req.body);

    if (!isValid) return res.status(400).json(errors);

    const newImage = new Image({
      parentCollection: req.params.collection_id,
      imgName: req.body.imgName,
      imgUrl: req.body.imgUrl
    });

    newImage.save()
      .then(image => res.json(image));
  }
);

//route to get all images for specific collection
router.get('/collection/:collection_id', (req, res) => {
  Image
    .find({ parentCollection: req.params.collection_id })
    .then(images => res.json(images))
    .catch(err => res.status(400).json(err));
});

//route to get a single image
router.get('/image/:image_id', (req, res) => {
  Image
    .findById(req.params.image_id)
    .then(image => res.json(image))
    .catch(err => res.status(400).json(err));
});

module.exports = router;
