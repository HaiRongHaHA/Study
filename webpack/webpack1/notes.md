> ## webpack 的安装

-   webpack webpack-cli -D(表示是开发依赖，上线的时候不打包)

> ## webpack 可以进行 0 配置

-   打包工具 -> 输出后的结果（js 模块）-> 会把代码进行打包优化产出

-   打包（支持 js 的模块化，以当前 js 为准查找相关依赖文件打包成一个文件）

```
mode - production(默认) 生产环境会压缩混淆代码删除无用代码等优化

mode - development 开发环境可能不会压缩混淆，可以看到打包后结果代码

webpack的大致流程，它主要功能就是把解析的所有的模块变成一个对象(key：文件名，value: 函数)，通过入口来加载，依次实现递归依赖关系，最终通过入口来运行所有文件
```

> ## 手动配置 webpack

-   默认配置文件的名字 webpack.config.js
-   手动指定配置文件名 npx webpack --config xxxx(配置文件名)

```
"scripts": {
    "build": "webpack", // 相当于执行npx webpack
    "build": "webpack --config (配置文件名)"
}

以下命令手动配置文件也可以执行
npm run build --(加上--后面的就会被当作字符串参数处理) --config (配置文件名)

webpack-dev-server 一个webpack插件(开发服务)，内部通过express实现

npx webpack-dev-server 运行（默认会生成一个静态目录）

postcss-loader autoprefixer(加css兼容前缀等的一个loader)
需要配置postcss.config.js文件
use时postcss-loader 要放在 css-loader 的后面

配置babel 转化es6代码
yarn add babel-loader @babel/core @babel/preset-env -D

loader配置
options.enforce
pre     前置loader
post    后置loader
normal  普通loader

```

> ## 引入全局文件

```
1、expose-loader（暴露全局的loader(内联的loader)）
import $ from "expose-loader?$!jquery";
console.log(window.$);

2、或者在webpack.config.js文件里配置,
当import jquery时匹配到这个rule,
默认将jquery以$形式挂载到window下
{
    test: require.resolve("jquery"),
    use: "expose-loader?$"
}
3、在每个模块中都注入$对象
new Webpack.ProvidePlugin({
    $: "jquery"
})
console.log($);

4、又想window.$访问又想直接$访问，可以引入cdn
如果引入了cnd又import会打包jquery，此时可以在
webpack.config.js配置
externals: { // 表明此模块是外部引入的，无需打包
    jquery: "$"
}
```

> ## 图片处理

```
1) 在js中创建图片来引入

url-loader 默认会在内部生成一张图片，到build目录下
把生成的图片的名字返回回来
yarn add url-loader -D
{
    test: /\.(png|jpg|gif)$/,
    use: "url-loader"
}
// 做一个限制，当图片小于多少k时候用base64转化
options: {
    limit: 200 * 1024
}

2) 在css引入 background('url')

css-loader会对引入文件做处理，相当于
background-image: url(require(url));

3) <img src="" alt=""/>

yarn add html-withimg-loader -D
{
    test: /\.html$/,
    use: "html-withimg-loader"
}
(编译失败，未找到原因)

```

> ## 打包文件分类

```
打包文件到指定目录下
options:{
    outputPath:'xxx/'
}

output.publicPath会在html等有路径的地方都加上指定路径
publicPath: "http://www.hairong.cn/"

若只想给图片或css单独加公共路径，可以在rules.use下配置publicPath

```
