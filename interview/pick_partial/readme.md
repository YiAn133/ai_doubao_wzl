  ## Docker 
  
  docker run -d --name mysql-demo -p 3307:3306 -e MYSQL_ROOT_PASSWORD=123456 mysql:8.0

  docker exec -it mysql-demo /bin/bash
  **作用：进入一个正在运行的容器内部，打开交互式终端，就像 ssh 登录进这台 “小 Linux 机器” 里面操作。**

> 
> ⚠️ 前提：**容器必须是正在运行（Up）状态**，停止的容器不能 exec 进去。

## 参数拆解

1. `exec`：execute，**在已经运行的容器里面执行一条命令**（不是新建容器！）
2. `-i`：`--interactive` 保持标准输入打开，能接收你的键盘输入
3. `-t`：`--tty` 分配伪终端，才有命令行提示符

> 
> `-it` 几乎总是成对一起写，缺一不可。

4. `mysql‑demo`：容器名字（也可以写容器 ID）
5. `/bin/bash`：要在容器内部执行的程序，就是启动 bash shell，拿到命令行。
  进入容器 linux 终端
  mysql -uroot -p123456

## TS 高级类型 
- Pick<T, 选取类型的联合字符串>
 `Pick<T, K>`：**从类型 `T` 挑选出指定的一部分属性 `K`，生成一个新类型**。
- Omit<T, 要排除的类型的联合字符串>
  Omit 去掉部分字段,其他都要


Omit<T, k> 等价于 Pick<T, Exclude<keyof T, k>> 怎么理解？
- keyof T 拿到 所有键的联合类型
- Exclude 把要剔除的K 键删除， 剩下需要保留的键
- 再用Pick把剩下的键从类型T中挑选出来， 就实现了Omit 的效果
- TS 内部Omit 的等价实现
## 工具类型
Pick、Omit、Partial、Exclude、keyof、ReturnType、Record

