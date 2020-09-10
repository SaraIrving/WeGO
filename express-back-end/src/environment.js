const path = require("path");

// Read .end file for environment vars
const ENV = "development";
// const ENV = process.env.NODE_ENV || "development";
const PATH = path.resolve(__dirname, "../.env." + ENV);

require("dotenv").config({ path: PATH });

module.exports = ENV;