require("@babel/register");
var fs = require('fs');
var express = require("express");
var sass = require('node-sass');
var AppRoot = require("./src/APP").AppContent;


var app = new express();
var stylesheets;

//-----自定义模板引擎privateView
app.engine('pv', function (filePath, options, callback) { // define the template engine
    fs.readFile(filePath, function (err, content) {
        if (err) return callback(err)
        let rendered = content.toString()
            .replace('${stylesheets}', options.stylesheets)
            .replace('${app}', options.app);
        return callback(null, rendered)
    })
})
app.set('views', './template'); // 声明视图的目录
app.set('view engine', 'pv'); // 设置express视图引擎
//-----


//路由-----
app.get('/',
    function (req, res, next) {
        sass.render({
            file: "./src/scss/App.scss",
        }, function (err, result) {
            stylesheets = result.css.toString();
            next();
        });

    },
    function (req, res) {
        res.render('index', {title: 'react-ssr', app: AppRoot,stylesheets:stylesheets})
    }
);

app.get('/example', function (req, res, next) {
    console.log('the response will be sent by the next function ...');
    next();
}, function (req, res) {
    res.send('Hello from B!')
});
//-----

app.listen(3000, function () {
    console.log("success");
});
