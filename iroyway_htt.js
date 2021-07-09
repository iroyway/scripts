/*
[rewrite_local]
#慧头条

https://api.cashtoutiao.com/frontend/sign/record\SuserId=\w+&loginId=\w+&appVersion=1039&platform=1&versionName=4.3.0 url script-request-body https://raw.githubusercontent.com/iroyway/scripts/master/iroyway_htt.js
[MITM]
hostname = api.cashtoutiao.com



*/

const $ = new Env('慧头条');
let status;
status = (status = ($.getval("iroyway_httstatus") || "1")) > 1 ? `${status}` : ""; // 账号扩展字符
const iroyway_htturlArr = [], iroyway_htthdArr = [], iroyway_httcount = ''
let iroyway_htturl = $.getdata('iroyway_htturl')
let iroyway_htthd = $.getdata('iroyway_htthd')
let id = ""

!(async () => {
    if (typeof $request !== "undefined") {
        await iroyway_httck();

    } else {
        iroyway_htturlArr.push($.getdata('iroyway_htturl'))
        iroyway_htthdArr.push($.getdata('iroyway_htthd'))
        let iroyway_httcount = ($.getval('iroyway_httcount') || '1');
        for (let i = 2; i <= iroyway_httcount; i++) {
            iroyway_htturlArr.push($.getdata(`iroyway_htturl${i}`))
            iroyway_htthdArr.push($.getdata(`iroyway_htthd${i}`))
        }
        console.log(`------------- 共${iroyway_htthdArr.length}个账号-------------\n`)
        for (let i = 0; i < iroyway_htthdArr.length; i++) {
            if (iroyway_htthdArr[i]) {

                iroyway_htturl = iroyway_htturlArr[i];
                iroyway_htthd = iroyway_htthdArr[i];
                $.index = i + 1;
                console.log(`\n开始【慧头条${$.index}】`)
                await quantijs(); //全体加速
                await $.wait(1000);

            }
        }
    }

})()
    .catch((e) => $.logErr(e))
    .finally(() => $.done())




function iroyway_httck() {
    if ($request.url.indexOf("sign/record?") > -1) {
        const iroyway_htturl = $request.url;
        id = iroyway_htturl.match(/userId=(\S+)/&/loginId=(\S+)/);
        $.log(id);
        if (iroyway_htturl) $.setdata(iroyway_htturl, `iroyway_htturl${status}`);
        $.log(iroyway_htturl);
        const iroyway_htthd = JSON.stringify($request.headers);
        if (iroyway_htthd) $.setdata(iroyway_htthd, `iroyway_htthd${status}`);
        $.log(iroyway_htthd);
        $.msg($.name, "", '惠头条' + `${status}` + '数据获取成功！');
    }
}
