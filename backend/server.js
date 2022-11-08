const express = require("express");
const res = require("express/lib/response");
const { errorHandler } = require("./middlewares/errorMiddleware");
const dotenv = require("dotenv").config();

const PORT = process.env.PORT || 5001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/articles", require("./routes/articleRoutes"));

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server started on PORT: ${PORT}`);
});
