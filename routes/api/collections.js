const express = require("express");
const router = express.Router();
const passport = require('passport');

const Collection = require('../../models/Collection');
const Image = require('../../models/Image');
const Comment = require("../../models/Comment");
const Like = require("../../models/Like");
const validateCollectionInput = require('../../validation/collections');
const validateImageInput = require("../../validation/images");
const validateCommentInput = require("../../validation/comments");

//route to get all collections
router.get('/', (req, res) => {
  Collection
    .find().sort({ date: -1 })
    .then(collections => res.json(collections))
    .catch(err => res.status(400).json(err));
});

//route to get a specific collection
router.get('/:collectionId', (req, res) => {
  Collection
    .findById(req.params.collectionId)
    .then(collection => res.json(collection))
    .catch(err => res.status(400).json(err));
});

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

//route to get all images within a collection
router.get("/:collectionId/images", (request, response) => {
  Collection.findById(request.params.collectionId)
    .populate("images")
    .then(collection => {
      response.json(collection.images);
    })
    .catch(err => res.status(400).json(err));
});

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

//route to delete an image from a collection
router.delete("/:collectionId/images/:imageId", (request, response) => {
  const collId = request.params.collectionId;
  const imgId = request.params.imageId;

  Collection
    .findById(collId)
    .then(collection => {
      let idx = collection.images.indexOf(imgId);
      if (idx === -1) {
        response.json({ msg: "Cannot find image" });
      } else {
        Image
          .deleteMany({ _id: collection.images[idx] })
          .then(() => {
            collection.images.splice(idx, 1);
            collection.save().then(() => response.send("operation complete"));
            response.json(collection);
          }).catch(() => response.status(404).send("Image not found"));
      }
    }).catch(() => response.status(404).send("Collection not found"));
});

//get all comments on a collection
router.get("/:collectionId/comments", (request, response) => {
  let collId = request.params.collectionId;

  Collection
    .findById(collId)
    .populate("comments")
    .then(collection => {
      response.json({ comments: collection.comments });
    }).catch(() => response.status(404).send("Collection not found"));
});

//post a comment on a collection
router.post("/:collectionId/comments",
  passport.authenticate('jwt', { session: false }),
  (request, response) => {
    let collId = request.params.collectionId;

    const { isValid, errors } = validateCommentInput(request.body);
    if (!isValid) return response.status(400).json(errors);

    const newComment = new Comment({
      parentCollection: collId,
      author: request.user.id,
      bodyText: request.body.bodyText
    });

    newComment
      .save()
      .then(comment => {
        Collection
          .findById(collId)
          .then(collection => {
            collection.comments.push(comment.id);
            collection.save();
          });
        response.json({ comment });
      });
  }
);

//delete a comment from a collection
router.delete("/:collectionId/comments/:commentId",
  passport.authenticate("jwt", { session: false }),
  (request, response) => {
    const collId = request.params.collectionId;
    const commentId = request.params.commentId;

    Collection
      .findById(collId)
      .then(collection => {
        let idx = collection.comments.indexOf(commentId);
        if (idx === -1) {
          response.json({ msg: "Cannot find comment" });
        } else {
          Comment
            .deleteMany({ _id: collection.comments[idx] })
            .then(() => {
              collection.comments.splice(idx, 1);
              collection.save().then(() => response.send("operation complete"));
              response.json(collection);
            }).catch(() => response.status(404).send("Comment not found"));
        }
      }).catch(() => response.status(404).send("Collection not found"));
  }
);

//get all likes on a collection
router.get("/:collectionId/likes", (request, response) => {
  let collId = request.params.collectionId;

  Collection.findById(collId)
    .then(collection => {
      response.json({ likes: collection.likes });
    }).catch(err => response.status(400).json(err));
});

//like a collection
router.post("/:collectionId/likes",
  passport.authenticate("jwt", { session: false }),
  (request, response) => {
    let collId = request.params.collectionId;
    let saveLike = true;

    Collection.findById(collId).populate("likes")
      .then(collection => {

        for (let i = 0; i < collection.likes.length; i++) {
          if (collection.likes[i].user.equals(request.user.id)) {
            response.json({ msg: "You already like this" });
            saveLike = false;
          }
        }

        if (saveLike) {
          let newLike = new Like({
            parentCollection: collId,
            user: request.user.id
          });

          newLike.save()
            .then(like => {
              collection.likes.push(like.id);
              response.json(collection);
              collection.save().then(coll => {
                response.json({ like });
              });
            }).catch(err => response.status(400).json(err));
        }
      }).catch(err => response.status(400).json(err));
  }
);

//unlike a collection
router.delete("/:collectionId/likes",
  passport.authenticate("jwt", { session: false }),
  (request, response) => {
    let collId = request.params.collectionId;
    let likeId;
    let myId = request.user.id;

    Like.findOneAndRemove({ parentCollection: collId, user: myId })
      .then(like => {
        likeId = like.id;
        Collection.findById(collId).then(collection => {
          collection.likes = collection.likes.filter(l => !l.equals(likeId));
          collection.save()
            .then(() => response.json({ msg: "Like removed" }))
            .catch(() => response.json({ err: "Like was not removed" }));
        });
      });
  }
);

module.exports = router;
