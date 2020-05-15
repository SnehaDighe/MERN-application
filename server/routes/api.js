const express = require('express');
const RateLimit = require('express-rate-limit');
const router = new express.Router();
const PostLoginDetails = require('../models/data');

const minutes = 5;
const postLimiter = new RateLimit({
  windowMs: minutes * 60 * 1000, // milliseconds
  max: 100, // Limit each IP to 100 requests per windowMs 
  delayMs: 0, // Disable delaying - full speed until the max limit is reached 
  handler: (req, res) => {
    res.status(429).json({ success: false, msg: `You made too many requests. Please try again after ${minutes} minutes.` });
  }
});

router.get('/dashboard', (req, res) => {
  res.status(200).json({
    message: "Starting tracking now..",
    // user values passed through from auth middleware
    user: req.user
  });
});


// READ (ONE)
router.get('/users/:id', (req, res) => {
  PostLoginDetails.findById(req.params.id)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(404).json({ success: false, msg: `No such user.` });
    });
});

// READ (ALL)
router.get('/users/', (req, res) => {
  PostLoginDetails.find({})
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
    });
});

// CREATE
router.post('/users/',postLimiter,(req, res, next) => {
  let newUser = new PostLoginDetails({
    description: req.body.description
  });
  
  newUser.save()
    .then((result) => {
      res.json({
        success: true,
        msg: `Successfully added!`,
        result: {
          _id: result._id,
          description: result.description
        }
      });
    })
    .catch((err) => {
      if (err.errors) {
        if (err.errors.description) {
          res.status(400).json({ success: false, msg: err.errors.description.message });
          return;
        }
        // Show failed if all else fails for some reasons
        res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
      }
    });
});

// UPDATE
router.put('/users/:id', (req, res, next) => {

  let updatedUser = {
    description: req.body.description
    //description: "test"
  };

  PostLoginDetails.findOneAndUpdate({ _id: req.params.id }, updatedUser, { runValidators: true, context: 'query' })
    .then((oldResult) => {
      PostLoginDetails.findOne({ _id: req.params.id })
        .then((newResult) => {
          res.json({
            success: true,
            msg: `Successfully updated!`,
            result: {
              _id: newResult._id,
              description: newResult.description
            }
          });
        })
        .catch((err) => {
          res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
          return;
        });
    })
    .catch((err) => {
      if (err.errors) {
        if (err.errors.description) {
          res.status(400).json({ success: false, msg: err.errors.description.message });
          return;
        }
        // Show failed if all else fails for some reasons
        res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
      }
    });
});

// DELETE
router.delete('/users/:id', (req, res) => {

  PostLoginDetails.findByIdAndRemove(req.params.id)
    .then((result) => {
      res.json({
        success: true,
        msg: `It has been deleted.`,
        result: {
          _id: result._id,
          description: result.description
        }
      });
    })
    .catch((err) => {
      res.status(404).json({ success: false, msg: 'Nothing to delete.' });
    });
});

module.exports = router;



