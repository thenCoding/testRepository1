/**
 * Created by zen on 2016/2/15.
 */
var express = require('./server/node_modules/express'),
    app = express();
var partials = require('./server/node_modules/express-partials');
var bodyParser = require('./server/node_modules/body-parser');
var Router = require('./server/router/router');
var logger = require('./server/node_modules/morgan');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views',__dirname+'/client/mobile/view'); //设置视图目录
app.set('view engine','html');  //启动视图引擎
app.use(express.static(__dirname + "/client"));
app.use(Router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
});


module.exports = app;

