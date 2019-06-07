const express = require("express");
const router = express.Router();
const passport = require('passport');

const Collection = require('../../models/Collection');
const Image = require('../../models/Image');
const validateCollectionInput = require('../../validation/collections');
const validateImageInput = require("../../validation/images");

/* verified */
//route to get all collections
router.get('/', (req, res) => {
  Collection
    .find().sort({ date: -1 })
    .then(collections => res.json(collections))
    .catch(err => res.status(400).json(err));
});

/* verified */
//route to get a specific collection
router.get('/:collectionId', (req, res) => {
  Collection
    .findById(req.params.collectionId)
    .then(collection => res.json(collection))
    .catch(err => res.status(400).json(err));
});

/* verified */
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

/* verifed */
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

/* verified */
//route to get all images within a collection
router.get("/:collectionId/images", (request, response) => {
  Collection.findById(request.params.collectionId)
    .populate("images")
    .then(collection => {
      response.json(collection.images);
    })
    .catch(err => res.status(400).json(err));
});

/* verified */
//route to create an image inside of a collection
router.post('/:collectionId/images',
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
      .then(image => {
        Collection.findById(req.params.collectionId)
          .then(coll => {
            coll.images.push(image.id);
            coll.save();
          });

        res.json(image);
      });
  }
);

/* verified */
//route to get an image from a collection
router.get("/:collectionId/images/:imageId", (request, response) => {
  const collId = request.params.collectionId;
  const imgId = request.params.imageId;

  Collection.findById(collId).then(collection => {
    let idx = collection.images.indexOf(imgId);
    Image.findById(collection.images[idx]).then(img => {
      if (img === null) response.status(404).json({ msg: "Image not found" });
      response.json(img);
    });
  }).catch(err => response.status(404).json(err));
});

/* verified */
//route to delete an image from a collection
router.delete("/:collectionId/images/:imageId", (request, response) => {
  const collId = request.params.collectionId;
  const imgId = request.params.imageId;

  Collection
    .findById(collId)
    .then(collection => {
      let idx = collection.images.indexOf(imgId);
      Image
        .deleteMany({ _id: collection.images[idx] })
        .then(() => {
          collection.images.splice(idx, 1);
          collection.save().then(() => response.send("operation complete"));
          response.json(collection);
        }).catch(() => response.status(404).send("Image not found"));

    }).catch(() => response.status(404).send("Collection not found"));
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


//route to get all collections from a particular user
router.get('/user/:userId', (req, res) => {
  Collection
    .find({ owner: req.params.userId }).sort({ date: -1 })
    .then(collections => res.json(collections))
    .catch(err => res.status(400).json(err));
});



module.exports = router;
