var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var ArticleSchema = new Schema({
  // `title` is required and of type String
  fTitle: {
    type: String,
    required: true,
  },
  subHead: {
    type: String,
    required: true
  },
  // `link` is required and of type String
  fLink: {
    type: String,
    required: false
  },
  img: {
    type: String,
    required: false
  },
  saved: {
    type: Boolean,
    default: false
  },
  feature: {
    type: Boolean,
    default: false
  },
  comment: {
    type: Schema.Types.ObjectId,
    ref: "Comment"
  }
});

// This creates our model from the above schema, using mongoose's model method
var Article = mongoose.model("Articles", ArticleSchema);

// Export the Article model
module.exports = Article;
