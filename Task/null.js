const $ = new Env('生活圈自动评论');
let status;
status = (status = ($.getval("shqstatus") || "1") ) > 1 ? `${status}` : ""; // 账号扩展字符
const shqurlArr = [], shqhdArr = [],shqcount = ''
let times = Math.round(Date.now() / 1000)
let shqurl = $.getdata('shqurl')
let shqhd = $.getdata('shqhd')
let shqkey = '',id = '',uid='',tid=''
let nr = ($.getval('nr') || '  留下脚印');//自定义评论内容
let txje = 15 //在此处修改一下需要提现的金额,可对照自己的余额修改提现,支持小数点提现,改完手动运行脚本即可提现,微信秒到,记得绑定自己的微信
let kg = 0  //提现开关,默认关闭,改为1手动执行一次可提现
!(async () => {
  if (typeof $request !== "undefined") {
    await shqck()
   
  } else {shqurlArr.push("https://ex.jwshq.cn/app/commentator/getActivityItemPage?start=0&limit=5")
    shqhdArr.push("{\"Connection\":\"keep-alive\",\"Accept-Encoding\":\"gzip, deflate, br\",\"App\":\"1568615\",\"Ver\":\"210210\",\"X-User-Info\":\"76jlj76_67011l67261m_0_Wim0hjk0iW2Pjmrl7Pkb0J1Wh7PP21bjPJ6kk6h2_k7111l2021lr_70l022r__7j7km06022k16__6lWJ0m2hJk\",\"Portal\":\"1080334\",\"User-Agent\":\"Mozilla/5.0 (iPhone; CPU iPhone OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148\",\"Device\":\"af90d670fa3b69481b7e0c2ad1bb32e6bc5775d3\",\"Cookie\":\"plug-ck=76jlj76_67011l67261m_0_Wim0hjk0iW2Pjmrl7Pkb0J1Wh7PP21bjPJ6kk6h2_k7111l2021lr_70l022r__7j7km0602r7j2__2mkj6iPk7j\",\"Referer\":\"https://ex.jwshq.cn/commentator/items\",\"Host\":\"ex.jwshq.cn\",\"Token\":\"3rpPKwJ6h69rmAYPhNYFOZwKCokCJFFokRDAqyNvszktinqjMz2RxBw\",\"Accept-Language\":\"zh-cn\",\"Accept\":\"application/json, text/plain, */*\"}")
    let shqcount = ($.getval('shqcount') || '2');
    shqurlArr.push("https://ex.jwshq.cn/app/commentator/getActivityItemPage?start=0&limit=5")
    shqhdArr.push("{\"Connection\":\"keep-alive\",\"Accept-Encoding\":\"gzip, deflate, br\",\"App\":\"1568615\",\"Ver\":\"210210\",\"X-User-Info\":\"76jlj76_67011l2021lm_0_Wim0hjk0iW2Pjmrl7Pkb0J1Wh7PP21bjPJ6kk6h2_k7111l2021lr_70l022r__7j7klmm772l16__imjJk01J7k\",\"Portal\":\"1080334\",\"User-Agent\":\"Mozilla/5.0 (iPhone; CPU iPhone OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148\",\"Device\":\"af90d670fa3b69481b7e0c2ad1bb32e6bc5775d3\",\"Cookie\":\"plug-ck=76jlj76_67011l2021lm_0_Wim0hjk0iW2Pjmrl7Pkb0J1Wh7PP21bjPJ6kk6h2_k7111l2021lr_70l022r__7j7klmm77rmk7__bmjWPJjjmW\",\"Referer\":\"https://ex.jwshq.cn/commentator/items\",\"Host\":\"ex.jwshq.cn\",\"Token\":\"3rpPKwJ6h69rmAYPhNYX4FqhmvZIp9x5iGErUQhMocBzaTQZwu2a8WR\",\"Accept-Language\":\"zh-cn\",\"Accept\":\"application/json, text/plain, */*\"}")
  
    console.log(`------------- 共${shqhdArr.length}个账号-------------\n`)
      for (let j = 0; j < 30; j++) {
       for (let i = 0; i < shqhdArr.length; i++) {
        if (shqhdArr[i]) {
         
          shqurl = shqurlArr[i];
          shqhd = shqhdArr[i];
          if(i==1){
            nr = '  多分享这类文章让更多人看到';
           }else{nr = '  留下脚印';}
          
          $.index = i + 1;
          console.log(`\n开始【生活圈${$.index}】`)
          await shqlb();
          console.log(`等待5s`)
          await $.wait(5000);
         }
          }
        console.log(`等待60s`)
        await $.wait(60000);
       }   
        for (let i = 0; i < shqhdArr.length; i++) {
        if (shqhdArr[i]) {
          shqurl = shqurlArr[i];
          shqhd = shqhdArr[i];
          $.index = i + 1;
          console.log(`\n开始【生活圈${$.index}】`)
          await shqxx();
          if(kg == 1){
          await shqtx();
          }
        }
 }
         }
}
  )()
  .catch((e) => $.logErr(e))
  .finally(() => $.done())
