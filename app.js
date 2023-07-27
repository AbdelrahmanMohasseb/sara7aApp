const express = require('express')
const app = express()
require("dotenv").config();
app.use(express.json());
const port = process.env.PORT || 3000;
const { userRouter, messageRouter } = require('./routes/allRoutes')
app.use(userRouter, messageRouter)
const connection = require("./DB/connection");
connection();

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))