# text2sql
**用自然语言提问，大模型自动翻译成 SQL 语句，直接查询数据库**。

## Sqlite数据库：**文件式小型关系数据库，不用装服务，本地存数据，简单方便，但写并发差**。
作为系统内置的文件型数据库

- insertmany
    INSERT INTO XXX VALUES(? ,?,?,?)
- 事物 transaction