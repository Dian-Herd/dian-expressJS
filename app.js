const express = require('express');
const app = express();
const productRouter = require('./app/product/routes');
const logger = require('morgan');

app.use(logger('dev'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/api/v1', productRouter);
app.use((req, res, next) => {
    res.status(404);
    res.send({
        status: 'failed',
        message: 'page ' + req.originalUrl + ' Not Found'
    })
})

app.listen(process.env.PORT || 5000);