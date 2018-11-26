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
node one_day.js
```
实现自动生成当天24小时问答内容

以下内容还有BUG，正在修复  

~~**执行**~~

```
node definition_days.js
```

~~然后输入你要生成的天数~~  
~~实现自动生成设置天数的问答内容~~
