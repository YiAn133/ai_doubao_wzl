interface User{
    id:number,
    name:string,
    age:number,
    email:string
}

// `Pick<T, K>`：**从类型 `T` 挑选出指定的一部分属性 `K`，生成一个新类型**。
// 从user类型中挑选出 id 和 name
type UserPreview = Pick<User , 'id' | 'name'>
const u:UserPreview = {
    id:1,
    name:'张三'
}

// Omit 去掉部分字段,其他都要
type UserSafe = Omit<User , 'email'>;

const safeUser: UserSafe = {
    id:2,
    name:'李四',
    age:22
}

// 所有字段全部变成可选，可以不选
type PartialUser = Partial<User>;

const patchUser:PartialUser = {
    
}

// 快速定义一个键值对 键为 string 值为number
type Dict = Record<string , number>;
const obj :Dict = {
    a : 1,
    b : 2
}
type ErrorMsgMap = Record<number , string>;
const errorMessage : ErrorMsgMap ={
    400: '请求参数错误',
  401: '未登录，请重新登录',
  403: '权限不足, 禁止访问',
  404: "资源找不到",
  500: "服务器内部错误"
}

function getErrMsg(code:number):string{
    return errorMessage[code] ?? '未知错误'
}
function fn(){
    return {
        x:1,
        y:2
    }
}
type fnReturn = ReturnType<typeof fn>;

type All = 'id' | 'name' | 'age' | 'email';
// `Exclude<T, U>`：从联合类型 `T` 里面，删掉 `U`，剩下的组成新联合类型。
type AfterExclude = Exclude<All , 'email'>;