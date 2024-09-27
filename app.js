require("dotenv").config()
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");

const { connect } = require("./Database.js");
const Auth = require("./routes/Auth");
const Product = require("./routes/Product");

connect() // connecting database

const PORT = process.env.PORT || 3000;
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan("common"))
app.use(bodyParser.json());
app.use(express.static('public'));


app.use('/api/auth', Auth); // Authentication routes
app.use('/api/product',Product) // Product routes

app.listen(PORT, () => {
  console.log(`Server is listening at ${PORT}`);
});
