const path = require('path');
const appDirectory = path.resolve();
const fs = require('fs');
const chalk = require('chalk');
const webpack = require('webpack');

var config = require('./webpack.config.js');
var env = process.env.NODE_ENV;

function handleStatsMessage(err,stats) {
    if (err || stats.hasErrors()) {
        console.log(chalk.red('编译失败'), chalk.red(JSON.stringify(err)));
        console.log(chalk.red('编译失败'), chalk.red(JSON.stringify(stats.toJson().errors)));
        process.exit('编译失败');
    }
    let ob = stats.toJson({
        depth: true
    });
    console.log(chalk.white(`输出目录：${ob.outputPath}，编译耗时：${ob.time}ms,构建时间戳：${ob.builtAt}`));
    console.log(chalk.white("编译文件列表："));
    ob.assets.forEach((asset) => {
       console.log(chalk.green(path.resolve("../",asset.name)));
    });
    console.log(chalk.white(`编译完成${env === 'dev' ? '，监听中...':''}`));
}

//webpack构建
function build(entry) {
    console.log(chalk.white('编译中...'));
    let compiler = webpack(Object.assign(config, entry));
    if (env === 'dev')
        compiler.watch(config.watchOptions, (err, stats) => {
            handleStatsMessage(err,stats);

        });
    else
        compiler.run((err, stats) => {
            handleStatsMessage(err,stats);
        });
}

//构建entry
function init(){
    build();
}

init();