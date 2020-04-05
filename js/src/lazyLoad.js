/* 
    图片懒加载前端性能优化的重要方案
    图片懒加载可以加快页面渲染的速度，让首次打开页面的速度更快
    只有滑动到某个区域，我们才加载真实图片，这样可以节省加载的流量

    1、把所有需要延迟加载的图片用一个盒子包起来，设置宽高和默认占位图
    2、开始让所有的img的src为空，把真实图片的地址放到img的自定义属性上，
    让img隐藏等到所有其他资源都加载完成后，我们再开始加载图片
    3、对于很多图片，需要当页面滚动的时候，当前图片区域完全显示出来后再加载
    真实图片
*/

/* 
    A图片底部距离页面顶部的偏移
    = 图片区域的高度 + 图片区域距离body的上偏移

    B浏览器底部距离页面顶部的偏移
    = 浏览器可视区域的高度（一屏高度） + 滚动条卷去的高度
    
    A<=B 图片区域完全出现在视野中，此时加载真实的图片即可
*/

let $imgBox = $('.imgBox');
$img = $imgBox.children('img');
$window = $(window);

//=> jq中的事件绑定支持多事件绑定： window.onload & window.onsroll
// 两个事件触发的时候执行相同的事情
$window.on('load scroll', function() {
    let $B = $window.outerHeight() + $window.scrollTop();
    $imgBox.each((index, item) => {
        let $item = $(item),
            isLoad = $item.attr('isLoad'),
            $A = $item.outerHeight() + $item.offset().top;
        if ($A <= $B && isLoad !== 'true') {
            $item.attr('isLoad', true);
            let $img = $item.children('img');
            $img.attr('src', $img.attr('data-img'));
            $img.on('load', function() {
                $img.stop().fadeIn();
            });
        }
    });
});
