const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss =  require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');

const AppError = require('./app/Exceptions/appError');
const globalErrorHandler = require('./app/Exceptions/Handler');


// System Routers
const router = require('./routes/Boostrap');

const app = express();
// 1) GLOBAL MIDDLEWARES

// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

//For http security headers
app.use(helmet()); //We need to run the helmet() function, not just point to it

//Development login
if (process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

app.use(cors({
    credentials: true,
    origin: process.env.LOCAL_URL
}))


// Rate limit to limit request from a single IP ADDRESS
const limiter = rateLimit({
    max: 1000, // 100 req
    windowMs: 60 * 60 * 1000, //request per/hr
    message: 'Too many request from this IP, Please try again in an hour'
});
app.use('/api', limiter); //Affects routes starting with /api


app.use(bodyParser.json({extended: true}))
// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());


//MOUNTING ROUTERS
app.use('/api/v1/users', router.userRouter);
app.use('/api/v1/users', router.authRouter);
app.use('/api/v1/permissions', router.permissionRouter);
app.use('/api/v1/roles', router.roleRouter);
app.use('/api/v1/system', router.systemRouter);
app.use('/api/v1/businesses', router.businessRouter);
app.use('/api/v1/buyers', router.buyerRouter);
app.use('/api/v1/products', router.productRouter);
app.use('/api/v1/orders', router.orderRouter);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'views/client/build')));

    app.get('/admin/*', function (req, res) {
        res.sendfile(path.join(__dirname, 'views/client/build', 'index.html'))
    });
}


//This should always be at the end of al the route handler middleware.
app.all('*', (req, res, next) => { //For routes not found on the server
    //Parameters in middleware make express see it as an error
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

//Global error handling middleware
app.use(globalErrorHandler);

//EXPORT APP TO SERVER
module.exports = app;
