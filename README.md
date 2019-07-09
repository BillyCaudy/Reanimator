# Reanimator

## Reanimator, photo sharing app to assist users in making timelapse animations

[Link to Live App](http://reanimator-bel.herokuapp.com)

## Background and Overview

Reanimator's main feature is its ability to generate a timelapse animation from users uploading photos. When a user creates a new collection by taking the first photo, they will select an interval at which they want the app to notify them to upload another photo. This could be multiple times per day all the way up to once a month.

Users will have profiles that will allow them to add other profiles as friends. This will populate their homepage with a feed of recently updated collections from their friends.

## Functionality

1. User authorization (Sign up, log in, log out)
    * Provides secure, encrypted account creation using Bcrypt
1. Upload and save photos to user collections using MongoDB and AWS
1. Generate video or gif from a collection using JavaScript

```javascript
//secure sign up route for users
router.post('/signup', (req, res) => {
  const { errors, isValid } = validateSignUpInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "A user already exists with this email" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save()
            .then(user => {
              const payload = {
                id: user.id,
                name: user.name,
                email: user.email
              };

              jwt.sign(
                payload,
                keys.secretOrKey,
                { expiresIn: 3600 },
                (err, token) => {
                  res.json({
                    success: true,
                    token: 'Bearer ' + token
                  });
                }
              );

              const friendship = new Friendship({
                userId: user.id
              });
              friendship.save();
            })
            .catch(err => console.log(err));
        });
      });
    }
  });
});
```

## Technologies & Technical Challenges

This app is built with the MERN stack. (MongoDB, Express, React, and Node.js)

### Backend

MongoDB is used for the database. The two main models it will manage are for the users and collections of photos. Express will be used to build up a framework to interact with and manage our database information and store and retrieve photos through AWS.

### Frontend

Using React / Redux we created all of our frontend views and managed the frontend state to make this a single page app.

### Technical Challenges

* Working with MongoDB and Express to build a new backend
  * This was a new tech stack when starting this project, so we had to quickly ramp up to implement
* Creating the timelapse generating technology
  * This had to be prototyped using custom JavaScript. We explored CSS animations, but found that it didn't offer the functionality we needed to adjust the animation of photos.
