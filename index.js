var request = require("request");
var xlsx = require('node-xlsx');
var fs = require("fs");
now = new Date()
now_UTC = now.getTime()/1000
var options = { method: 'POST',
  url: 'https://cloud.tencent.com/developer/services/ajax/ask/question',
  qs: { action: 'FetchQuestionFeeds' },
  headers: 
   { 'cache-control': 'no-cache',
     'Content-Type': 'application/json' },
  body: 
   { action: 'FetchQuestionFeeds',
     payload: { queryType: 'timeline', pageNumber: 1, pageSize: 50 } },
  json: true }

request(options, function (error, response, body) {
  if (error) throw new Error(error)
  data = JSON.stringify(body)
  data_json =  JSON.parse(data)
  var data_arr = new Array()
  for (i=0; i < data_json.data.list.length ;i++){
    var Date_cut = now_UTC - data_json.data.list[i].writeTime
    if (Date_cut < 86400 ){
      var data_tags = new Array()
      data_tiele = data_json.data.list[i].title
      data_id = "https://cloud.tencent.com/developer/ask/" + data_json.data.list[i].id
      if (data_json.data.list[i].answerCount>0){
        data_answer = '是'
      }else{
        data_answer = '否'
      }
      data_writeTime = new Date(data_json.data.list[i].writeTime*1000).toLocaleString()
      for(a=0;a<data_json.data.list[i].tags.length;a++){
        data_tags[a] = data_json.data.list[i].tags[a].tagName
      }
      hyperlink = '=HYPERLINK("' + data_id + '","' + data_tiele + '")'
      var data_set = [data_writeTime,hyperlink,data_answer,data_tags]
      data_arr.push(data_set)
    }
  }
  var buffer = xlsx.build([{name: "mySheetName", data: data_arr}]); // Returns a buffer
  fs.writeFileSync('./'+ now.toLocaleDateString() +'.xlsx', buffer);
});
