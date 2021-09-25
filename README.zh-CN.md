# my-midway-project

## 快速入门

<!-- 在此次添加使用文档 -->

如需进一步了解，参见 [midway 文档][midway]。

### 本地开发

```bash
# 安装
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### 部署

```bash
# 启动命令
$ npm start
$ npm stop
```

### 内置指令

- 使用 `npm run lint` 来做代码风格检查。
- 使用 `npm test` 来执行单元测试。

[midway]: https://midwayjs.org

### 功能 sql

- 拼凑批量删除主外键 sql 脚本

```sql
SELECT
    CONCAT( 'ALTER TABLE `', table_name, '` DROP FOREIGN KEY `', CONSTRAINT_NAME, '`;' ) AS 'drop'
FROM
    INFORMATION_SCHEMA.REFERENTIAL_CONSTRAINTS
WHERE
    CONSTRAINT_SCHEMA = 'member_dev'
```

- 拼凑批量删除表 脚本

```sql
Select CONCAT( 'drop table ', table_name, ';' )
FROM information_schema.tables
Where table_schema= 'member_Dev' and  table_nameLIKE '模糊表名%';
```
