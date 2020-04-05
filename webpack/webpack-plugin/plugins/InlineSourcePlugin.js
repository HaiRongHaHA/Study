const HtmlWebpackPlugin = require("html-webpack-plugin");
// 把外链标签变成内联标签
class InlineSourcePlugin {
    constructor({ match }) {
        this.reg = match; // 正则
    }
    // 处理引入标签的数据
    processTags(data, compliation) {
        let headTags = [],
            bodyTags = [];
        data.headTags.map(headTag => {
            headTags.push(this.processTag(headTag, compliation));
        });
        data.bodyTags.map(bodyTag => {
            bodyTags.push(this.processTag(bodyTag, compliation));
        });
        return { ...data, headTags, bodyTags };
    }
    // 处理单个标签的数据
    processTag(tag, compliation) {
        let newTag, url;
        if (tag.tagName === "link" && this.reg.test(tag.attributes.href)) {
            newTag = {
                tagName: "style"
            };
            url = tag.attributes.href;
        }
        if (tag.tagName === "script" && this.reg.test(tag.attributes.src)) {
            newTag = {
                tagName: "script"
            };
            url = tag.attributes.src;
        }
        if (url) {
            // 文件的内容放到innerHTML属性上
            newTag.innerHTML = compliation.assets[url].source();
            delete compliation.assets[url]; // 删除掉原有应该生成的资源
            return newTag;
        }
        return tag;
    }
    apply(compiler) {
        // 通过HtmlWebpackPlugin来实现这个功能
        compiler.hooks.compilation.tap("InlineSourcePlugin", compliation => {
            HtmlWebpackPlugin.getHooks(
                compliation
            ).alterAssetTagGroups.tapAsync("alterPlugin", (data, cb) => {
                data = this.processTags(data, compliation);
                cb(null, data);
            });
        });
    }
}

module.exports = InlineSourcePlugin;
