/* 
    什么是发布订阅模式(观察者)？
    在未来某一时刻来做很多事情(事情有关联)，在到来之前全列出计划清单，
    到时间点按照清单一项一项执行
*/

/* 
    事件模型DOM0 & DOM2的区别
    1、语法上的区别
        box.onclick = function() {};
        box.addEventListener('click', function() {});
    2、底层运行机制上的区别
        DOM0就是给元素的某个属性绑定方法（有效绑定的方法只有一个）
        DOM2是基于事件池机制完成，每增加一个绑定的方法，都会往事件池中存放一个……当事件
        触发会依次执行事件池中的事情=>发布订阅其实就是模拟的事件池机制（可以给同一个元素
        的某个事件绑定多个不同的方法
    3、DOM2中可以给一些特殊的事件类型绑定方法，这些事件类型DOM0不支持绑定，例如：
        DOMContentLoaded、transitionend……
        $(document).ready()=> $(function(){})
        // dom结构一加载完就会触发
        VS
        window.onload
        // 当页面当中dom结构及所有资源都加载完才执行
        所以window.onload一定会比$(document).ready()晚触发

    DOM2S事件池机制
    1、基于addEventListener/attachEvent(IE6~8)向事件池中追加方法: 新版本浏览器会根据元素和事件
    类型对新增的方法做重复校验，但是IE6~8不可以
    2、当事件行为触发，会把事件池中的方法按照增加的顺序依次执行，但IE6~8中执行的顺序是不固定的

    
*/
// import jq from './jq';
import mine from './mine';
