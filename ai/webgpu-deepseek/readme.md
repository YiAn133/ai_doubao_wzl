# webgpu-deepseek
## huggingface
AI 圈最火的开源型社区，各个厂商把AI模型发布到这里。

transform.js
web访问  id 远程下载，访问 ，并执行nlp任务

deepseek deepseek-r1-distill-qwen 1.5B 文件上传（GB） -> huggingface -> transform.js -> load
-> web下载到浏览器本地(慢)  -> 浏览器缓存 -> webgpu(新特性，兼容性) -> nlp

## 安装依赖

- `@huggingface/transformers` = JS 端侧推理 SDK，负责下载、分词、调度 WebGPU 运行模型；**不含模型权重**
- marked": "^15.0.5" = 输入 markdown 文本字符串，转为 html 字符串
- 为什么大模型那边返回markDown？
    因为简洁

## 引入webWorker
//基础的worker是只有new URL，但是这里./worker.js里面需要引入别的包，故而要加第二个参数 type:"module"
  worker.current = new Worker(new URL("./worker.js" , import.meta.url) , {
        type:"module"//基础的worker是只有new URL，但是这里./worker.js里面需要引入别的包，故而要加第二个参数 type:"module"
      });

as any : 是用来处理TypeScript编译时期的报错，但是不改变JS实际行为
    
const IS_WEBGPU_AVAILABLE = !!(navigator as any).gpu;nacigator默认没有gpu属性，这里加上as any让它不报错

##  !!(navigator as any).gpu
navigator.gpu 报错，比较新，实验阶段的属性，ts没有很好的识别Navigator类
as any 类型断言 让Ts变为Js 没有类型约束

### ts类型检测的底层
tsconfig.json.typescript 配置文件，根据项目需求做各种配置
别的方式？
ts 里有专门的类型申明文件， 本质是缺失类型申明文件
pnpm i -D @webgpu/types 安装类型申明文件

## 分词器和模型
const [tokenizer, model] = await TextGenerationPipeline.getInstance
    1. **TextGenerationPipeline.getInstance()**：**单例懒加载**，只加载一次模型，返回`[tokenizer, model]`
   - `tokenizer`：分词器，文本 ↔ 模型数字 id 互转
   - `model`：大模型实例，GPU 上执行推理生成 token id
   - 回调接收下载加载进度，通过`postMessage`传给主线程渲染进度 UI。
2. 注意：`tokenizer/model`不能 postMessage 传给主线程，worker 销毁实例就丢失。

# 单例模式
- 一个类，全局只能创建出唯一 1 个实例对象，重复获取返回同一个对象，不会新建。
说白了，就是不会new 每次函数里面返回的都是this对象

## load
- 空值合并运算符
  ??=用于在变量为null或者undefined时，赋值。
  避免重复赋值。
- web异步下载
  AutoTokenizer.from_pretrained.promise
  下载的时候很慢，通过传递的配置对象里面的process_callback函数，可以显示加载动画等操作

## usestate（）
> `setX( (prev) => 新值 )` 叫**函数式更新**

- 参数 `prev`：**上一轮最新的 progressItems 数组**（React 自动传给你）
- 回调 return 的值，就是状态的新值。

1. `this.tokenizer`：存到**类的静态属性**上，调用完函数不会销毁。
2. 不加`this`就是函数内部局部变量，函数结束就销毁。