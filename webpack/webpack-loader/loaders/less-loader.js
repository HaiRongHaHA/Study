const less = require("less");
function loader(source) {
    let css;
    less.render(source, (err, r) => {
        // r.css 就less解析后的css
        css = r.css;
    });
    return css;
}
module.exports = loader;
