const mongoose = require('mongoose');
function connectDb  (connctionString){
    return mongoose.connect(connctionString);

}

module.exports = connectDb;