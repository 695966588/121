const jsname = '🧿多看点'
const $ = Env(jsname)
//0为关闭日志，1为开启,默认为0
const logs = 0;
//0为关闭通知，1为所有通知,默认为0
const notifyInterval = 1;
const notify = $.isNode() ?require('./sendNotify') : '';
//通知风格
let tz = '';
let myselfcash = $.getval('myselfcash') || 1; //自定义未满50元的提现金额

//////////////////////////////////////////////////////////////////
//hour&min
var hour = '';
var minute = '';
if ($.isNode()) {
  hour = new Date(new Date().getTime() + 8 * 60 * 60 * 1000).getHours();
  minute = new Date(new Date().getTime() + 8 * 60 * 60 * 1000).getMinutes();
} else {
  hour = (new Date()).getHours();
  minute = (new Date()).getMinutes();
}
//现在毫秒格式(13位数)
let todaytimems = Math.round(Date.now())
//现在秒格式(10位数)
let todaytimes = Math.round(Date.now() / 1000)
//今天20200101格式
let today1 = formatDateTime(new Date());
//今天2021.01.30 17:32:01格式
let today2 = formatDateTime(todaytimes);

//////////////////////////////////////////////////////////////////
const dkdtokenbodyArr = [];
let dkdtokenbodyVal = "";

const dkdtokenkeyArr = [];
let dkdtokenkeyVal = "";

//const dkdcashurlArr = [];
//let dkdcashurlVal = "";

const dkdcashkeyArr = [];
let dkdcashkeyVal = "";

//const dkdlottourlArr = [];
//let dkdlottourlVal = "";

const dkdlottokeyArr = [];
let dkdlottokeyVal = "";

const getawardbodyArr = [];
let getawardbodyVal = "";

let getawardscore = 0;

