const mongoose = require("mongoose");
// connection to mongoDB
const connection = () => {
    return mongoose.connect(process.env.CONNECTION_DB_ONLINE).then(() => console.log("connected...")).catch((error) => console.log("Error", error))
}

module.exports = connection