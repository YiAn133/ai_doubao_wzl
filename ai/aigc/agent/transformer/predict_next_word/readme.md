# llm 怎么预测下一个词？
## transformer 架构：就是处理这个问题的
是llm 最重要的工作

看看模型拿到token 后怎么去处理的，经历了什么，做词得到预测

## Token 词元
用户输入的Prompt （自然语言） 分割为多个token，把每个token转为一个tokenId，这些tokenId 就是模型的输入
编码器  将 词编码为tokenId  再进行解码 然后返回给我们

大模型处理的最小单元不一定是完整的“词”，可能是"子词"，"字符"甚至"标点".
用词元 能精准表达它是模型计算和计费的通用最小处理单位，而非语言学意义上的词.有利于模型计算
unhappiness 词 在token中如何处理？ 
un happi ness
llm 通常不会把它当成一个完整的词，而是将其分解位多个词元
再如tokenization 分为 token ization
如果默认是完整的词，模型要记得东西太多了，这样处理后token查找表 size 就不会那么大，运算效率高

在处理中文的时候，如"我爱人工智能，自然语言处理很有趣"
在处理的时候分为【"我","爱"， ”人工智能“， ”,“ ， ”自然语言处理“,"很" ， ”有趣“】

把词元理解为llm的货币

发一段文字给大模型，比如：你 -> tokenId
llm 只会做一件事情 预测下一个词
你 -> tokenId -> llm （....）-> tokenId -> 好

将tokens -> 变为embedding（语义化向量）
llm内部除了token 查找表，还通过预训练，embedding（语义化向量）存储

通过查找看看词元在tokens的第几页 存在神经网络结构中

如基于"中国首都是" 会根据这个输入，然后去看tokenid 去查找下一个词可能出现的概率
然后会生成北京
然后再自回归 不断去看下一个词生成什么
## Embedding
语义化向量 pre - tranined 神经元
第一步: 用tokenId 变成一个Embedding 坐标  如你 -> tokenId(57668) 但是单单这样没有任何含义  只有变成语义化向量才有意义
第二步：查找embedding 计算**语义距离**   llm把编号转为一个高维的向量，这个过程就叫embedding，再进行查找向量查询表，得到相关的语义距离
第三步：
## 位置编码

如："我咬了狗"  "狗咬了我"
得到的tokenid 是一样 这个时候 位置就很重要
embedding 不携带位置信息，我们就给每个向量叠加一个位置编码(Position Encoding PE) 告诉llm，这个词属于句子的第几个

每个token 携带俩类 信息：语义信息(是什么) 位置信息(在哪里)

## 模型怎么理解上下文的?
The animal didn't cross the street,because it was too tired === 这里的it大模型如何知道这里的it指谁
解决这个问题是利用 self - attention(自注意力)

每一个embedding 分成 三个部分
Q K V
Q Query 代词 我在找什么？
Key 我能提供什么 
V 我能贡献什么内容（特征）

如 animal
Q：没有找到 权值低
K：我能提供动物
V ：存动物的特征等

所以it 这个query向量 和句子里面每一个词的key  向量做一个点击运算，得到注意力分数，分数越高 说明俩个词相关性越强


token1：animal -> (Q1 ,K1 , V1)
TOKEN2:it -> (Q2 , K2 , V2)