let bodys = "params=Xk%2Br8QI5M2aaf%2BHvoKUn%2BOHn2dQUOR/5I%2B4geJnkF9zGfc8wMFLdldbw5Sgh8EgC0D0aTxUrz%2BJXKqoUT0Uu1hb8DRbjcwDMQjUQwuqvVKImIj7XJ/a5DIsRJFv42Yiw#params=geQFqiG89xmkFFCeFpu6x0pSFpEA7A67eaPoGPu8MaKTkTVGq/ea5q530CAWdw7J439crYSJcRD0%2BvvAC6fMTQSsBvvb/RcqLenRPh6MBW%2BlSRcUhwYQG3emFM5gax1q#params=geQFqiG89xmkFFCeFpu6x%2BSiA7i9Kf3oC3bexW%2Bgu2bItF608Y7FO4IOuTZPMocrwu9Ot2ZWw4Nb1khnhX2s2nikyQ3hZ5d7xuRM2Rm7sY1pPCQnwB/tn7udcQD8gWG2#params=zbml6HRqvmMRwpGRA7eFZy62W2yFaUaUy51QPN/d3LaIHuq48KGmapl6/C6OjR/jsuAGAfBqZEefVf60XjS2BnYqVDk5bbLq6wYSoLjYN4A%3D#params=EJhtRxOSXh/xtYUxtCNP7JaFttYEsWPa5eHJmv6sZ7jY21JGj%2B65erViO0wEOB6He0YVS300s9CFea6NvI7Rj3zca/hZ9x%2BHwnbx4ygjQ9Zxc43ghvaf3ybUSk1ifoou#params=M93wJuVCoY9aQ7GdIacn013uWxf7PLLHuq1u10YHE25R8tHI0oYsz7M3tZiEqmej7huOw6BHYj8gRXWW8OhMXnIAlSNpkiYIn2wgkAs47PCQ/pwLJKp1yVaChf6MRhjH#params=M93wJuVCoY9aQ7GdIacn013uWxf7PLLHuq1u10YHE25R8tHI0oYsz7M3tZiEqmej04pTo5IzQeZVr02J9VRb3j/IRH2MPObKY1e5t2CqOeHC/mP4YZh4cv/E7Jz7LXYv#params=nJKmHpztPqfj5YIsrbbOIUOxS3/5WtVLGbbJ/TzhieDgePhnNoVvo0VbWwKKJBvs7H2JJffd4BstQUZIPLG7xKAFndmygaL1J8iGNf90eixS81DKhvYzFKA4R47kV/To#params=M93wJuVCoY9aQ7GdIacn013uWxf7PLLHuq1u10YHE25R8tHI0oYsz7M3tZiEqmejs5gZuhgYHCOfzy7hYW3kYMzuG8R60zp6bfFSJdQuNO0NfX4WbcO0EUKtEXDBCHW7#params=M93wJuVCoY9aQ7GdIacn013uWxf7PLLHuq1u10YHE25R8tHI0oYsz7M3tZiEqmej6bvo0i3iWSIGfTFLABlvfxN6J6qjBoxParghKoA9sSODtI5d7wlVUYRnDS3QtuUH#params=M93wJuVCoY9aQ7GdIacn013uWxf7PLLHuq1u10YHE25R8tHI0oYsz7M3tZiEqmej1IjucgqYsjShBAMIRcw0Ux/b0v1CWLuK7zFFgkTeMU7t8Yp0CnQAV6srArMY4fkV#params=r0Snh3EfrvOP%2BtIlBwB6/0%2BGUF8cD30Xt0wefZc7yqQzdjCW3NxA5uuWB34ch4kpWI6T141ipPEv0wYXDvk3cvxsdDMxAs%2BG0wK/8lip31DOxfSKybsFbuD6FM3Duyv6#params=geQFqiG89xmkFFCeFpu6xz9scDdvb5yUXNG66dsGCJeyyef9i3MaTjWb40GL%2BLcFWPIhuLf8r954YqdMEZlNeL2Ikqc5lmB6uvLoHjBGm0A%3D#params=FjRxvwQgtQTGpIMVXhWM0FCPnhQbvwnCV2iykVIaJks3hlAQLC4C8wYDfVbrgPt5500ra8duNtL4cTX4KJe1w2tFv/7GvkCagga4u7vUeO4CH7u%2BHQtDo1hdZvf/uWAs#params=M93wJuVCoY9aQ7GdIacn013uWxf7PLLHuq1u10YHE25R8tHI0oYsz7M3tZiEqmej63fRFRqc1HcjpM7OgsvQ/kaet6JYgLAZDpzTA/LX/M1fhvJ3ER0vSphQ%2ByXh5V%2BT#params=wFo6RfH3hC6HTEvrVGJJgE7XYL4qf11uIrbSDDYMVwxWcGVEv8fGYKGWzgMwhuZDqYXFUPhVhBvpk8dWIxhbosV/KXIjsKLrMJ6us3Lixfs%3D#params=4/ynUw6fPbQOCrB5PvsIQC5ldGOfmQmYfFHOLtEO%2BBBYytZ9BStdaHCfhr09hk2GbPHHo9VukYwISH8XhWuG1Dj2yieSGMG0qFnbdl%2B/9%2BZHnRuL4xs1/Rv1XRW8Yw7k#params=M93wJuVCoY9aQ7GdIacn013uWxf7PLLHuq1u10YHE25R8tHI0oYsz7M3tZiEqmejiDx2wXQvv7/CefysPWMAwsbynciwyWVQs2FKsY1f6GOSRLDabsUevAwxL1B0dJeg#params=M93wJuVCoY9aQ7GdIacn013uWxf7PLLHuq1u10YHE25R8tHI0oYsz7M3tZiEqmej7i%2BnqOXCXZUGTA1rXydsnsLmQ6juzi7EpMG1JDUOe3FHNDkGN8V/Hhx5JrRFw5yH#params=M93wJuVCoY9aQ7GdIacn013uWxf7PLLHuq1u10YHE25R8tHI0oYsz7M3tZiEqmejkdKjEDMU8pTSXqAyfhbv4TJzX/oAcPFwaZVqcLZpnnfXgm1MvwjxIvLA5lFgRYq1#params=AigaeaeashdA3jGMYUguevBzwKJyn%2BG9LZT6xW%2BYlG9PaAK3lj9%2By6CgkMpFAaUrBzIoqNLinlzdtFpH3tg7BlOCwACQAiGqcP809mVkLag%3D#params=uDWPbJjNHxOPY7zfXehIQXpxlFk/ZsDZ7fZv/ufiNv%2BqXLa5ubnPSC47HwIF4P6IpFjPnti923u4GFidypXdXXDd6AJO4vfL7eEfXbD%2BeWh1NHc6Wq92SQI8xV45%2B5z3#params=M93wJuVCoY9aQ7GdIacn013uWxf7PLLHuq1u10YHE25R8tHI0oYsz7M3tZiEqmejAkenr9bExGwZBq2BKf3IKHwg3EZp//TvAMJ5seImWNhm1qKlc/luQgnjesuVqI58#params=Q6lIudziw4Qdx/IPRzy0SMr4xwOQfMoXH14bS4Ov0DYZDqLKrYoxmyUxDoJwmMJp6M2Y9X9ywakjDPZ0Lz4FZR49wsjDLRrPLSR3I4ncHJxjVlhAPq%2BIOjmQmNAdr5oY#params=uQFPjdfdUQWVQf4WiKXfcD9FEY4HuRAIIVWC8gn5UnXio9n0NccKMja%2BKCtIN0WDvgvl8vkhXjKbTQVy89TAsBcWS7ZkqMk9ohCKgv/JNIq7wCOSCPaWE2rn3aLMR9VG#params=AnU99sGr0rgVOULB0YW6POpS4Vqf9Pmy65VQVKhe1nOp0Rn3viahw%2BO66iVj7lgSVyJxXaaq6hYQdeyqYLbZGNtF9ME4Hgrlboo3%2Bv/4d4FUmK5/%2BZ6U9uhcFeRSdEvV#params=OUEfxtdHZFumoZhBRrPmQMicvKM1rJEm9BU3/E88pnCdcAP1N/ilgFaSzllY5Aizo46o3jgq1QrT2Q0y5ovXgdGNH%2BbWrMRmFN9E12VsJXhatOfxXDdgE0a3SHsgQChj#params=8zY29tilKjm97GIZJ9fkNTgopkhnPgoMe/dAnq8ZXcgHS0z49VXZsJlGwAVTel4E%2BGF6sNJGwOoE308yRwFbiO42AygypoHEBe2cttMOabtWkqYY1xMpNjqcku9JCMdY#params=geQFqiG89xmkFFCeFpu6x%2BYnmoIC5%2BNKv4ok8rQHUVTEsGgOQPR14jGENck5ekfa/AQpeigPQNkwp3q/A6sl1xrvQC5b1oBxJyfvtFyMsPbYHCYXI%2BafbVhwHJOLRGyh#params=qblPJUTUSS6Um/Ae9BcmqXt6tdmS%2BLhq5ho0VYojFkMrsoBczhuxEf0%2Bd55uqkyyKAFNGjQV1P50JEgWsOU4giq3Vs4Zy80NugQ2Flt%2Bje67ZgdITRh1jLX0alusSh5T#params=geQFqiG89xmkFFCeFpu6x2gOboy0g/3nY/OMGr9cDmNGasK3uRqt6Of%2BSbzaAS5mY/hBjdw1rrGnJ5/46ojk6Jbea382O7E8Cfvo0Gh/2Kqx/GAKnm1KyO9mIE5S4Hoz#params=M93wJuVCoY9aQ7GdIacn013uWxf7PLLHuq1u10YHE25R8tHI0oYsz7M3tZiEqmejvT1EP11PSCtytiAX%2BOb/syyKDHsoqE4PF4kLBSmVB/4N7lv3jjQEpDDLKPgULC/u#params=1%2B7B/nCGG%2BxR6zCIKfpkKkldhUSCXwl8X6ybOJL4NbQSWiff4cHqkxvZ53Vu7S2snNt4GVNFqUV/gHzBs7NSaPRoNUeDV9j2DRQnr4qGoJgY5jflBnnCHlvfO8y4iChW#params=M93wJuVCoY9aQ7GdIacn013uWxf7PLLHuq1u10YHE25R8tHI0oYsz7M3tZiEqmejSh/20phKTMAQB%2BP9TFoCbg/RFRFkBTFvyuR8NbrPZf0wJltnH3RcvCgHteSIZ1Qk#params=lRxcAzjNrydEVZXOkdmoyVS9KESeP4F679vvX9FIfV2igobCXlQ1/wjzOyfoDCqA2WgQi2HHbu8YIxRfWa3uYMe7KoW5f52nLkhzsTlMpnbGXiN7ny0VTqcM1SqtHnLA#params=geQFqiG89xmkFFCeFpu6x4RD0ZFyBi%2BMANSdrpK9QjHVNSg6oNDibxoUncFbfpeuMSso97nsSXdxH5M17iRHUQve0MsQKHgb8rRjZA7cmQeMCyOjXx9Okxc9CEwap9qc#params=M93wJuVCoY9aQ7GdIacn013uWxf7PLLHuq1u10YHE25R8tHI0oYsz7M3tZiEqmejeOJorLMGbQPGxHWysnby4W/0sZxwUn1qDlXdcPw390nM/Vka/GKbttqPQSsO0Ond#params=1E8JjrdTrgUBVnzwsTmOVXX1yflrXVEISCSGPalinTOQG5xJ3iJ9Yk//I469LKF2O/cw3dM73LYEFyMMOk9PQXXB15ytKWWb8JUrBeHadq/BS92PixaTRej/qHj5LTPA#params=n2c/b6w6OJwmhB1X65M34eUp6y/NlaL8l6rB/Ua/30yFM8Sa%2BOpW7/wlPEcfjldTYxDI8RqyDKqJ1uXgNLJigH1kFxgvKhto9ksK/Zd5tjvXILc3NuxcDZ%2BYJidJOOim#params=geQFqiG89xmkFFCeFpu6xynARh8PizdM0fnUgrn8xCJGox2RpQWJE8nwgpmDTGjG6UeYCXugipGtsRB/Ph3G1gnvO6NyIROSFcXxznxSTABd2OrawEJAZ2hN7HjWtWs/#params=M93wJuVCoY9aQ7GdIacn013uWxf7PLLHuq1u10YHE25R8tHI0oYsz7M3tZiEqmejPX2kK05tseyL8JTDmb3hddXk7Y2/LRvsHh0qjvCfwOrHY27Eougqw%2BI5/hGM12Y8#params=crZij6/pGRHaTdAMKGqn/EDJhjgQ432eWDlbCbFmB3sy7pEWaeBDmHEOkgEOWNHxUNPsdN7WdQGymLgxcb6Z7yeFgQGkxb2467HyN1hOzQPwl0qWje7q4WTelKiAW2Nf#params=geQFqiG89xmkFFCeFpu6x%2BCFpNtQi9AGIX4IIpgo8LdE7V6sBTk9MgX37R8Lzo3Nd6NuvqB/dq5I7M2IFwDif4XMdiTnQn8DQ/gKOvORgJxiEw/33YXbNt00VTqvOGLn#params=geQFqiG89xmkFFCeFpu6x1aGdBy2Y5T0PqFpP5zOCuqskq7Ga7TeSCHPi3EgmDRezYrhYFxhlQ0a1WhMw/y9/N60PM4lyCVRMQqXvjg3giii94lri/24mn8VO/Gwocmy#params=cvOcgfrlA/dn5B/AhAuSeH8FapsXb1JKhQaeP%2B1IZaACAoYCMA7ZVQKYzWdMDePuZNR/WBIbBbLdSEFsz6%2Bp6QFE49OXTVKz5WPIST6KpZuj9oriaLBSOWfSPSev0f0N#params=M93wJuVCoY9aQ7GdIacn013uWxf7PLLHuq1u10YHE25R8tHI0oYsz7M3tZiEqmejzoYstvOKBfhtNigr/tH7hX0nnNguby/pnkk4s9zQG3/i/0G7PVkbmxrGlX6hs2Iy#params=geQFqiG89xmkFFCeFpu6x3pRLeaTSOHzrfXJHdTIQq/9HHs2zzAH9H2rx4PgoaeM32OiMCe35XPVQAiiZ4PftqTDJJiM6jnrguEPKnq4mkAyAXvWqY70xB329BqaOP09#params=geQFqiG89xmkFFCeFpu6x7GviRZ%2BSA5r/PpLgRoDjNbgBS/HnS2mW1AZBg/q6IwXr5zXEQ4LJyiI7Jlx26a9Xq1QvhV/5/CfmdpON3kRHnJXeqcqfEmlmxAdZt/Qi0Pr#params=M93wJuVCoY9aQ7GdIacn013uWxf7PLLHuq1u10YHE25R8tHI0oYsz7M3tZiEqmej16Sj5FIqv6RFw9W5Eq9nKnx9zNJdKc15rYZCRP0LrOY%3D#params=DNFBsVNxIZh4oXDTkh/SFL2u86/xnDw2eWjNpwVujn4zTQ/9iPux8om4/29ZCtMBa%2B26RvYqM7Ru38tQj0TJFyYbkY%2B1Ol0Pbqy39wm4657kJop3oDpkGwMH3McbB3H5"

