//index.js  
//获取应用实例  
var app = getApp()
Page({
    data: {
        userinfo: {},
        userid: '',
        cooperation: '11',
        indicatorDots: true,
        autoplay: true,
        interval: 5000,
        durations: 500,
        menuType: [],
        goodHeight: 88,
        windowHeight: "",
        windowWidth: "",
        show: true,
        iphoneX: true,
        autoHeight: '',
        maintain:false,//维护状态
        time:'',
        imgUrl:"",//维护文案图片
        is:'',//判断登录渠道
        toastFlag:true,//首次登录展示去添加银行卡
        doctor_rank_level:0
    },
    onShow() {
        var that = this;
        var phone = wx.getStorageSync('phone');
        var userinfo = wx.getStorageSync('userinfo') || null;
        var uid = wx.getStorageSync('uid') || null;
        wx.getSystemInfo({
            success: (res) => {
                let windowHeights = (res.windowHeight * (750 / res.windowWidth));
                if (res.model.search('iPhone X') != -1) {
                    that.data.iphoneX = false
                }else{
                    app.globalData.iphoneX = true
                }
                that.setData({
                    windowHeight: res.windowHeight / res.windowWidth * 750 - 150,
                    windowWidth: res.windowWidth,
                    iphoneX: that.data.iphoneX,
                    time: new Date().getTime(),
                    imgUrl: 'https://api.mfk.com/statics/images/maintain.png?' + that.data.time
                });
            }
        })
        that.getDocterMsg(phone)
        // if (uid == null && phone == userinfo) {
        //     that.submit(phone)
        // }
        
    },
    //判断userId是否过期抓取信息
    onLoad: function(options) {
        var that = this;
        var userinfo = wx.getStorageSync('userinfo') || null;
        var phone = wx.getStorageSync('phone');
        var uid = wx.getStorageSync('uid') || null;
        var userid = (userinfo != undefined) ? userinfo.id : 0;
        wx.getStorage({
            key: 'toastFlag',
            success(res) {
                that.setData({
                    toastFlag: res.data
                })
            }
        })
        that.setData({
            userinfo: userinfo,
            phone: phone,
            userid: userid,
        })
        if (that.data.userinfo == null) { //判断登录信息
            that.setData({
                show: false
            }, () => {
                wx.redirectTo({
                    url: '../login/login',
                })
            })
        }
       
        // that.getDocterMsg(phone)
    },
    submit: function (phone) {
        var that = this;
        let code = phone.substr(0, 6);
        var params = new Object();
        params.appid = app.globalData.appid;
        params.phone = phone;
        params.code = code;
        app.net.$Api.expertPhoneSmsLogin(params).then((res) => {
            console.log(res.data);
            let id = res.data.msg.id ? res.data.msg.id : res.data.user.id
            wx.setStorageSync("userinfo", res.data.msg);
            wx.setStorageSync("uid", id)
            app.globalData.userid = id

        })
    },
    //判断登录状态
    getCode(phone) {
        let that = this,
            params = new Object();
            params.appid = app.globalData.appid;
            params.phone = phone;
        app.net.$Api.getCode(params).then((res) => {
            
            console.log(res.data.code)
            if (res.data.code == 301) {
                that.setData({
                    code: false
                })
                console.log('审核中')
            } else if (res.data.code == 200) {
                console.log("成功")
                app.globalData.user = res.data.msg;
                wx.setStorageSync("userinfo", app.globalData.user);
                that.onLoad()
            } else if (res.data.code == 302) {
                console.log('审核失败')
                that.setData({
                    code2: false,
                    err: res.data.msg
                })
            } else if (res.data.code == 500) {
                app.globalData.user = ''
                wx.removeStorageSync('userinfo')
                wx.reLaunch({
                    url: '/pages/login/login',
                })
            } 
        })
    },
    // 获取医生信息
    getDocterMsg(phone) {
        let that = this,
            params = new Object();
            params.appid = app.globalData.appid;
            params.phone = phone;
            // params.userid = that.data.userid;
        app.net.$Api.getDocterMsg(params).then((res) => {
            app.globalData.docrot_id = res.data.msg.mfk_doctor_id
            var userinfo = wx.getStorageSync('userinfo') || null;
            var phone = wx.getStorageSync('phone')
            var userid = (userinfo != undefined) ? userinfo.id : 0;
            if (res.data.code == 500){
                // wx.clearStorage()
                wx.redirectTo({
                    url: '../login/login',
                })
            }
            if(res.data.code == 200){
                app.globalData.is = res.data.is;
                app.globalData.has_bank = res.data.has_bank
                app.globalData.may_record = res.data.msg.may_record //是否能答题
                app.globalData.doctor_rank_level = res.data.msg.doctor_rank_level //医生等级
                if (res.data.is == "expert") {
                    that.submit(phone)
                    if (that.data.userinfo == null) { //判断登录信息
                        that.setData({
                            show: false,
                            is: res.data.is,
                            doctor_rank_level: res.data.msg.doctor_rank_level
                        }, () => {
                            wx.redirectTo({
                                url: '../login/login',
                            })
                        })
                    } else if (that.data.userinfo != undefined && that.data.userinfo.mfk_doctor_id == undefined) { // 有登录信息 信息审核中
                        console.log('有信息')
                        that.setData({
                            doctor_rank_level: res.data.msg.doctor_rank_level,
                            is:res.data.is
                        })
                        that.getCode(that.data.phone)
                    } else {
                        that.setData({
                            // has_bank:res.data.has_bank,
                            doctor_rank_level: res.data.msg.doctor_rank_level,
                            is: res.data.is,
                            userid: res.data.msg.id,
                            cooperation: res.data.msg.cooperation || '',
                        })
                    }
                } else if (res.data.is == "channel") {
                    // wx.setStorageSync("userinfo", res.data.msg);
                    app.globalData.id = res.data.msg.id
                    that.setData({
                        // has_bank: res.data.has_bank,
                        is: res.data.is,
                        userid: res.data.msg.id,
                        doctorName: res.data.msg.name,
                    })
                } 
               
            } else if (res.data == "") {
                console.log('清除数据')
                wx.removeStorageSync('userinfo')
                wx.reLaunch({
                    url: '/pages/login/login',
                })
            }else{
                that.setData({
                    maintain: true
                })
            }
           
        })
    },
    goCertification() {
        wx.navigateTo({
            url: '../certification/certification',
        })
    },
    closeToast(){
        let that = this;
        that.setData({
            toastFlag: false
        })
        wx.setStorage({
            key: 'toastFlag',
            data: that.data.toastFlag,
        })
    },
    goFlow: function(e) {
        let that = this,
            ftype = e.currentTarget.dataset.type,
            title = e.currentTarget.dataset.title;
        if (ftype =='flow4'){
            wx.navigateTo({
                url: '/pages/Invitedoctor/Invitedoctor'
            })
        }else{
            wx.navigateTo({
                url: '../flow/flow?ftype=' + ftype + '&title=' + title,
            })
        }
    },
    // 重新上传三证
    goUploadagain: function() {
        wx.navigateTo({
            url: '../Uploadagain/Uploadagain',
        })
    },
    goCenter() {
        wx.redirectTo({
            url: '/pages/center/center',
        })
    },
    //去添加银行卡
    gomaybankCard(){
        app.globalData.toastFlag = false
        wx.navigateTo({
            url: '/pages/maybankCard/maybankCard',
        })
    },
    //分享页面 
    onShareAppMessage: function() {
        let that = this;
        if (that.data.is == "expert"){
            return {
                title: "民福康医生-工作站",
                path: '/pages/index/index?id=1',
            }
        }else{
            return {
                title: that.data.doctorName + "邀请您加入民福康医生，加入后领取双重奖励哟~",
                path: '/pages/joinMFk/joinMFk?channelId=' + that.data.userid + "&channelName=" + that.data.doctorName+"&type=1",
            }
        }
        
    },
})