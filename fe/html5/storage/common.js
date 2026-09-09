
// 启用严模式
const oForm = document.querySelector('.add-items');
oForm.addEventListener('submit' , addItem);

function addItem(e){
    console.log(e);
      //阻止页面默认提交行为
    e.preventDefault();
    console.log('hhhhh');
    
    console.log(this);
    
  
}

document.querySelector('.lnk').addEventListener('click' , goBaidu);

function goBaidu(e){

    //this 是函数运行时会有的一个对象
    console.log(this);
    
    e.preventDefault();
}

let obj = {
    name : "张三",
    say:function(){
        console.log(this);
        console.log(`${this.name}`);
    }
    ,
    speak : function(a , b){
        console.log(a , b);
        console.log(this);
    }
}
let obj2 = {
    name:"李四"   
}

obj.say();
let name = '佳明'


const fn = obj.say;
fn();

obj.speak.call(obj2 , "123" , "321");
obj.speak.apply(obj2 , ["123" , "321"])