let indexLast = $.getdata('getawardbody_index');

$.begin = indexLast ? parseInt(indexLast, 10) : 1;

if (!(bodys && bodys != '')) {
  $.msg("", "", '⛔️请先-观看视频-获取请求体,每个视频请求一天只能用两次！')
  $.done()
}

getawardbodyVal = bodys.split('#');

Object.keys(getawardbodyVal).forEach((item) => {
  if (getawardbodyVal[item]) {
    getawardbodyArr.push(getawardbodyVal[item])
  }
})


  dkdtokenbodyArr.push("params=M93wJuVCoY9aQ7GdIacn013uWxf7PLLHuq1u10YHE25LftIsYejXN5FxLrphWpjA");
  dkdtokenkeyArr.push("{\"Accept-Encoding\":\"br;q=1.0, gzip;q=0.9, deflate;q=0.8\",\"Accept\":\"*/*\",\"Connection\":\"keep-alive\",\"Content-Type\":\"application/x-www-form-urlencoded; charset=utf-8\",\"Host\":\"dkd-api.dysdk.com\",\"If-None-Match\":\"\\\"2d1b6530f8c77a2955db1e43cd238e44d917b6f2\\\"\",\"User-Agent\":\"duokandian/3.4.0 (com.duoyou.duokandian1; build:0; iOS 14.4.0) Alamofire/5.4.1\",\"Accept-Language\":\"zh-Hans-CN;q=1.0, en-CN;q=0.9, ar-CN;q=0.8, zh-Hant-CN;q=0.7\",\"headerinfo\":\"eyJ0b2tlbiI6Ijk1MDIyNGM5NGZmZTQ5MGU4NDc3OGI0NTgyMmY3NzJlIiwidXRkX2lkIjoiODdDQ0U2QzYtRkRGMC00QkUzLTgxOTgtODUwODg1OTZEQjI1IiwiZGV2aWNlX251bSI6IjEiLCJkZXZpY2VfdHlwZSI6ImlQaG9uZSA2cyBQbHVzIiwib3MiOiJpT1MiLCJsb25nIjoiIiAsImxhdCI6IiIsInJlc29sdXRpb24iOiI0MTQuMCo3MzYuMCIsImJvb3RfdGltZSI6IjIwMjEtMDQtMDcgMTM6MzI6MDYgKzAwMDAiLCJzeXN0ZW1fdmVyc2lvbiI6IjE0LjQiLCJzeXN0ZW1fbW9kZWwiOiJpUGhvbmUgNnMgUGx1cyIsImRldmljZV9icmFuZCI6IuaGqOaGqGlQaG9uZSIsImRrZF92ZXJzaW9uIjoiMy40LjAiLCJuZXR3b3JrIjoiV2lmaSIsInZlcnNpb25jb2RlIjoiMTQiLCJjaGFubmVsIjoiYXBwbGUiLCJkZXZpY2VfaWRzIjoie1wiNFwiOlwiMDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDAwMDAwMDAwXCJ9In0=\",\"Content-Length\":\"71\"}");
  //dkdcashurlArr.push($.getdata('dkdcashurl'));
  dkdcashkeyArr.push("{\"Accept\":\"application/json, text/plain, */*\",\"Origin\":\"https://dkd-api.dysdk.com\",\"Accept-Encoding\":\"gzip, deflate, br\",\"Content-Type\":\"application/json;charset=utf-8\",\"Connection\":\"keep-alive\",\"Host\":\"dkd-api.dysdk.com\",\"User-Agent\":\"Mozilla/5.0 (iPhone; CPU iPhone OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148\",\"Referer\":\"https://dkd-api.dysdk.com/index.html\",\"Accept-Language\":\"zh-cn\",\"Content-Length\":\"53\",\"headerInfo\":\"eyJ0b2tlbiI6Ijk1MDIyNGM5NGZmZTQ5MGU4NDc3OGI0NTgyMmY3NzJlIiwidXRkX2lkIjoiODdDQ0U2QzYtRkRGMC00QkUzLTgxOTgtODUwODg1OTZEQjI1IiwiZGV2aWNlX251bSI6IjEiLCJkZXZpY2VfdHlwZSI6ImlQaG9uZSA2cyBQbHVzIiwib3MiOiJpT1MiLCJsb25nIjoiIiAsImxhdCI6IiIsInJlc29sdXRpb24iOiI0MTQuMCo3MzYuMCIsImJvb3RfdGltZSI6IjIwMjEtMDQtMDcgMTc6MjM6MTkgKzAwMDAiLCJzeXN0ZW1fdmVyc2lvbiI6IjE0LjQiLCJzeXN0ZW1fbW9kZWwiOiJpUGhvbmUgNnMgUGx1cyIsImRldmljZV9icmFuZCI6IuaGqOaGqGlQaG9uZSIsImRrZF92ZXJzaW9uIjoiMy40LjAiLCJuZXR3b3JrIjoiV2lmaSIsInZlcnNpb25jb2RlIjoiMTQiLCJjaGFubmVsIjoiYXBwbGUiLCJkZXZpY2VfaWRzIjoie1wiNFwiOlwiMDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDAwMDAwMDAwXCJ9In0\"}");
  //dkdlottourlArr.push($.getdata('dkdlottourl'));
  dkdlottokeyArr.push("{\"Accept\":\"application/json, text/plain, */*\",\"Origin\":\"https://dkd-api.dysdk.com\",\"Accept-Encoding\":\"gzip, deflate, br\",\"Content-Type\":\"application/json;charset=utf-8\",\"Connection\":\"keep-alive\",\"Host\":\"dkd-api.dysdk.com\",\"User-Agent\":\"Mozilla/5.0 (iPhone; CPU iPhone OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148\",\"Referer\":\"https://dkd-api.dysdk.com/index.html\",\"Accept-Language\":\"zh-cn\",\"Content-Length\":\"2\",\"headerInfo\":\"eyJ0b2tlbiI6Ijk1MDIyNGM5NGZmZTQ5MGU4NDc3OGI0NTgyMmY3NzJlIiwidXRkX2lkIjoiODdDQ0U2QzYtRkRGMC00QkUzLTgxOTgtODUwODg1OTZEQjI1IiwiZGV2aWNlX251bSI6IjEiLCJkZXZpY2VfdHlwZSI6ImlQaG9uZSA2cyBQbHVzIiwib3MiOiJpT1MiLCJsb25nIjoiIiAsImxhdCI6IiIsInJlc29sdXRpb24iOiI0MTQuMCo3MzYuMCIsImJvb3RfdGltZSI6IjIwMjEtMDQtMDcgMTM6Mjg6NTggKzAwMDAiLCJzeXN0ZW1fdmVyc2lvbiI6IjE0LjQiLCJzeXN0ZW1fbW9kZWwiOiJpUGhvbmUgNnMgUGx1cyIsImRldmljZV9icmFuZCI6IuaGqOaGqGlQaG9uZSIsImRrZF92ZXJzaW9uIjoiMy40LjAiLCJuZXR3b3JrIjoiV2lmaSIsInZlcnNpb25jb2RlIjoiMTQiLCJjaGFubmVsIjoiYXBwbGUiLCJkZXZpY2VfaWRzIjoie1wiNFwiOlwiMDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDAwMDAwMDAwXCJ9In0\"}");


