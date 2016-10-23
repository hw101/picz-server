var mongoose = require('mongoose');
var passportLocal = require('passport-local-mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var User = new Schema({
  email: {
    type: String,
    lowercase: true,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true
  },
  deviceId: String,
  deviceType: String,
  online: {
    type: Boolean,
    default: true
  },
  resetPasswordToken: {
    type: String
  },
  resetPasswordExpires: {
    type: Date
  },
  disabled: {
    isDisabled: {
      type: Boolean,
      default: false
    },
    disabledBy: {
      type: ObjectId,
      ref: 'User'
    },
    disabledReason: {
      type: String
    }
  },
})

User.plugin(passportLocal, {
  usernameField: 'username'
});

User.methods.toJSON = function() {
  var obj = this.toObject()
  delete obj.salt
  delete obj.hash
  return obj
}

User.plugin(deepPopulate, {});
module.exports = mongoose.model('User', User);
