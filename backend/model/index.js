const mongoose = require('mongoose');

mongoose.set("debug", true);
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost:27017/my-app',{
    useUnifiedTopology: true,
    useNewUrlParser: true
});

module.exports.User = require('./user');
module.exports.Message = require('./message');