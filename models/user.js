var mongoose        = require('mongoose');
mongoose.Promise    = require('q').Promise;
var validator       = require('../components/validator')
var Schema          = mongoose.Schema;
var UserSchema      = new Schema({
    email:      {
        type:       String,
        validate:   [validator.email, 'Invalid email adress!']
    },
    password:   { type: String },
    role:       { type: Number, default: 0 },
    firstName:  { type: String },
    lastName:   { type: String },
    created:    { type: Date, default: Date.now },
    updated:    { type: Date, default: Date.now }
});

UserSchema.virtual('fullname').get(function() {
    return this.firstName + ' ' + this.lastName;
});

module.exports = mongoose.model('User', UserSchema);
