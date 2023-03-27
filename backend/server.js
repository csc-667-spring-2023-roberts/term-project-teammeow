const path = require("path");
const express = require("express");
const createError = require("http-errors");
const app = express();
const PORT = process.env.PORT || 3000;

//use pug
app.set("views", path.join(__dirname, "./", "views"));
app.set("view engine", "pug");

//serving files from static
app.use(express.static(path.join(__dirname, "./", "./static" )));

const rootRoutes = require("./routes/root");
const requestTime = require("./middleware/requestTime");

//requestTime middleware
app.use(requestTime);

app.use("/", rootRoutes);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

//http-errors middleware
app.use((request, response, next) => {
    next(createError(404));
  });