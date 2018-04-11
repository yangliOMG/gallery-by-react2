### 初始配置
##### 全局
npm install -g yo	//yeoman 将最佳的工具整合安装

yo -v

npm install -g generator-react-webpack

npm ls -g --depth=1 2>/dev/null | grep generator-	//查看rw的版本
> npm ls -g	列出所有npm包

> 1  	列出一级树状结构

> 2>/dev/null	过滤错误消息

> | 	上一个命令的输出作为下一个命令的输入

> grep xxxx 搜索关键字

##### 项目
在github中新建项目，选择mit listens

git clone http://	下载

yo react-webpack xxx  利用yo生成rw框架  === cd xxx  ,yo react-webpack 


### npm命令
* __npm start / npm run serve //启动项目__
* npm run dist 	//打包到dist目录下，（package.json->scripts中，包含npm run xxxx 命令）
* npm run serve:dist	//运行dist目录下的代码

### 额外配置
chrome.google.com/webstore   -> react developer tools	谷歌商店react插件 f12


* npm install autoprefixer-loader --save-dev	//为css规则添加厂商前缀
* npm install sass-loader --save-dev
* npm install node-sass --save-dev
* npm install json-loader --save-dev

##### 在cfg/default.js下

添加 !autoprefixer-loader?{browsers:["last 2 version"]}到scss，css下

添加{
        test: /\.json$/,
        loader: 'json-loader'
      }

添加{
        test: /\.(png|jpg|gif|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=8192'
      }
//让项目打包eot，ttf等字体文件。limit指文件转译为base64格式的大小限制为8k以下。

module.exports = {
  。。。
  publicPath: '/assets/',	
  。。。
};
//改为'assets/'可以让gh-page的静态页面找到正确的img路径？？


### 提交操作
* git status	//查看状态

* git add -A	//提交到master
* git commit -m "xxx"  说明
* git push 提交

* git add dist	//把dist目录作为分支gh-pages，再提交
* git commit -m ""
* git subtree push --prefix=dist origin gh-pages	//把dist中的内容放到gh-pages分支中

## 总结
* gulp从基础框架开始搭建，webpack已经将基础框架搭建好。
* .editorconfig  	编译器配置









