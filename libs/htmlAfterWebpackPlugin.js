function HtmlAfterWebapckPlugin(options) {
    this.options = options;
}
// process.env.NODE_ENV
function arraytoStringByAassets(arrs, isJs) {
    let icon = isJs? 'js': 'css';
    arrs = arrs.map(item=>{
        if (isJs) {
            return `<script src="${item}"></script>`;
        }
        return `<link rel="stylesheet" href="${item}">`;
    });
    return '\n' + arrs.join('') + '\n';
}

HtmlAfterWebapckPlugin.prototype.apply = function(compiler) {
    compiler.plugin('compilation', function (compilation) {
        compilation.plugin('html-webpack-plugin-after-html-processing', function (htmlPluginData, callback) {
            let isBase = htmlPluginData.outputName.includes('/layout.html');
            let assets = htmlPluginData.assets;
            let html = htmlPluginData.html;
            console.log(assets)
            if (isBase) {
                html = html.replace('{% block style %}', `${arraytoStringByAassets(assets.css, false)}{% block style %}`);
                html = html.replace('{% block script %}', ` ${arraytoStringByAassets(assets.js, true)}{% block script %}`);
            } else {
                html = html.replace('{% block style %}', `{% block style %} ${arraytoStringByAassets(assets.css, false)}`);
                html = html.replace('{% block script %}', `{% block script %} ${arraytoStringByAassets(assets.js, true)}`);
                console.log(html)
            }
            htmlPluginData.html = html;
            callback(null, htmlPluginData);
        });
    });
};

module.exports = HtmlAfterWebapckPlugin;