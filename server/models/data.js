const mongoose = require('mongoose');
// Define the database model
const PostLoginSchema = new mongoose.Schema({
  description: {
    type: String,
    required: [true, 'description is required.']
  }
});

const User = module.exports = mongoose.model('PostLogin', PostLoginSchema);
