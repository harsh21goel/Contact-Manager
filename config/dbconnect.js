let mongoose = require('mongoose');
mongoose.connect(process.env.CONNENCTION_STRING)
.then(() => {
    console.log("Database is connected.");
})
.catch((err) => {
    console.log(err);
})

module.exports = mongoose;