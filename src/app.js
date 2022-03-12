if (process.env.USER) require("dotenv").config();
const express = require("express");
const errorHandler = require("./errors/errorHandler");
const notFound = require("./errors/notFound");
const theaterRouter = require("./theaters/theaters.router");
const reviewRouter = require("./reviews/reviews.router");
const moviesRouter = require("./movies/movies.router");
const cors = require("cors");

const app = express();

app.use(cors())
app.use(express.json());

app.use("/theaters", theaterRouter);
app.use("/reviews", reviewRouter);
app.use('/movies', moviesRouter);
app.use(notFound);
app.use(errorHandler);

module.exports = app;
