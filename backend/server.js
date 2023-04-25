require("dotenv").config();
const path = require("path");
const morgan = require("morgan");
const express = require("express");
const session = require("express-session");
const createError = require("http-errors");
const pgSession = require("connect-pg-simple")(session);
const initSockets = require("./sockets/initialize.js");
const cookieParser = require("cookie-parser");
const db = require("./db/connection.js");
const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const sessionMiddleware = session({
  store: new pgSession({ pgPromise: db }),
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 },
});

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

//use pug
app.set("views", path.join(__dirname, "./", "views"));
app.set("view engine", "ejs");

//serving files from static
app.use(express.static(path.join(__dirname, "./", "./static")));

const rootRoutes = require("./routes/root");
const testRoutes = require("./routes/test/index.js");
const userRoutes = require("./routes/auth/index.js");
const lobbyRoutes = require("./routes/lobby/index.js");
const chatRoutes = require("./routes/chat.js");

const requestTime = require("./middleware/requestTime");
const isAuthenticated = require("./middleware/isAuthenticated");

//requestTime middleware
app.use(requestTime);
//session middleware
app.use(sessionMiddleware);
const server = initSockets(app, sessionMiddleware);

app.use("/", rootRoutes);
app.use("/test", testRoutes);
app.use("/auth", userRoutes);
app.use(isAuthenticated);
app.use("/lobby", lobbyRoutes);
app.use("/chat", chatRoutes);

// http-errors middleware
app.use((request, response, next) => {
  next(createError(404));
});

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
