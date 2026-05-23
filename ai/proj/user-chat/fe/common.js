let users = [];

fetch("http://localhost:3000/users")//等
.then(data => data.json())//json化
.then(data => {
    console.log(data);
    users = data; 
    const oBody = document.querySelector('.table tbody');
    for(let user of users){

    oBody.innerHTML += `
    <tr>
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.homeTown}</td>
    </tr>
    `
}
})
;// json化

//dom 期待动态的填入 
//dom 节点对象
//oBody 表示类型
//挂载点
// const oBody = document.querySelector('.table tbody');

//计数循环 快 cpu 符合计算规则 缺点：可读性差了 太机械化了
// for(let i = 0 ; i < users.length ; i ++){
//     let user = users[i];
//     console.log(user);
// }
//来自js的es6版本 新的for循环 不需要计数的情况下，这个遍历最好
for(let user of users){

    oBody.innerHTML += `
    <tr>
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.homeTown}</td>
    </tr>
    `
}


