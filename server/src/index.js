// main server file

require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");
const morgan = require("morgan");
const helmet = require("helmet");
const clc = require("cli-color");
const compression = require("compression");
const mongoose = require("mongoose");
const express = require("express");
const app = express();

const authRoutes = require('./routes/auth.routes');
const adminRoutes = require("./routes/admin/auth");

// logger
app.use(morgan("dev"));

// compressing api response
app.use(compression());

// security config
app.use(helmet());

// cors enable
app.options("*", cors());
app.use(cors({ origin: "http://localhost:5000" }));

// body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// database connection
mongoose.connect(
  process.env.MONGO_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }
  )
  .then(() => {
    console.log(clc.green("database connected"));
  });

// all the api routes
app.use('/api', authRoutes);
app.use("/api", adminRoutes);

// port initialized
const PORT = process.env.PORT || 5000;

// server setup
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(clc.green(`Server started on port ${PORT}`));
});
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});