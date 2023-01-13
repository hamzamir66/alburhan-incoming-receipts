const express = require('express');
const app = express();
const cors = require("cors");


app.use(cors({
    origin: "http://localhost:5173"
}));

const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
// const dotenv = require('dotenv');
const path = require('path')

const errorMiddleware = require('./middlewares/errors')

// Setting up config file 
if (process.env.NODE_ENV !== 'PRODUCTION') require('dotenv').config({ path: 'backend/config/config.env' })
// dotenv.config({ path: 'backend/config/config.env' })

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())


// Import all routes
const main = require('./routes/main');
const auth = require('./routes/auth');
const receipt = require('./routes/receipt');

app.use('/api/v1', main)
app.use('/api/v1', auth)
app.use('/api/v1', receipt)


// if (process.env.NODE_ENV === 'PRODUCTION') {
//     app.use(express.static(path.join(__dirname, '../frontend/build')))

//     app.get('*', (req, res) => {
//         res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'))
//     })
// }


// Middleware to handle errors
app.use(errorMiddleware);

module.exports = app