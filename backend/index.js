require('dotenv').config();
const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const errorHandler = require('./handler/error');
const authRoutes = require('./routes/auth');
const messageRoutes = require('./routes/message');


app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/message', messageRoutes);

app.use('/api/user', messageRoutes);

app.use(function(req, res, next){
    let err = new Error("Not Found");
    err.status = 404;
    next(err)
})

app.use(errorHandler);

app.listen(3001);