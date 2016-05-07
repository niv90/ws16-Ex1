var mongoose = require('mongoose');
var schema = mongoose.Schema;
var userSchema = new schema({
ID : {type: Number, index: 1, unique: true},
firstName: String,
lastName: String,
grade: Number,
year: Number
}, {collection: 'students'});


var student = mongoose.model('student', userSchema);
module.exports = student;