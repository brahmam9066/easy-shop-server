const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require("cors");
require('dotenv/config');
const errorHandler = require('./helpers/error-handler');
const authJwt = require('./helpers/jwt')

app.use(cors());
app.options("*", cors());

// Middleware
app.use(express.json());
app.use(morgan('tiny'));
app.use(authJwt());
app.use("/public/uploads", express.static(__dirname + "/public/uploads"));
app.use(errorHandler);

// Routes
const categoriesRoutes = require("./routes/categories");
const productsRoutes = require('./routes/products')
const usersRoutes = require("./routes/users");
const ordersRoutes = require("./routes/orders");


const api = process.env.API_URL;

app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/products`, productsRoutes)
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes);

// Database
mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'eshop-database'
})
    .then(() => {
        console.log("DB ready")
    })
    .catch(() => {
        console.log("error")
    })

//Development
// app.listen(3000, () => {
//     console.log("server is up")
// })

// Production

var server = app.listen(process.env.PORT || 3000, function () {
    var port = server.address().port;
    console.log('Express is working on port' + port)
})