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
  },
  { timestamps: true }
);

module.exports = mongoose.model("Incident", IncidentSchema);
