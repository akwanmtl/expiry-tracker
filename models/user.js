const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { 
    type: String,
    unique: true,
    required: true
  },
  password: { 
    type: String,
    required: true
  },
  foods: [
    {
      type: Schema.Types.ObjectId,
      ref: "Food"
    }
  ], 
  expired: {
    type: Number,
    required: true,
    default: 0
  },
  finished: {
    type: Number,
    required: true,
    default: 0
  },
});

userSchema.pre("save", function (next) {
  const user = this

  if(this.isModified("password") || this.isNew){
    bcrypt.genSalt(10, function (saltError, salt) {
      if (saltError) {
        return next(saltError)
      } else {
        bcrypt.hash(user.password, salt, function(hashError, hash) {
          if (hashError) {
            return next(hashError)
          }

          user.password = hash
          next()
        })
      }
    })
  } else {
    return next()
  }
})

const User = mongoose.model("User", userSchema);
module.exports = User;