const express = require("express");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const cors = require("cors");

const connectToMongoDb = require("./utilities/connect.js");

//Importing routes
const userRoute = require("./routes/user.route.js");
const companyRoute = require("./routes/company.route.js");
const jobRoute = require("./routes/job.route.js");
const applicationRoute = require("./routes/application.route.js");

dotenv.config();

const app = express();
// Middleware to parse JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

connectToMongoDb("mongodb://localhost:27017/Jobportal")
  .then(() => console.log("MongoDb connected"))
  .catch((err) => console.log("MongoDb Connection error"));

app.use(cors(corsOptions));

//collection of APIS here
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

app.get("/", (req, res) => {
  res.send("Hello World");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on : port: ${PORT}`);
});