//////////////////////////////////////////////////////////////////

!(async () => {
  cc = (`${jsname}任务执行通知🔔`);
  if (!dkdtokenbodyArr[0]) {
    console.log($.name, '【提示】请先前往获取cookie📲')
    tz += `【提示】请先前往获取cookie📲\n`
    return;
  }
  dkdtokenbodyVal = dkdtokenbodyArr[0];
  dkdtokenkeyVal = dkdtokenkeyArr[0];
  //dkdcashurlVal = dkdcashurlArr[0];
  dkdcashkeyVal = dkdcashkeyArr[0];
  //dkdlottourlVal = dkdlottourlArr[0];
  dkdlottokeyVal = dkdlottokeyArr[0];

  console.log(`\n💗💕 开始执行脚本任务 💕💗\n`)

  console.log(`\n✅ 刷视频任务\n`)
  await dkdvideoapp() //刷视频
  await dkdxx() //用户信息
  await showmsg2();

})()
.catch((e) => $.logErr(e))
  .finally(() => $.done())
//////////////////////////////////////////////////////////////////
//通知1
function showmsg1() {
  if (notifyInterval != 1) {
    console.log(cc + '\n' + tz);
  }

  if (notifyInterval == 1) {
    $.msg(cc, '\n', tz);
  }
}
//通知2
async function showmsg2() {
  if (notifyInterval == 1) {
    if ($.isNode()) {
      if ((hour == 8 && minute <= 30) || (hour == 12 && minute <= 30) || (hour == 23 && minute <= 30)) {
        await notify.sendNotify($.name, tz)
      }
    } else {
      if ((hour == 8 && minute <= 30) || (hour == 12 && minute <= 30) || (hour == 23 && minute <= 30)) {
        $.msg(cc, '', tz);
      }
    }
  } else if (notifyInterval == 0) {
    console.log(cc + '' + tz);
  }
}


//////////////////////////////////////////////////////////////////
//提现
async function dkdcash() {
  if (!dkdcashkeyArr[0]) {
    $.log('⛔️请先提现一次,获取提现Cookie!')
    $.log(`👩‍⚕️提现策略:\n账户金额大于50元,优先提现50元,否则提现${myselfcash}元。`)
    tz += `⛔️请先提现一次,获取提现Cookie!\n`
    return;
  }

  await dkdxx2()
  if (mycash >= 50) {
    await dkdtx50()
  } else {
    await dkdtx01()
  }
}
//刷视频模块
async function dkdvideoapp() {
  let i=0;
  $.log(`【视频总数】:共有${getawardbodyArr.length}个`)
  $.index = 0;
  while(true){
  console.log(`//////////////////////////////////////////////////////////////////`)
  console.log(`+检查【刷视频】任务状态+\n`)
  await $.wait(2000)
  await redcountdown();
  if (videostatus == 2 || videostatus == 4) {
    if (getawardbodyArr[i]) {
      getawardbody = getawardbodyArr[i];
      $.index = $.index + 1;
      console.log(`\n+执行【观看视频】任务-第${$.begin}个+\n`)
      await $.wait(2000)
      console.log(`📠正在打印本次运行结果...\n`)
      await AutoRead();
      i=i+1;
      if (i==getawardbodyArr.length) {
        console.log(`//////////////////////////////////////////////////////////////////`)
        console.log(`视频任务结束\n`)
        break;
      }
      console.log(`等待30s\n`)
      await $.wait(30000)
      
   
    }else{break;}
    
  
  } else if (videostatus == 3) {
    console.log(`\n+执行【观看广告】任务+\n`)
    await redgetaward();
    console.log(`等待30s\n`)
    await $.wait(30000)
  }
    else{break;}
 }
}
//日常奖励pro模块
async function dkdpro() {
  if (prolist0 == 0) {
    $.log(`【20%进度红包】:未达成`);
  } else if (prolist0 == 2) {
    $.log(`【20%进度红包】:已达成🎉`);
  } else if (prolist0 == 1) {
    await redpro1()
  }

  if (prolist1 == 0) {
    $.log(`【50%进度红包】:未达成`);
  } else if (prolist1 == 2) {
    $.log(`【50%进度红包】:已达成🎉`);
  } else if (prolist1 == 1) {
    await redpro2()
  }

  if (prolist2 == 0) {
    $.log(`【80%进度红包】:未达成`);
  } else if (prolist2 == 2) {
    $.log(`【80%进度红包】:已达成🎉`);
  } else if (prolist2 == 1) {
    await redpro3()
  }

  if (prolist3 == 0) {
    $.log(`【100%进度红包】:未达成`);
  } else if (prolist3 == 2) {
    $.log(`【100%进度红包】:已达成🎉`);
  } else if (prolist3 == 1) {
    await redpro4()
  }
}
//日常完成奖励模块
async function dkdnomal() {

  if (tasklist0 == 0 || tasklist0 == 1) {
    await dkdsc() //视频领金币
  } else {
    console.log(`【视频领金币】:已完成🎉`)
  }
  if (tasklist1 == 0 || tasklist1 == 1) {
    await dkdgg() //广告视频
  } else {
    console.log(`【广告领金币】:已完成🎉`)
  }
  if (tasklist2 == 0 || tasklist2 == 1) {
    await dkdxs() //小说
  } else {
    console.log(`【小说赚金币】:已完成🎉`)
  }
  if (tasklist3 == 0 || tasklist3 == 1) {
    await dkdfx() //分享
  } else {
    console.log(`【分享赚金币】:已完成🎉`)
  }
  if (tasklist4 == 0 || tasklist4 == 1) {
    await dkdgame() //高额游戏
  } else {
    console.log(`【高额游戏赚】:已完成🎉`)
  }

}
//签到模块
async function todaysign() {
  if (todaycode == 0) {
    await dkdqd() //多看点签到
  } else {
    $.log(`【今日签到】:今天已签到✔️`);
  }
}

