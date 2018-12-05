var request = require('request');
var xlsx = require('node-xlsx');
var fs = require("fs");
var scanf = require('scanf');
console.log("请输入你要统计的小时数：")
var hours = scanf('%d');
var request_page_num = 1
var data_arr_loop = 0
var synchronous_post = function (){
    var options = {method: 'POST',
    url: 'https://cloud.tencent.com/developer/services/ajax/ask/question',
    qs: { action: 'FetchQuestionFeeds' },
    headers: 
     { 'cache-control': 'no-cache',
       'Content-Type': 'application/json' },
    body: 
     { action: 'FetchQuestionFeeds',
       payload: { queryType: 'timeline', pageNumber: request_page_num, pageSize: 50 } },
    json: true };

    return new Promise(function(resolve, reject){
        request(options , function(error,response,body){
            if(error){
                reject(error);
            }else{
                resolve(body);
            }
        });
    });
}

var extract_data = async function(){
    now = new Date()
    now_UTC = now.getTime()/1000
    var data_arr = new Array()
    var data_arr_excel = new Array()
    var circulation_state = 1
    while(circulation_state == 1){
        data = await synchronous_post(); //将异步函数变为同步函数，等待数据。
        data_arr.push(data.data)
        var Date_cut_49 = now_UTC - data.data.list[49].writeTime //现在的时间减去问答前50条最后一条发表时间
        if (Date_cut_49 < 3600 * hours ){
            circulation_state = 1 //如果最后一条发表时间小于hour小时，则循环去抓取第二页。
            request_page_num++
        }else{
            circulation_state = 0; //否则停止跳出循环。
        }
    }
    while(data_arr_loop < request_page_num){ //数组data_arr需要循环才能输出下页数据
        for(data_loop=0;data_loop < data_arr[data_arr_loop].list.length;data_loop++){ //循环输出数组中的list
            var Date_cut = now_UTC - data_arr[data_arr_loop].list[data_loop].writeTime //判断单条问题发布时间是否小于hour小时，小于则将数据打印出来
            if(Date_cut < 3600 * hours){
                var data_tags = new Array()
                data_title = data_arr[data_arr_loop].list[data_loop].title//标题
                data_writeTime = new Date(data_arr[data_arr_loop].list[data_loop].writeTime*1000).toLocaleString()//发表时间
                data_url = "https://cloud.tencent.com/developer/ask/" + data_arr[data_arr_loop].list[data_loop].id //链接
                if (data_arr[data_arr_loop].list[data_loop].answerCount>0){//是否回答
                    data_answer = '是'
                  }else{
                    data_answer = '否'
                  }
                for(tag_nums=0;tag_nums<data_arr[data_arr_loop].list[data_loop].tags.length;tag_nums++){ //标签，并将其传入到data_tags数组中
                    data_tags[tag_nums] = data_arr[data_arr_loop].list[data_loop].tags[tag_nums].tagName
                }
                console.log(data_title,data_writeTime,data_url,data_answer,data_tags);
                hyperlink = '=HYPERLINK("' + data_url + '","' + data_title + '")' //将链接和标题通过excel函数HYPERLINK变为超链接
                var data_excel = [data_writeTime,hyperlink,data_answer,data_tags] //将统计出来的数据整理
                data_arr_excel.push(data_excel)//将需要的数据写入到数组中
            }
        }
        data_arr_loop++ //方便data_arr循环
    }
    var buffer = xlsx.build([{name: "data", data: data_arr_excel}]); 
    fs.writeFileSync('./'+ now.toLocaleDateString() +'.xlsx', buffer);
}

extract_data();