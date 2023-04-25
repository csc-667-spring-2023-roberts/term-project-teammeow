require("dotenv").config();
const path = require("path");
const morgan = require("morgan");
const express = require("express");
const createError = require("http-errors");
const initSockets = require("./sockets/initialize");
const cookieParser = require("cookie-parser");
const app = express();

const { session, requestTime } = require("./middleware");

app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

if (process.env.NODE_ENV === "development") {
  const livereload = require("livereload");
  const connectLiveReload = require("connect-livereload");

  const liveReloadServer = livereload.createServer();
  liveReloadServer.watch(path.join(__dirname, "./", "static"));
  liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
      liveReloadServer.refresh("/");
    }, 100);
  });

  app.use(connectLiveReload());
}

const PORT = process.env.PORT || 3000;

// views
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./", "views"));

// serving files from static
app.use(express.static(path.join(__dirname, "./", "./static")));

// requestTime middleware
app.use(requestTime);

// session middleware
app.use(session);

// routes
app.use("/", require("./routes"));

// http-errors middleware
app.use((request, response, next) => {
  next(createError(404));
});

const server = initSockets(app, session);
server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
