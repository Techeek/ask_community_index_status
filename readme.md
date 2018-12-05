为了方便统计腾讯云问答社区首页的数据，本项目自动将问答首页若干小时内的数据整理成Excel导出。

依赖`request`和`node-xlsx`包，使用比较简单。

**安装**

```
git clone https://github.com/Techeek/ask_community_index_status.git
cd ask_community_index_status
npm install
```

**执行**

```
node index.js
```
然后输入要统计的小时数，自动导出为当天时间的excel文件

> 2018年12月5日 更新项目，重构代码，更加便捷，去除以前写的代码。  
> 2018年11月22日 创建项目，为了方便统计信息。  
