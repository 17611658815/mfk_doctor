// pages/center/center.js
var app = getApp();
Page({
    data: {
        nickName: '',
        userid: '',
        userInfoAvatar: '',
        position: '',
        userPic: '',
        page: 1,
        winWidth: 0,
        winHeight: 0,
        isHide: 'none',
        count_num: 0,
        isIphoneX: false,
        chexk: false, //是否认证信息
        doctorid: '',
        userObj: {},
        month:'',//月份
        profit:{},//收益
        navigitList:[
            {
                name: '绑定擅长疾病',
                icon: '../../images/adept_icon.png',
                path: '/pages/addadept/addadept'
            },
            {
                name:'我的有声问答',
                icon:'../../images/recordIcon.png',
                path:'/pages/answer/answer'
            },
            {
                name:'我的自问自答',
                icon:'../../images/zwzd.png',
                path:'/pages/askList/askList'
            },
            {
                name:'有声问答草稿箱',
                icon:'../../images/recycle.png',
                path:'/pages/recycleList/recycleList'
            },
            {
                name:'我的视频',
                icon:'../../images/icon/center_viewo_icon.png',
                path:'/pages/mayvideo/mayvideo'
            },
            {
                name:'我的文章',
                icon:'../../images/icon/center_article_icon.png',
                path:'/pages/mayarticle/mayarticle'
            },
            {
                name:'我的银行卡',
                icon:'../../images/icon/may_banck.png',
                path:'/pages/maybankCard/maybankCard'
            },
            {
                name:'意见反馈',
                icon:'../../images/fankiu.png',
                path:'/pages/feedback/feedback'
            }
        ],
        // 渠道登录
        navigitList2:[
            {
                name: '我的银行卡',
                icon: '../../images/icon/may_banck.png',
                path: '/pages/maybankCard/maybankCard'
            },
            {
                name:'意见反馈',
                icon:'../../images/fankiu.png',
                path:'/pages/feedback/feedback'
            }
        ],
        moneyList:[
            {
                name: '邀请奖励',
                icon: '../../images/icon/center_icon_4.png',
                path: '/pages/centerNav/Inviterewards/Inviterewards'
            },
            {
                name: '答题奖励',
                icon: '../../images/icon/center_icon_1.png',
                path: '/pages/centerNav/answerMoney/answerMoney'
            },
            {
                name: '分成奖励',
                icon: '../../images/icon/center_icon_2.png',
                path: '/pages/centerNav/shareMone/shareMone'
            },
            {
                name: '结算明细',
                icon: '../../images/icon/center_icon_3.png',
                path: '/pages/centerNav/deposit/deposit'
            }
        ],
        moneyList2:[
            {
                name: '邀请奖励',
                icon: '../../images/icon/center_icon_4.png',
                path: '/pages/centerNav/Inviterewards/Inviterewards'
            },
            {
                name: '分成奖励',
                icon: '../../images/icon/center_icon_2.png',
                path: '/pages/centerNav/shareMone/shareMone'
            },
            {
                name: '结算明细',
                icon: '../../images/icon/center_icon_3.png',
                path: '/pages/centerNav/deposit/deposit'
            }
        ],
        is:"",
        flag:false,//登录来源
        has_bank:'',//是否添加银行卡 0 未添加 1 已添加
        bank_status:0,//银行卡审核状态
        bank_msg:'',//审核失败信息
        doctor_rank_level:0,
        uid:0
    },
    onLoad: function(option) {
        var that = this;
        var userinfo = wx.getStorageSync('userinfo') || "";
        var uid = wx.getStorageSync('uid') || null;
        var userid = userinfo.id;
        var doctorid = userinfo.mfk_doctor_id;
        var userObj = wx.getStorageSync('userObj') || {}
        var phone = wx.getStorageSync('phone');
        if (app.globalData.doctor_rank_level>=3){
            that.data.navigitList.splice(2,1)
            that.setData({
                navigitList: that.data.navigitList
            })
        }
        if (userinfo == '') {
            console.log(res.data.code)
            wx.redirectTo({
                url: '../login/login',
            })
        } else {
            wx.getSystemInfo({
                success: (res) => {
                    if (res.model.search('iPhone X') != -1) {
                        that.data.isIphoneX = true
                    } 
                    that.setData({
                        windowHeight: res.windowHeight / res.windowWidth * 750 - 150,
                        windowWidth: res.windowWidth,
                        userid: userid,
                        uid: uid,
                        userObj: userObj,
                        month: that.formatTime(new Date()), //月份
                        isIphoneX: that.data.isIphoneX,
                        doctor_rank_level: app.globalData.doctor_rank_level
                    });
                }
            })
            that.getDocterMsg(phone)
        }
    },
    goCertification() {
        wx.navigateTo({
            url: '../certification/certification',
        })
    },
    // 去添加银行卡
    gomaybankCard(){
        wx.navigateTo({
            url: '/pages/maybankCard/maybankCard',
        })
    },
    getDoctorStatus() {
        var that = this
        wx.request({
            url: 'https://mfkapi.39yst.com/appInterface/mfkdoctor/getDoctorInfo/',
            data: {
                appid: app.globalData.appid,
                userid: that.data.userid
            },
            header: {
                'content-type': 'application/json'
            },
            method: "POST",
            success: (res) => {
                that.setData({
                    count_num: res.data.data.count_num || ""
                })
            }
        })

    },
    // 跳转民福康小程序
    gomfk() {
        var that = this;
        console.log(that.data.doctorid)
        wx.navigateToMiniProgram({
            appId: 'wxd8fd4122d8ed38e9',
            path: 'pages/doctorHomePage/doctorHomePage?doctorId=' + that.data.doctorid,
            extraData: {},
            envVersion: 'release',
            success(res) {
                // 打开成功
                console.log('打开了')
            }
        })
    },
    // 获取医生信息
    getDocterMsg(phone) {
        var that = this,
            params = new Object();
            params.appid = app.globalData.appid;
            params.phone = phone;
        params.userid = that.data.uid
        app.net.$Api.getDocterMsg(params).then((res) => {
            if(res.data.code==500){
                console.log(res.data.code)
                wx.redirectTo({
                    url: '../login/login',
                })
            }
            if (res.data.is == "expert") {
                app.globalData.bank_status = res.data.bank_status
                that.setData({
                    is: res.data.is,
                    cooperation: res.data.msg.cooperation,
                    nickName: res.data.msg.name,
                    userInfoAvatar: res.data.msg.avatar,
                    profit: res.data.profit,
                    userid: res.data.msg.id,
                    doctorid: res.data.msg.mfk_doctor_id,
                    has_bank: res.data.has_bank,
                    bank_status: res.data.bank_status,//银行卡审核状态
                    bank_msg: res.data.bank_msg,//审核失败信息
                })
                that.getDoctorStatus()
            }else{
                app.globalData.bank_status = res.data.bank_status
                that.setData({
                    is: res.data.is,
                    userid: res.data.msg.id,
                    nickName: res.data.msg.name,
                    profit: res.data.profit,
                    userInfoAvatar: res.data.msg.avatar,
                    has_bank: res.data.has_bank,
                    bank_status: res.data.bank_status,//银行卡审核状态
                    bank_msg: res.data.bank_msg,//审核失败信息
                })
            }
           
        })
    },
    // 下拉退出登录
    PullDownRefresh: function() {
        var that = this;
        app.globalData.user = ''
        wx.clearStorage()
        wx.showLoading({
            title: '退出中..',
        })
        setTimeout(function() {
            wx.hideLoading()
            // 清理成功toast
            that.setData({
                isHide: 'block',
            });
            setTimeout(function() {
                that.setData({
                    isHide: 'none',
                },()=>{
                    wx.redirectTo({
                        url: '../login/login',
                    })
                })
            }, 2000);
        }, 2000)
    },
    gomayInformation() {
        wx.navigateTo({
            url: '/pages/mayinformation/mayinformation',
        })
    },
    //拨打客服
    callUp() {
        wx.makePhoneCall({
            phoneNumber: '01059231588' // 仅为示例，并非真实的电话号码
        })
    },
    goHome: function() {
        wx.redirectTo({
            url: '../index/index',
        })
    },
    goMoney: function() {
        wx.navigateTo({
            url: '../money/money',
        })
    },
    goearnings(e){
        console.log(e)
        let index = e.currentTarget.dataset.index;
        wx.navigateTo({
            url: '/pages/earnings/earnings?index=' + index,
        })
    },
    
    formatTime(date) {
        var year = date.getFullYear()
        var month = date.getMonth() + 1
        var day = date.getDate()
        var hour = date.getHours()
        var minute = date.getMinutes()
        var second = date.getSeconds()
        return month
        // return [year + '年' + month + '月' + day + '日'].map(formatNumber).join('-')
    },
    //分享页面 
    onShareAppMessage: function() {
        var that = this;
        return {
            title: "民福康医生-个人中心",
            path: '/pages/ask/ask',
        }
    },
})