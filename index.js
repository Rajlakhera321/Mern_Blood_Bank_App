const express = require("express");
const color = require('colors');
const morgan = require("morgan");
const cors = require('cors');

const app = express();
const dotenv = require('dotenv');
const connectDB = require("./config/db");
dotenv.config();

connectDB();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use('/api/v1/auth',require("./routers/auth"));
app.use('/api/v1/inventory',require("./routers/inventory"));
app.use('/api/v1/analytics',require("./routers/analytics"));

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Node server is running on port ${port}`.america.white));