const express = require("express")
const user_router = require("./route/user_router")

const app = express()
app.use(express.json())
// 3) ROUTES
app.use('/api/v1/users', user_router);
module.exports = app