# 将less编译成各种小程序ss


~~现在只有ttss~~

现已支持less|scss转各家小程序

## 安装

```console
$ npm install -g xxss-cli
```
## 使用

> minicodepath 小程序开发根目录

```
$ xxss ./minicodepath -o <原始文件类型> -t <目标文件类型> -n <携带参数表示只监听新的改动>


$ xxss ./miniApp -o scss -t wxss 


默认是less 转 ttss

原始文件类型： scss|less
目标文件类型： 随便写
```

## License

MIT
