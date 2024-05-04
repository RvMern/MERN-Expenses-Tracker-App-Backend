const mongoose = require("mongoose");

const dbConnect = () => {
        mongoose.connect(process.env.MONGODB_URL)
        .then( data => console.log(`Database has been connected successfully on ${data.connection.host}:${data.connection.port}` ))
        .catch( err => console.log(err.message) )
};


module.exports = dbConnect()