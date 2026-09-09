# 存储
- mysql 关系数据库
- 浏览器缓存  打开之前打开过的页面
- 本地存储 文件 json 
- 云盘
- redis 缓存
 第一次走mysql 读取文章列表 ， 每次没有必要实时去mysql查找。mysql 性能有瓶颈 ， 吧结果放到redis里，以后走redis
 - llm 大型的embedding存储
 

 # 前端八股

 加入required 是浏览器默认表单不能为空

 form 是浏览器的默认提交 但是现在普遍用的都是fetch/ajax 由js提交
 如果想阻止浏览器默认跳转 可以添加一个事件执行函数 函数参数有事件e  e.preventDefault()

 ## this 指向函数的调用者
 函数运行时指定  (不是声明的时候)
 - 普通函数被调用 this 指向全局window
 var 声明的变量 被挂载在window上  污染了window对象  如果不想污染 可以用严格模式 'use strict'
 let/const 不会污染


 - 作为对象的方法调用
 this 指向调用对象
 如果是把对象的方法的地址赋值给变量  那么this指向window

 - 作为构造函数调用
 this 指向实例对象
p1 = new p('参数')
p2 = new p('参数')
function p(name){
    this.name = name
    这里的this指向的是p这个对象
}

- 作为事件处理函数
this 指向被绑定事件 的元素

document.querySelector('.lnk').addEventListener('click' , goBaidu);

function goBaidu(e){

    //this 指向lnk类的元素
    console.log(this);
    
    e.preventDefault();
}

- 手动指定this 指向
apply / call / bind
apply 是临时改变this的指向 
call 是临时改变this的指向 函数.call(指定this的值 ， 参数一 ， 参数二) 参数一和参数二会传给函数里面的参数
apply是临时改变this的指向 函数.apply(指定this的值 ， 【参数一 ， 参数二】)参数一和参数二会传给函数里面的参数
函数.bind（） 永久改变this的值  不会立即执行函数 而是返回一个新的函数需要变量接受


箭头函数 没有this指向 里面的this指向外部的this
定时器普通回调独立执行，this 指向 window；
    var name = '梅西'

    let obj = {
        name : '姆巴佩',
        say: function(){
            setTimeout(function(){
                console.log(this.name);
                
            } , 1000)
            
        }
    }
    obj.say();
打印梅西

