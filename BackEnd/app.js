require("dotenv").config() ;
const express = require('express');
const session = require('express-session');
const PrismaSessionStore = require('@quixo3/prisma-session-store').PrismaSessionStore;
const prisma = require('./DB/db.config');
const passport = require('./passport.config');
const cors = require('cors')

const logInRouter = require("./Route/log-in") ;
const signUpRouter = require("./Route/sign-up") ;
const viewAllRouter = require("./Route/ViewAll") ;
const createPostRouter = require("./Route/createPost") ;
const createCommentRouter = require("./Route/createComment") ;
const viewYoursRouter = require("./Route/viewYours") ;
const publishPostRouter = require("./Route/publishPost") ;

const app = express();

app.use(cors()) ;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: 'rana',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 86400000 },
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000,
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/login", logInRouter) ;
app.use("/api/signup", signUpRouter) ;

app.use("/api/viewAll", viewAllRouter) ;
app.use("/api/viewAll", createCommentRouter) ;
app.use("/api/createPost", createPostRouter) ;
app.use("/api/viewYours", viewYoursRouter) ;
app.use("/api/viewYours", publishPostRouter) ;

// Start Server
app.listen(8000, () => console.log('Server running on http://localhost:8000'));
