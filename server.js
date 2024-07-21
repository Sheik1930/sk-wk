const dotenv = require("dotenv")
const mongoose = require('mongoose');
const app = require("./app.js")

dotenv.config({ path: "./.env" })

const Port = process.env.PORT || 3000
const Database = process.env.DATABASE

mongoose
    .connect(Database)
    .then(() => console.log("Successfully connected to the Database"))
    .catch((e) => console.log(`Error:${e}`))

app.listen(Port, () => {
    console.log("Successfully COnnected to the port")
})