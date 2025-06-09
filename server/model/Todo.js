const { default: mongoose } = require("mongoose");

const ToDo = mongoose.model(
  "ToDo",
  new mongoose.Schema({
    description: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  })
);

module.exports = ToDo;