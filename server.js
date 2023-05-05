const express = require('express');
const connectToDB = require('./config/db');
// const { errorHandler } = require('./middleware/errorMiddleware');
require('dotenv').config();
require('colors');
const path = require('path');
const cors = require('cors');

const PORT = process.env.PORT || 5000;
const app = express();

// Connected to Database
connectToDB();

//middlewares......
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: '*', methods: '*' }));

//Routes.....
app.use('/users', require('./routes/UserRoute'));

// Serve frontend
if (process.env.NODE_ENV === 'production') {

    //*Set static folder up in production
    app.use(express.static('client/build'));

    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));

} else {
    app.get("/", (req, res) => {
        res.send("Welcome to weather app...");
    });
}

//Listening express app........
app.listen(PORT, () => {
    console.log(`express app listening at port ${PORT}`);
});