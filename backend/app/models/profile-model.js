const { Schema, model } = require("mongoose");

const locationSchema = new Schema({
  type: {
    type: String,
    required: true,
    enum: ['Point']
  },
  coordinates: {
    type: [Number], // Geospatial data
    required: true
  }
});

const addressSchema = new Schema({
  address: {
    type: String,
    required: true
  },
  location: locationSchema
});

const profileSchema = new Schema({
  profilePic: {
    type: String
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  addresses: {
    type: [addressSchema],
    validate: [arrayLimit, '{PATH} exceeds the limit of 3']
  },
  orders: [{
    type: Schema.Types.ObjectId,
    ref: "Order"
  }],
  gender: {
    type: String,
    enum: ["Male", "Female", "Others"],
  }
}, { timestamps: true });

function arrayLimit(val) {
  return val.length <= 3;
}

const Profile = model("Profile", profileSchema);

module.exports = Profile;
