const express = require("express");
const connectDb = require("./config/dbConnection");
const bodyParser = require("body-parser");
const cors = require('cors');
const dotenv = require("dotenv").config();

connectDb();
const app = express();
const port = process.env.PORT || 5001;
app.use(bodyParser.json())
app.use(cors())
// app.use(express.json());

app.use('/', require("./route/contactRoute"))

app.listen(port, () => {
    console.log(`server is runnig ${port}`);
})
