const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

const User = require('../models/user');

// Sign up
router.post('/signup', (req, res, next) => {
    User.find({email: req.body.email})
        .exec()
        .then(user => {
            if (user.length >= 1){
                return res.status(409).json({
                    message: "Email Already Exists"
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        })
                    } else {
                        const user = new User({
                            _id: mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash
                        })

                        user.save()
                            .then(result => {
                                console.log(result);
                                res.status(201).json({
                                    message: "User created"
                                })
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    error: err
                                })
                            })
                    }
                });
            }
        })
        .catch();    
});

// Log in
router.post('/login', (req, res, next) => {
     User.find({email: req.body.email })
        .exec()
        .then(user => {
            if (user.length < 1){
                return res.status(401).json({
                    message: 'Invalid Credentials'
                });
            } else {
                bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                    if (err) {
                        return res.status(401).json({
                            message: 'Invalid Credentials'
                        });
                    }

                    if (result){
                        const token = jwt.sign({ email: user[0].email, userId: user[0]._id }, "secret", { expiresIn: '1h'});
                        return res.status(200).json({
                            message: 'Access Granted',
                            token: token
                        });
                    }

                    res.status(401).json({
                        message: 'Invalid Credentials'
                    });
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.delete('/:userId', (req, res, next) => {
    User.remove({_id: req.params.userId})
        .exec()
        .then(result => {
            res.status(200).json({
                message: "User deleted"
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: "Unexpected Error",
                error: err
            });
        });
});

module.exports = router;
