const fs = require('fs')
const path = require('path')
const chokidar = require('chokidar')
const chalk = require('chalk')
const less = require('less')
const sass = require('node-sass')

function convertExt(fpath, tType) {
    return fpath.replace(/(.css|.less|.scss)$/, `.${tType}`)
}

/**
 *
 * @param fpath
 * @param oType 原始文件类型
 * @param tType 目标文件类型
 */
function writeFile(fpath, oType, tType) {
    let content = fs.readFileSync(fpath, 'utf-8');
    if (oType === 'scss') {
        sass.render({
            file: path.resolve(fpath),
            outputStyle: 'expanded'
        }, (error, res)=>{
            if (error) {
                console.log(chalk.bgRed.white(error))
            }else {
                fs.writeFileSync(convertExt(fpath, tType), res.css)
            }
        })
    }else {
        less.render(content, {
            filename: path.resolve(fpath)
        }).then(({css}) => {
            fs.writeFileSync(convertExt(fpath, tType), css)
        }).catch(error => {
            console.log()
            console.log(chalk.bgRed.white(error))
        })
    }
}

function log(msg, color) {
    console.log(chalk[color](msg))
}

/**
 *
 * @param dpath  文件路径
 * @param oType  需要转换的文件格式 scss|less
 * @param tType  转换后的类型 wxss、ttss 等等 所有...
 * @param watchNew 是否只监听新的变化
 */
module.exports = (dpath, oType, tType, watchNew = false) => {
    let len = dpath.length - 1
    if (dpath[len] === '\\') dpath = dpath.substring(0, len);
    const watch = chokidar.watch([`${dpath}/**/*.${oType}`], {
      ignored:[`${dpath}/node_modules`],
      persistent: true,
      ignoreInitial: watchNew,
    })
    watch
        .on('add', fpath => {
            writeFile(fpath, oType, tType)
            log(` ✅ 监听添加 ${fpath}`, 'green')
        })
        .on('change', fpath => {
            writeFile(fpath, oType, tType)
            log(` ✅ 监听修改 ${fpath}`, 'blue')
        })
        .on('unlink', fpath => {
            fs.unlinkSync(convertExt(fpath, tType))
            log(` ✅ 监听到删除 ${fpath}`, 'red')
        })
}