//////////////////////////////////////////////////////////////////
//任务状态确认
async function dayindex() {
  return new Promise((resolve) => {
    let url = {
      url: `https://dkd-api.dysdk.com/task/index_days`,
      body: `${dkdtokenbodyVal}`,
      headers: JSON.parse(dkdtokenkeyVal),
    };
    $.post(url, async (err, resp, data) => {
      try {
        if (err) {
          console.log("⛔️API查询请求失败❌ ‼️‼️");
          console.log(JSON.stringify(err));
          $.logErr(err);
        } else {
          if (safeGet(data)) {
            if (logs == 1) $.log(data)
            data = JSON.parse(data);
            tasklist0 = data.data.list[0].status
            tasklist1 = data.data.list[1].status
            tasklist2 = data.data.list[2].status
            tasklist3 = data.data.list[3].status
            tasklist4 = data.data.list[4].status
            prolist0 = data.data.Task_comp.data[0].status
            prolist1 = data.data.Task_comp.data[1].status
            prolist2 = data.data.Task_comp.data[2].status
            prolist3 = data.data.Task_comp.data[3].status
            $.log(`🔸阶段性红包完成度:${data.data.Task_comp.pro}%`);
            $.log(`🔸视频领金币:${data.data.list[0].task_go}`);
            $.log(`🔸广告领金币:${data.data.list[1].task_go}`);
            $.log(`🔸小说赚金币:${data.data.list[2].task_go}`);
            $.log(`🔸分享赚金币:${data.data.list[3].task_go}`);
            $.log(`🔸高额游戏赚:${data.data.list[4].task_go}`);
          }
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve();
      }
    });
  });
}
//宝箱状态开启
async function boxinit() {
  return new Promise((resolve) => {
    let url = {
      url: `https://dkd-api.dysdk.com/red/box_init`,
      body: `${dkdtokenbodyVal}`,
      headers: JSON.parse(dkdtokenkeyVal),
    };
    $.post(url, async (err, resp, data) => {
      try {
        if (err) {
          console.log("⛔️API查询请求失败❌ ‼️‼️");
          console.log(JSON.stringify(err));
          $.logErr(err);
        } else {
          if (safeGet(data)) {
            if (logs == 1) $.log(data)
            data = JSON.parse(data);
          }
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve();
      }
    });
  });
}
//小说时段状态开启
async function extratime() {
  return new Promise((resolve) => {
    let url = {
      url: `https://dkd-api.dysdk.com/video/extra_time`,
      body: `${dkdtokenbodyVal}`,
      headers: JSON.parse(dkdtokenkeyVal),
    };
    $.post(url, async (err, resp, data) => {
      try {
        if (err) {
          console.log("⛔️API查询请求失败❌ ‼️‼️");
          console.log(JSON.stringify(err));
          $.logErr(err);
        } else {
          if (safeGet(data)) {
            if (logs == 1) $.log(data)
            data = JSON.parse(data);
          }
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve();
      }
    });
  });
}
//签到状态
async function signinit() {
  return new Promise((resolve) => {
    let url = {
      url: `https://dkd-api.dysdk.com/task/index_sign`,
      body: `${dkdtokenbodyVal}`,
      headers: JSON.parse(dkdtokenkeyVal),
    };
    $.post(url, async (err, resp, data) => {
      try {
        if (err) {
          console.log("⛔️API查询请求失败❌ ‼️‼️");
          console.log(JSON.stringify(err));
          $.logErr(err);
        } else {
          if (safeGet(data)) {
            if (logs == 1) $.log(data)
            data = JSON.parse(data);
            day1code = data.data.sign_list.day1.status
            day2code = data.data.sign_list.day2.status
            day3code = data.data.sign_list.day3.status
            day4code = data.data.sign_list.day4.status
            day5code = data.data.sign_list.day5.status
            day6code = data.data.sign_list.day6.status
            day7code = data.data.sign_list.day7.status
            todaycode = data.data.sign_status
            if (day1code == 1) {
              $.log(`🔸签到day1:已签到✔️`);
            } else {
              $.log(`🔸签到day1:未签到✖️`);
            }
            if (day2code == 1) {
              $.log(`🔸签到day2:已签到✔️`);
            } else {
              $.log(`🔸签到day2:未签到✖️`);
            }
            if (day3code == 1) {
              $.log(`🔸签到day3:已签到✔️`);
            } else {
              $.log(`🔸签到day3:未签到✖️`);
            }
            if (day4code == 1) {
              $.log(`🔸签到day4:已签到✔️`);
            } else {
              $.log(`🔸签到day4:未签到✖️`);
            }
            if (day5code == 1) {
              $.log(`🔸签到day5:已签到✔️`);
            } else {
              $.log(`🔸签到day5:未签到✖️`);
            }
            if (day6code == 1) {
              $.log(`🔸签到day6:已签到✔️`);
            } else {
              $.log(`🔸签到day6:未签到✖️`);
            }
            if (day7code == 1) {
              $.log(`🔸签到day7:已签到✔️`);
            } else {
              $.log(`🔸签到day7:未签到✖️`);
            }

          }
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve();
      }
    });
  });
}
//多看点分享
function dkdfx(timeout = 0) {
  return new Promise((resolve) => {
    let url = {
      url: 'https://dkd-api.dysdk.com/task/get_award',
      headers: JSON.parse(dkdtokenkeyVal),
      body: `id=52&${dkdtokenbodyVal}`,
    }
    $.post(url, async (err, resp, data) => {
      try {
        const result = JSON.parse(data)
        if (result.status_code == 200) {
          $.log(`【分享任务】:获取${result.data.award}金币🏅`);
        }
        if (result.status_code == 10020) {
          $.log(`【分享任务】:${result.message}`);
        }
      } catch (e) {
        //$.logErr(e, resp);
      } finally {
        resolve()
      }
    }, timeout)
  })
}
//多看点小说
function dkdxs(timeout = 0) {
  return new Promise((resolve) => {
    let url = {
      url: 'https://dkd-api.dysdk.com/task/get_award',
      headers: JSON.parse(dkdtokenkeyVal),
      body: `id=51&${dkdtokenbodyVal}`,
    }
    $.post(url, async (err, resp, data) => {
      try {
        const result = JSON.parse(data)
        if (result.status_code == 200) {
          $.log(`【小说赚】:获取${result.data.award}金币🏅`);
        }
        if (result.status_code == 10020) {
          $.log(`【小说赚】:${result.message}`);
        }
      } catch (e) {
        //$.logErr(e, resp);
      } finally {
        resolve()
      }
    }, timeout)
  })
}
//小说时段奖励
function dkdsdjl(timeout = 0) {
  return new Promise((resolve) => {
    let url = {
      url: 'https://dkd-api.dysdk.com/video/extra_get',
      headers: JSON.parse(dkdtokenkeyVal),
      body: `${dkdtokenbodyVal}`,
    }
    $.post(url, async (err, resp, data) => {
      try {
        const result = JSON.parse(data)
        if (result.status_code == 200 && result.data.status == -1) {
          $.log(`【小说时段奖励】:${result.data.msg}`);
        } else if (result.status_code == 200 && result.data.award >= 0) {
          $.log(`【小说时段奖励】:获取${result.data.award}金币🏅`);
          await dkdsdjl2()
        } else if (result.status_code == 10020) {
          $.log(`【小说时段奖励】:${result.message}`);
        }

      } catch (e) {
        //$.logErr(e, resp);
      } finally {
        resolve()
      }
    }, timeout)
  })
}
//多看点小说时段奖励翻倍
function dkdsdjl2(timeout = 0) {
  return new Promise((resolve) => {
    let url = {
      url: 'https://dkd-api.dysdk.com/video/extra_again',
      headers: JSON.parse(dkdtokenkeyVal),
      body: `${dkdtokenbodyVal}`,
    }
    $.post(url, async (err, resp, data) => {
      try {
        const result = JSON.parse(data)
        if (result.status_code == 200 && result.data.status == -1) {
          $.log(`【时段奖励翻倍】:${result.data.msg}`);
        } else if (result.status_code == 200 && result.data.award >= 0) {
          $.log(`【时段奖励翻倍】:获取${result.data.award}金币🏅`);
        } else if (result.status_code == 10020) {
          $.log(`【时段奖励翻倍】:${result.message}`);
        }

      } catch (e) {
        //$.logErr(e, resp);
      } finally {
        resolve()
      }
    }, timeout)
  })
}
//高额游戏赚
async function dkdgame() {
  return new Promise((resolve) => {
    let url = {
      url: `https://dkd-api.dysdk.com/task/get_award`,
      body: `id=55&${dkdtokenbodyVal}`,
      headers: JSON.parse(dkdtokenkeyVal),
    };
    $.post(url, async (err, resp, data) => {
      try {
        if (err) {
          console.log("⛔️API查询请求失败❌ ‼️‼️");
          console.log(JSON.stringify(err));
          $.logErr(err);
        } else {
          if (safeGet(data)) {
            if (logs == 1) $.log(data)
            data = JSON.parse(data);
            if (data.status_code == 200) {
              $.log(`【高额游戏赚】:获取${data.data.award}金币🏅`);
            } else {
              $.log(`【高额游戏赚】:${data.message}`);
            }
          }
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve();
      }
    });
  });
}

//////////////////////////////////////////////////////////////////

//阶段性奖励
async function redpro1() {
  return new Promise((resolve) => {
    let url = {
      url: `https://dkd-api.dysdk.com/task/get_award_pro`,
      body: `step=1&${dkdtokenbodyVal}`,
      headers: JSON.parse(dkdtokenkeyVal),
    };
    $.post(url, async (err, resp, data) => {
      try {
        if (err) {
          console.log("⛔️API查询请求失败❌ ‼️‼️");
          console.log(JSON.stringify(err));
          $.logErr(err);
        } else {
          if (safeGet(data)) {
            if (logs == 1) $.log(data)
            data = JSON.parse(data);
            getawardtime = data.data.red_time
            if (data.status_code == 10020) {
              $.log(`【20%进度红包】:${data.message}`);
            } else {
              $.log(`【20%进度红包】:获取${data.data.award}个金币🏅`);
              tz += `【20%进度红包】:获取${data.data.award}个金币🏅\n`
            }
          }
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve();
      }
    });
  });
}
async function redpro2() {
  return new Promise((resolve) => {
    let url = {
      url: `https://dkd-api.dysdk.com/task/get_award_pro`,
      body: `step=2&${dkdtokenbodyVal}`,
      headers: JSON.parse(dkdtokenkeyVal),
    };
    $.post(url, async (err, resp, data) => {
      try {
        if (err) {
          console.log("⛔️API查询请求失败❌ ‼️‼️");
          console.log(JSON.stringify(err));
          $.logErr(err);
        } else {
          if (safeGet(data)) {
            if (logs == 1) $.log(data)
            data = JSON.parse(data);
            getawardtime = data.data.red_time
            if (data.status_code == 10020) {
              $.log(`【50%进度红包】:${data.message}`);
            } else {
              $.log(`【50%进度红包】:获取${data.data.award}个金币🏅`);
              tz += `【50%进度红包】:获取${data.data.award}个金币🏅\n`
            }
          }
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve();
      }
    });
  });
}
async function redpro3() {
  return new Promise((resolve) => {
    let url = {
      url: `https://dkd-api.dysdk.com/task/get_award_pro`,
      body: `step=3&${dkdtokenbodyVal}`,
      headers: JSON.parse(dkdtokenkeyVal),
    };
    $.post(url, async (err, resp, data) => {
      try {
        if (err) {
          console.log("⛔️API查询请求失败❌ ‼️‼️");
          console.log(JSON.stringify(err));
          $.logErr(err);
        } else {
          if (safeGet(data)) {
            if (logs == 1) $.log(data)
            data = JSON.parse(data);
            getawardtime = data.data.red_time
            if (data.status_code == 10020) {
              $.log(`【80%进度红包】:${data.message}`);
            } else {
              $.log(`【80%进度红包】:获取${data.data.award}个金币🏅`);
              tz += `【80%进度红包】:获取${data.data.award}个金币🏅\n`
            }
          }
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve();
      }
    });
  });
}
async function redpro4() {
  return new Promise((resolve) => {
    let url = {
      url: `https://dkd-api.dysdk.com/task/get_award_pro`,
      body: `step=4&${dkdtokenbodyVal}`,
      headers: JSON.parse(dkdtokenkeyVal),
    };
    $.post(url, async (err, resp, data) => {
      try {
        if (err) {
          console.log("⛔️API查询请求失败❌ ‼️‼️");
          console.log(JSON.stringify(err));
          $.logErr(err);
        } else {
          if (safeGet(data)) {
            if (logs == 1) $.log(data)
            data = JSON.parse(data);
            getawardtime = data.data.red_time
            if (data.status_code == 10020) {
              $.log(`【100%进度红包】:${data.message}`);
            } else {
              $.log(`【100%进度红包】:获取${data.data.award}个金币🏅`);
              tz += `【100%进度红包】:获取${data.data.award}个金币🏅\n`
            }
          }
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve();
      }
    });
  });
}

//AutoRead
function AutoRead() {
  return new Promise((resolve, reject) => {
    let url = {
      url: `https://dkd-api.dysdk.com/android_video/getaward`,
      headers: JSON.parse(dkdtokenkeyVal),
      body: getawardbody
    };
    $.post(url, async (error, response, data) => {
      $.begin = $.begin + 1;
      let res = $.begin % getawardbodyArr.length
      $.setdata(res + "", 'getawardbody_index');
      if (logs == 1) $.log(data)
      data = JSON.parse(data);
      if (data.status_code == 10020) {
        $.log(`【本次视频】:${data.message}`);
      } else {
        $.log(`【本次视频】:获取${data.data.award}个金币🏅\n`);
      }
      resolve()
    })
  })
}
//redcountdown
async function redcountdown() {
  return new Promise((resolve) => {
    let url = {
      url: `https://dkd-api.dysdk.com/video/red_countdown`,
      body: dkdtokenbodyVal,
      headers: JSON.parse(dkdtokenkeyVal),
    };
    $.post(url, async (err, resp, data) => {
      try {
        if (err) {
          console.log("⛔️API查询请求失败❌ ‼️‼️");
          console.log(JSON.stringify(err));
          $.logErr(err);
        } else {
          if (safeGet(data)) {
            if (logs == 1) $.log(data)
            data = JSON.parse(data);
            videostatus = data.data.status
            if (videostatus == 2 || videostatus == 4) {
              console.log("【目前状态】:视频📽");
            } else if (videostatus == 3) {
              console.log("【目前状态】:红包🧧");
            }
          }
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve();
      }
    });
  });
}
//red_getaward
async function redgetaward() {
  return new Promise((resolve) => {
    let url = {
      url: `https://dkd-api.dysdk.com/video/red_getaward`,
      body: `adType=2&${dkdtokenbodyVal}`,
      headers: JSON.parse(dkdtokenkeyVal),
    };
    $.post(url, async (err, resp, data) => {
      try {
        if (err) {
          console.log("⛔️API查询请求失败❌ ‼️‼️");
          console.log(JSON.stringify(err));
          $.logErr(err);
        } else {
          if (safeGet(data)) {
            if (logs == 1) $.log(data)
            data = JSON.parse(data);
            getawardtime = data.data.red_time
            if (data.status_code == 10020) {
              $.log(`【惊喜红包🧧】:${data.message}`);
              tz += `【惊喜红包🧧】:${data.message}\n`
            } else {
              $.log(`【惊喜红包🧧】:获取${data.data.award}个金币🏅\n`);
              tz += `【惊喜红包🧧】:获取${data.data.award}个金币🏅\n`
            }
          }
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve();
      }
    });
  });
}

////////////////////////////////////////////////////////////////////////
//签到
function dkdqd(timeout = 0) {
  return new Promise((resolve) => {
    setTimeout(() => {
      let url = {
        url: 'https://dkd-api.dysdk.com/task/sign',
        headers: JSON.parse(dkdtokenkeyVal),
        body: `adType=2&${dkdtokenbodyVal}`,
      }
      $.post(url, async (err, resp, data) => {
        try {
          const result = JSON.parse(data)
          if (result.status_code == 200) {
            $.log(`【今日签到】:获取${result.data.sign_award}金币🏅`);
          }
          if (result.status_code == 10020) {
            $.log(`【今日签到】:${result.message}`);
          }
        } catch (e) {
          //$.logErr(e, resp);
        } finally {
          resolve()
        }
      })
    }, timeout)
  })
}
//视频领金币
function dkdsc(timeout = 0) {
  return new Promise((resolve) => {
    let url = {
      url: 'https://dkd-api.dysdk.com/task/get_ad_award',
      headers: JSON.parse(dkdtokenkeyVal),
      body: `adType=2&${dkdtokenbodyVal}&type=1&overLimit`,
    }
    $.post(url, async (err, resp, data) => {
      try {
        const result = JSON.parse(data)
        if (result.status_code == 200) {
          $.log(`【视频领金币】:获取${result.data.award}金币🏅`);
        }
        if (result.status_code == 10020) {
          $.log(`【视频领金币】:${result.message}`);
        }
      } catch (e) {
        //$.logErr(e, resp);
      } finally {
        resolve()
      }
    }, timeout)
  })
}
//广告视频
function dkdgg(timeout = 0) {
  return new Promise((resolve) => {
    let url = {
      url: 'https://dkd-api.dysdk.com/task/get_ad_award',
      headers: JSON.parse(dkdtokenkeyVal),
      body: `adType=2&${dkdtokenbodyVal}&type=2`,
    }
    $.post(url, async (err, resp, data) => {
      try {
        const result = JSON.parse(data)
        if (result.status_code == 200) {
          $.log(`【广告领金币】:获取${result.data.award}金币🏅`);
        }
        if (result.status_code == 10020) {
          $.log(`【广告领金币】:${result.message}🚫`);
        }
      } catch (e) {
        //$.logErr(e, resp);
      } finally {
        resolve()
      }
    }, timeout)
  })
}
//视频宝箱
function dkdbx(timeout = 0) {
  return new Promise((resolve) => {
    let url = {
      url: 'https://dkd-api.dysdk.com/red/box_award',
      headers: JSON.parse(dkdtokenkeyVal),
      body: `${dkdtokenbodyVal}`,
    }
    $.post(url, async (err, resp, data) => {
      try {
        const result = JSON.parse(data)
        if (result.status_code == 200) {
          $.log(`【视频宝箱】:获取${result.data.award}金币🏅`);
          await $.wait(2000)
          await dkdbxfb() //视频宝箱翻倍
        }
        if (result.status_code == 10020) {
          $.log(`【视频宝箱】:${result.message}`);
        }
      } catch (e) {
        //$.logErr(e, resp);
      } finally {
        resolve()
      }
    }, timeout)
  })
}
//视频宝箱翻倍
function dkdbxfb(timeout = 0) {
  return new Promise((resolve) => {
    let url = {
      url: 'https://dkd-api.dysdk.com/red/box_extra',
      headers: JSON.parse(dkdtokenkeyVal),
      body: `adType=2&${dkdtokenbodyVal}`,
    }
    $.post(url, async (err, resp, data) => {
      try {
        const result = JSON.parse(data)
        if (result.status_code == 200) {
          $.log(`【视频宝箱翻倍】:获取${result.data.award}金币🏅`);
        }
        if (result.status_code == 10020) {
          $.log(`【视频宝箱翻倍】:${result.message}🚫`);
        }
      } catch (e) {
        //$.logErr(e, resp);
      } finally {
        resolve()
      }
    }, timeout)
  })
}
//转盘
function dkdsxzp(timeout = 0) {
  return new Promise((resolve) => {
    let url = {
      url: `https://dkd-api.dysdk.com/lotto/index?${dkdtokenbodyVal}`,
      headers: JSON.parse(dkdlottokeyVal),
    }
    $.post(url, async (err, resp, data) => {
      try {
        if (logs == 1) $.log(data)
        const result = JSON.parse(data)

        if (result.status_code == 200) {
          console.log(`【转盘次数】:剩余机会为${result.data.times}次`)
          console.log(`【转盘碎片】:💠${result.data.chip}个`)
        }
      } catch (e) {
        //$.logErr(e, resp);
      } finally {
        resolve()
      }
    }, timeout)
  })
}
//转盘抽奖
function dkdcj(timeout = 0) {
  return new Promise((resolve) => {
    let url = {
      url: 'https://dkd-api.dysdk.com/lotto/start',
      headers: JSON.parse(dkdtokenkeyVal),
      body: `adType=2&${dkdtokenbodyVal}`,
    }
    $.post(url, async (err, resp, data) => {
      try {
        const result = JSON.parse(data)
        if (logs == 1) $.log(data)
        if (result.status_code == 200) {
          $.log(`【转盘抽奖】:获取${result.data.name}🏅`);
        }
        if (result.status_code == 10020) {
          $.log(`【转盘抽奖】:明天再来！`);
        }
      } catch (e) {
        //$.logErr(e, resp);
      } finally {
        resolve()
      }
    }, timeout)
  })
}
//多看点提现
async function dkdtx50() {
  return new Promise((resolve) => {
    let url = {
      url: `https://dkd-api.dysdk.com/money/withdraw_do?${dkdtokenbodyVal}`,
      body: `{"money":50,"type":2,"withdraw_card":null,"program":8,"is_special":2}`,
      headers: JSON.parse(dkdcashkeyVal),
    };
    $.post(url, async (err, resp, data) => {
      try {
        if (err) {
          console.log("⛔️API查询请求失败❌ ‼️‼️");
          console.log(JSON.stringify(err));
          $.logErr(err);
        } else {
          if (safeGet(data)) {
            if (logs == 1) $.log(data)
            data = JSON.parse(data);
            if (data.status_code == 200) {
              $.log(`【自动提现50元】:成功提现🎉`);
            } else if (data.status_code == 10020) {
              $.log(`【自动提现50元】:${data.message}🚫`);
            }
          }
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve();
      }
    });
  });
}
async function dkdtx01() {
  return new Promise((resolve) => {
    let url = {
      url: `https://dkd-api.dysdk.com/money/withdraw_do?${dkdtokenbodyVal}`,
      body: `{"money":${myselfcash},"type":2,"withdraw_card":null,"program":8,"is_special":2}`,
      headers: JSON.parse(dkdcashkeyVal),
    };
    $.post(url, async (err, resp, data) => {
      try {
        if (err) {
          console.log("⛔️API查询请求失败❌ ‼️‼️");
          console.log(JSON.stringify(err));
          $.logErr(err);
        } else {
          if (safeGet(data)) {
            if (logs == 1) $.log(data)
            data = JSON.parse(data);
            if (data.status_code == 200) {
              $.log(`【自动提现${myselfcash}元】:成功提现🎉`);
            } else if (data.status_code == 10020) {
              $.log(`【自动提现${myselfcash}元】:${data.message}🚫`);
            }
          }
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve();
      }
    });
  });
}
//多看点用户信息
function dkdxx(timeout = 0) {
  return new Promise((resolve) => {
    let url = {
      url: 'https://dkd-api.dysdk.com/user/index',
      headers: JSON.parse(dkdtokenkeyVal),
      body: `${dkdtokenbodyVal}`,
    }
    $.post(url, async (err, resp, data) => {
      try {
        const result = JSON.parse(data)
        if (result.status_code == 200) {
          $.log("", '运行完毕！打印用户清单...', "")
          $.log(`【用户名】:${result.data.nickname}`);
          $.log(`【总金币】:${result.data.gold}金币🏅`);
          $.log(`【当前余额】:¥${result.data.cash}元`);
          $.log(`【今日金币】:${result.data.today_gold}金币🏅`);
          tz += `【用户名】:${result.data.nickname}\n`
          tz += `【总金币】:${result.data.gold}金币🏅\n`
          tz += `【当前余额】:¥${result.data.cash}元\n`
          tz += `【今日金币】:${result.data.today_gold}金币🏅\n`
        }
        if (result.status_code == 10020) {
          $.log($.name, "", '运行完毕,用户信息获取失败🚫 ' + result.message)
          tz += `【用户信息】:失败🚫\n`
        }
      } catch (e) {
        //$.logErr(e, resp);
      } finally {
        resolve()
      }
    }, timeout)
  })
}

function dkdxx2(timeout = 0) {
  return new Promise((resolve) => {
    let url = {
      url: 'https://dkd-api.dysdk.com/user/index',
      headers: JSON.parse(dkdtokenkeyVal),
      body: `${dkdtokenbodyVal}`,
    }
    $.post(url, async (err, resp, data) => {
      try {
        data = JSON.parse(data)
        mycash = data.data.cash
      } catch (e) {
        //$.logErr(e, resp);
      } finally {
        resolve()
      }
    }, timeout)
  })
}
////////////////////////////////////////////////////////////////////

//解码URIcode
function URIcodetranslate(code) {
  return decodeURIComponent(code);
}
//毫秒时间戳改日期 2021.01.08 05:30:13
function time(time) {
  var date = new Date(time + 8 * 3600 * 1000);
  return date.toJSON().substr(0, 19).replace('T', ' ').replace(/-/g, '.');
}
//安全获取
function safeGet(data) {
  try {
    if (typeof JSON.parse(data) == "object") {
      return true;
    }
  } catch (e) {
    console.log(e);
    console.log(`⛔️服务器访问数据为空，请检查自身设备网络情况`);
    return false;
  }
}
//毫秒时间戳转时间 20200108
function formatDateTime(inputTime) {
  var date = new Date(inputTime);
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? ('0' + m) : m;
  var d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  var h = date.getHours();
  h = h < 10 ? ('0' + h) : h;
  var minute = date.getMinutes();
  var second = date.getSeconds();
  minute = minute < 10 ? ('0' + minute) : minute;
  second = second < 10 ? ('0' + second) : second;
  return y + m + d;
};

function Randomtime(mintime, maxtime) {
  return Math.round(Math.random() * (maxtime - mintime)) + mintime;
}

function Env(t, e) {
  class s {
    constructor(t) {
      this.env = t
    }
    send(t, e = "GET") {
      t = "string" == typeof t ? {
        url: t
      } : t;
      let s = this.get;
      return "POST" === e && (s = this.post), new Promise((e, i) => {
        s.call(this, t, (t, s, r) => {
          t ? i(t) : e(s)
        })
      })
    }
    get(t) {
      return this.send.call(this.env, t)
    }
    post(t) {
      return this.send.call(this.env, t, "POST")
    }
  }
  return new class {
    constructor(t, e) {
      this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `\ud83d\udd14${this.name}, \u5f00\u59cb!`)
    }
    isNode() {
      return "undefined" != typeof module && !!module.exports
    }
    isQuanX() {
      return "undefined" != typeof $task
    }
    isSurge() {
      return "undefined" != typeof $httpClient && "undefined" == typeof $loon
    }
    isLoon() {
      return "undefined" != typeof $loon
    }
    toObj(t, e = null) {
      try {
        return JSON.parse(t)
      } catch {
        return e
      }
    }
    toStr(t, e = null) {
      try {
        return JSON.stringify(t)
      } catch {
        return e
      }
    }
    getjson(t, e) {
      let s = e;
      const i = this.getdata(t);
      if (i) try {
        s = JSON.parse(this.getdata(t))
      } catch {}
      return s
    }
    setjson(t, e) {
      try {
        return this.setdata(JSON.stringify(t), e)
      } catch {
        return !1
      }
    }
    getScript(t) {
      return new Promise(e => {
        this.get({
          url: t
        }, (t, s, i) => e(i))
      })
    }
    runScript(t, e) {
      return new Promise(s => {
        let i = this.getdata("@chavy_boxjs_userCfgs.httpapi");
        i = i ? i.replace(/\n/g, "").trim() : i;
        let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");
        r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r;
        const [o, h] = i.split("@"), a = {
          url: `http://${h}/v1/scripting/evaluate`,
          body: {
            script_text: t,
            mock_type: "cron",
            timeout: r
          },
          headers: {
            "X-Key": o,
            Accept: "*/*"
          }
        };
        this.post(a, (t, e, i) => s(i))
      }).catch(t => this.logErr(t))
    }
    loaddata() {
      if (!this.isNode()) return {}; {
        this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path");
        const t = this.path.resolve(this.dataFile),
          e = this.path.resolve(process.cwd(), this.dataFile),
          s = this.fs.existsSync(t),
          i = !s && this.fs.existsSync(e);
        if (!s && !i) return {}; {
          const i = s ? t : e;
          try {
            return JSON.parse(this.fs.readFileSync(i))
          } catch (t) {
            return {}
          }
        }
      }
    }
    writedata() {
      if (this.isNode()) {
        this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path");
        const t = this.path.resolve(this.dataFile),
          e = this.path.resolve(process.cwd(), this.dataFile),
          s = this.fs.existsSync(t),
          i = !s && this.fs.existsSync(e),
          r = JSON.stringify(this.data);
        s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r)
      }
    }
    lodash_get(t, e, s) {
      const i = e.replace(/\[(\d+)\]/g, ".$1").split(".");
      let r = t;
      for (const t of i)
        if (r = Object(r)[t], void 0 === r) return s;
      return r
    }
    lodash_set(t, e, s) {
      return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t)
    }
    getdata(t) {
      let e = this.getval(t);
      if (/^@/.test(t)) {
        const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : "";
        if (r) try {
          const t = JSON.parse(r);
          e = t ? this.lodash_get(t, i, "") : e
        } catch (t) {
          e = ""
        }
      }
      return e
    }
    setdata(t, e) {
      let s = !1;
      if (/^@/.test(e)) {
        const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}";
        try {
          const e = JSON.parse(h);
          this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i)
        } catch (e) {
          const o = {};
          this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i)
        }
      } else s = this.setval(t, e);
      return s
    }
    getval(t) {
      return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null
    }
    setval(t, e) {
      return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null
    }
    initGotEnv(t) {
      this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar))
    }
    get(t, e = (() => {})) {
      t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
        "X-Surge-Skip-Scripting": !1
      })), $httpClient.get(t, (t, s, i) => {
        !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i)
      })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
        hints: !1
      })), $task.fetch(t).then(t => {
        const {
          statusCode: s,
          statusCode: i,
          headers: r,
          body: o
        } = t;
        e(null, {
          status: s,
          statusCode: i,
          headers: r,
          body: o
        }, o)
      }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => {
        try {
          if (t.headers["set-cookie"]) {
            const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();
            this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar
          }
        } catch (t) {
          this.logErr(t)
        }
      }).then(t => {
        const {
          statusCode: s,
          statusCode: i,
          headers: r,
          body: o
        } = t;
        e(null, {
          status: s,
          statusCode: i,
          headers: r,
          body: o
        }, o)
      }, t => {
        const {
          message: s,
          response: i
        } = t;
        e(s, i, i && i.body)
      }))
    }
    post(t, e = (() => {})) {
      if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
        "X-Surge-Skip-Scripting": !1
      })), $httpClient.post(t, (t, s, i) => {
        !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i)
      });
      else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
        hints: !1
      })), $task.fetch(t).then(t => {
        const {
          statusCode: s,
          statusCode: i,
          headers: r,
          body: o
        } = t;
        e(null, {
          status: s,
          statusCode: i,
          headers: r,
          body: o
        }, o)
      }, t => e(t));
      else if (this.isNode()) {
        this.initGotEnv(t);
        const {
          url: s,
          ...i
        } = t;
        this.got.post(s, i).then(t => {
          const {
            statusCode: s,
            statusCode: i,
            headers: r,
            body: o
          } = t;
          e(null, {
            status: s,
            statusCode: i,
            headers: r,
            body: o
          }, o)
        }, t => {
          const {
            message: s,
            response: i
          } = t;
          e(s, i, i && i.body)
        })
      }
    }
    time(t) {
      let e = {
        "M+": (new Date).getMonth() + 1,
        "d+": (new Date).getDate(),
        "H+": (new Date).getHours(),
        "m+": (new Date).getMinutes(),
        "s+": (new Date).getSeconds(),
        "q+": Math.floor(((new Date).getMonth() + 3) / 3),
        S: (new Date).getMilliseconds()
      };
      /(y+)/.test(t) && (t = t.replace(RegExp.$1, ((new Date).getFullYear() + "").substr(4 - RegExp.$1.length)));
      for (let s in e) new RegExp("(" + s + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? e[s] : ("00" + e[s]).substr(("" + e[s]).length)));
      return t
    }
    msg(e = t, s = "", i = "", r) {
      const o = t => {
        if (!t) return t;
        if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? {
          "open-url": t
        } : this.isSurge() ? {
          url: t
        } : void 0;
        if ("object" == typeof t) {
          if (this.isLoon()) {
            let e = t.openUrl || t.url || t["open-url"],
              s = t.mediaUrl || t["media-url"];
            return {
              openUrl: e,
              mediaUrl: s
            }
          }
          if (this.isQuanX()) {
            let e = t["open-url"] || t.url || t.openUrl,
              s = t["media-url"] || t.mediaUrl;
            return {
              "open-url": e,
              "media-url": s
            }
          }
          if (this.isSurge()) {
            let e = t.url || t.openUrl || t["open-url"];
            return {
              url: e
            }
          }
        }
      };
      this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r)));
      let h = ["", "==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];
      h.push(e), s && h.push(s), i && h.push(i), console.log(h.join("\n")), this.logs = this.logs.concat(h)
    }
    log(...t) {
      t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator))
    }
    logErr(t, e) {
      const s = !this.isSurge() && !this.isQuanX() && !this.isLoon();
      s ? this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t.stack) : this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t)
    }
    wait(t) {
      return new Promise(e => setTimeout(e, t))
    }
    done(t = {}) {
      const e = (new Date).getTime(),
        s = (e - this.startTime) / 1e3;
      this.log("", `\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t)
    }
  }(t, e)
}
