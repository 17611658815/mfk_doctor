//app.js
const Api = require('API/API.js');
App({
    recorderManager(){
        return wx.getRecorderManager()
    },
    innerAudioContext(){
        return wx.createInnerAudioContext()
    },
    loading: function() {
        wx.showToast({
            mask:true,
            title: '加载中',
            icon: 'loading',
            duration: 30000
        })
    },
    globalData: {
        userid:'',
        firstGlance: 0, //用户第一次浏览某页
        toastFlag: false,
        listShowModule: true,
        appname: '民福康医生',
        userInfo: {},
        max_callback: 3,
        mfk_doctor_id: 0,
        apply_id: 0,
        login: false,
      listShowModule: true,
        appid: '7', //填写微信小程序appid  
        ip: 'https://mfkapi.39yst.com/app/api/record_app2.php'
    },
    onLaunch: function(option) { //初始化
        var that = this;
        // var toastFlag = wx.getStorageSync('toastFlag') == ""? true : false;
        // console.log(wx.getStorageSync('toastFlag'),34)
        var userinfo = wx.getStorageSync('userinfo') || {};
        var phone = wx.getStorageSync('phone') || userinfo.phone;
        var uid = wx.getStorageSync('uid') || 0;
            var phone = phone,
                userid = userinfo.id || uid;
        // this.globalData.toastFlag = wx.getStorageSync('toastFlag') == "" ? true : false;
        // that.getDocterMsg(phone, userid)
    },
    // getDocterMsg(phone, userid) {
    //     let that = this,
    //         params = new Object();
    //     params.appid = that.globalData.appid;
    //     params.phone = phone;
    //     params.userid = userid;
    //     that.net.$Api.getDocterMsg(params).then((res) => {
    //         console.log(res,40+'appjs')
    //         if (res.data.has_bank ==1){
    //             that.globalData.toastFlag = false
    //         }else{
    //             that.globalData.toastFlag = true
    //         }
    //     })
    // },
    share: function(path, success = '', fail = '', title = '', imageUrl = '') {

        var option = {};
        var that = this;
        var i = "?"
        console.log(that.globalData)
        path = i.indexOf(path) >= 0 ? path + '&shareChannel=' + that.globalData.user : path + '?shareChannel=' + that.globalData.user;
        console.log(path);
        option.path = path;
        option.success = function(res) {
            console.log('11111')
            //保存转发信息
            if (that.globalData.user != undefined) { //存在用户信息
                wx.request({
                    url: 'https://api.mfk.com/app/api/share.php?appid=' + that.globalData.appid + '&path=' + encodeURIComponent(path) + '&member_id=' + that.globalData.user.id,
                    header: {
                        'content-type': 'application/json'
                    },
                    success: function(res) {
                        console.log(res)
                    }
                });
            }
            //执行成功函数
            if (typeof(success) == 'function') {
                success(res);
            }
        };
        if (typeof(fail) == 'function') {
            option.fail = fail;
        }
        if (imageUrl == '') {
            option.imageUrl = imageUrl;
        }
        option.title = title == '' ? that.globalData.appname : title;
        return option;
    },
    //挂载全局app
    net: {
        $Api: Api.api,
    },
    onHide(){
        // this.globalData.toastFlag = true
    }, 
    alert: function(content) {
        wx.showModal({
            title: '提示',
            content: content,
            showCancel: false
        })
        return this
    },

})