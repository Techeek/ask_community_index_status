为了方便统计腾讯云问答社区首页的数据，本项目自动将问答首页24小时内的数据整理成Excel导出。

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

-----

执行完成后即可看到生成当天时间的Excel文件。