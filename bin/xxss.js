#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const program = require('commander')
const chalk = require('chalk')
const watch = require('../lib/watch.js')

program
    .version(require('../package').version)
    .usage('<path>')


console.log(program.opts(), 'program.opts()')
program
    .arguments('<path>')
    .option('-o, --original <oFileType>', '指定原始文件类型  less|scss', 'less')
    .option('-t, --target <tFileType>', '指定目标文件类型 ttss|wxss...', 'ttss')
    .action((dir, options, command) => {
        console.log(options.target, options.original, 'options.target')
        let originalType = options.original;
        let targetType = options.target;
        fs.stat(dir, (err, stats) => {
            if (err) console.log(chalk.yellow(err))
            else {
                console.log(chalk.bgYellow.red(` 🚀监听启动.`))
                console.log(chalk.bgYellow.red(` 📃原始文件类型：${originalType}`));
                console.log(chalk.bgYellow.red(` 📃目标文件类型：${targetType}`));
                watch(dir, originalType, targetType)
            }
        })
    })

program
    .on('--help', () => {
        console.log()
        console.log()
    })

program.parse(process.argv)
