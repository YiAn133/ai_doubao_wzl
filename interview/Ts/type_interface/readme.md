# TS 必考题之 type & interface的区别
- 共同点
    interface 和type 都可以描述对象的结构，
    用于函数参数，返回值
    给对象，变量做类型约束。
## 区别
- 继承 interface 是用extends type是&
- 申明的合并 interface申明俩个一样名字的接口，会合并  type声明一个名字的接口，会报错
- 能否表示简单类型 interface不能表示简单数据的约束  type可以
    // ❌ interface 不允许
          interface Id = string
- 函数类型的区别  都可以表达，但是区别有所不同