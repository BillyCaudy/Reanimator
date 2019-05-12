const bcrypt = require('bcryptjs');
const User = require('../../models/User'); 
const password = req.body.password; 
const jwt = require('jsonwebtoken');
const keyys = require('../../config/key')

router.post('/register', (req, res) => {
    //request, register
    // Check to make sure nobody has already registered with a duplicate email
    User.findOne({ email: req.body.email })
    //request body, request email 
        .then(user => {
            if (user) {
                // Throw a 400 error if the email address already exists
                return res.status(400).json({ email: "This email address is has already been used." })
            } else {
                // Otherwise create a new user
                const newUser = new User({
                    userName: req.body.userName,
                    email: req.body.email,
                    password: req.body.password
                })

                bcrypt.genSalt(10, (err, salt) => {
                    //number of rounds, callback funciton callback gets invoked 
                    //when salt is finished and ready to continue
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        //use the salt we got from above & the new user's password 
                        //to hash the password
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    })
                })
            }
        })
})

router.post('/login', (req, res) => {
    const email = req.body.email; 
    const password = req.body.password; 

    User.findOne ({email}).then(user =>{
        if (!user){
            return res.status(404).json({ email: 'No account registered with that email.' });
        }
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                res.json({msg: 'Welcome Back!'}); 
            } else {
                return res.status(400).json({password:'Incorrect Password'})
            }
        })
    })
})