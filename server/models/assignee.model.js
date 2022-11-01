const mongoose = require("mongoose");

const AssigneeSchema = new mongoose.Schema(
  {
      id: {type: String, required: false},
      name: {type: String, required: false},
  },
  { timestamps: true }
);

module.exports = mongoose.model("Assignee", AssigneeSchema);
