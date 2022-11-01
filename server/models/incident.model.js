const mongoose = require("mongoose");

const IncidentSchema = new mongoose.Schema(
  {
    cinema: {
      id: { type: String, required: true },
      name: { type: String, required: true },
    },
    screen: {
      id: { type: String, required: true },
      name: { type: Number, required: true },
    },
    warning: {
      errorCode: { type: Number },
      errorDescription: { type: String },
      status: {
        type: String,
        enum: ["open", "progress", "closed"],
        default: "open",
      },
    },
    assignee: {
      id: {type: String, required: false},
      name: {type: String, required: false},
    }
  },
  { timestamps: true }
);

IncidentSchema.methods.find = function find() {
  
}

module.exports = mongoose.model("Incident", IncidentSchema);