//生活圈数据获取


function shqck() {
   if ($request.url.indexOf("start=") > -1) {
 const shqurl = $request.url
  if(shqurl)     $.setdata(shqurl,`shqurl${status}`)
    $.log(shqurl)
  const shqhd = JSON.stringify($request.headers)
        if(shqhd)    $.setdata(shqhd,`shqhd${status}`)
$.log(shqhd)
   $.msg($.name,"",'生活圈'+`${status}` +'数据获取成功！')
  }
}






//生活圈任务列表
function shqlb(timeout = 0) {
  return new Promise((resolve) => {

let url = {
        url : `https://ex.jwshq.cn/app/commentator/getActivityItemPage?start=1&limit=1`,
        headers : JSON.parse(shqhd),
       
}
      $.get(url, async (err, resp, data) => {

        try {
    const result = JSON.parse(data)
        if(result.code== 0){
if(result.data.data[0] == undefined){
$.log('\n生活圈没有匹配到任务列表')
}
name = result.data.data[0].title
name = encodeURI(name+nr)
key = result.data.data[0].articleId
        console.log('\n生活圈获取任务ID成功\n当前任务ID: '+key+'\n开始提交评论:'+result.data.data[0].title)
  //$.log(name)
        await $.wait(1000);
        await shqtj()
} else {
       console.log('\n生活圈获取任务ID失败  '+result.msg)

}
   
        } catch (e) {
          //$.logErr(e, resp);
        } finally {
          resolve()
        }
    },timeout)
  })
}



//生活圈提交
function shqtj(timeout = 0) {
  return new Promise((resolve) => {
let url = {
        url : "https://ex.jwshq.cn/app/commentator/comment",
        headers : JSON.parse(shqhd),
        body : `imageId=&articleId=${key}&text=${name}&sign=0`,
}
      $.post(url, async (err, resp, data) => {
        try {

           
    const result = JSON.parse(data)
        if(result.data.award == 3){
        console.log('\n生活圈提交评论成功,获得'+result.data.award+'分现金奖励')
       await $.wait(1000);
       await shqtq()
       
} else {
       console.log('\n生活圈错误'+result.data.message)

}
   
        } catch (e) {
          //$.logErr(e, resp);
        } finally {
          resolve()
        }
    },timeout)
  })
}
//生活圈领取现金
function shqtq(timeout = 0) {
  return new Promise((resolve) => {
let url = {
        url : "https://ex.jwshq.cn/app/commentator/increaseBalance",
        headers : JSON.parse(shqhd),
        
}
      $.get(url, async (err, resp, data) => {
        try {
           
    const result = JSON.parse(data)
        if(result.data == true){
        console.log('\n生活圈任务提取现金成功')
       //await $.wait(1000);
        //await shqlb()
} else {
       console.log('\n生活圈任务提取现金失败')

}
   
        } catch (e) {
          //$.logErr(e, resp);
        } finally {
          resolve()
        }
    },timeout)
  })
}

//生活圈提现
function shqtx(timeout = 0) {
  return new Promise((resolve) => {
let url = {
        url : "https://ex.jwshq.cn/app/wx/withdraw",
        headers : JSON.parse(shqhd),
        body : 'amount='+txje,
        
}
      $.post(url, async (err, resp, data) => {
        try {
           
    const result = JSON.parse(data)
        if(result.code == 0){
        console.log(`\n生活圈提现:${result.data.message}`)
      
} else {
       console.log('\n生活圈提现错误'+data)

}
   
        } catch (e) {
          //$.logErr(e, resp);
        } finally {
          resolve()
        }
    },timeout)
  })
}

//生活圈信息
function shqxx(timeout = 0) {
  return new Promise((resolve) => {
let url = {
        url : "https://ex.jwshq.cn/app/commentator/commentAwardInfo",
        headers : JSON.parse(shqhd),
}
      $.get(url, async (err, resp, data) => {
        try {
           
    const result = JSON.parse(data)
        if(result.code == 0){
uid = result.data.awardAmountToday / 100
tid = result.data.awardAmountTotal / 100
        console.log(`\n生活圈今日评论文章数:${result.data.commentNum}\n今日共获得:${uid}元\n我的总收入:${tid}元`)
      
} else {
       console.log('\n生活圈错误'+data)

}
   
        } catch (e) {
          //$.logErr(e, resp);
        } finally {
          resolve()
        }
    },timeout)
  })
}

function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r)));let h=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];h.push(e),s&&h.push(s),i&&h.push(i),console.log(h.join("\n")),this.logs=this.logs.concat(h)}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
