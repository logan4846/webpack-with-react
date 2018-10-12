import fs from 'fs';
import path from 'path';
import express from"express";
import sass from 'node-sass';
import AppRoot from "./src/server/APP";
import React from "react";
import ReactDOMServer from "react-dom/server";
import webpack from "webpack";

var app = new express();
var stylesheets;
var jsLibrary = "console.log('has ready');";

//处理js
app.use(function(req,res,next){
    let compiler = webpack({
        mode: 'production',
        entry:[path.resolve("src/index.client.js")],
        output: {
            path: path.resolve("static"),
            filename: 'js/client.js'
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: path.resolve("node_modules"),
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ["@babel/preset-react", "@babel/preset-env"]
                        }
                    }
                }
            ]
        }
    });
    compiler.run((err, stats) => {
        next();
    });
});

app.use(express.static('static'));

//-----自定义模板引擎privateTemplate
app.engine('pt', function (filePath, options, callback) { // define the template engine
    fs.readFile(filePath, function (err, content) {
        if (err) return callback(err);
        let rendered = content.toString()
            .replace('${jsLibrary}', options.jsLibrary)
            .replace('${stylesheets}', options.stylesheets)
            .replace('${app}', options.app);
        return callback(null, rendered)
    })
});
app.set('views', './template'); // 声明视图的目录
app.set('view engine', 'pt'); // 设置express视图引擎
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
        const context = {};
        const AppRootContent = ReactDOMServer.renderToString(
            <div id="root">
                <AppRoot location={req.url} context={context}/>
            </div>
        );
        res.render('index', {title: 'react-ssr', app: AppRootContent,stylesheets:stylesheets,jsLibrary:jsLibrary})
    }
);
//-----

app.listen(3000, function () {
    console.log("success");
});
