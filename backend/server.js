const express = require("express");
const { errorHandler } = require("./middlewares/errorMiddleware");

const colors = require("colors");

const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 5001;

const connectDb = require("./config/db");
connectDb();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/articles", require("./routes/articleRoutes"));
app.use("/profile", require("./routes/profileRoutes"));
app.use("/auth", require("./routes/authRoutes"));
app.use("/following", require("./routes/followingRoutes"));

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server started on PORT: ${PORT}`);
});
