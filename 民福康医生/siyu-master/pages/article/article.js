//index.js  
//获取应用实例  
var app = getApp()
Page({
    data: {
        userid: '',
        illnessList: [], //常见疾病
        adeptList: [], //擅长
        menuType: [],
        page: 1,
        windowHeight: "",
        windowWidth: "",
        hasnext: true,
        loading: false,
        arr: ['擅长问题', '全部问题'],
        switchTab: 0,
        code: true,
        code2: true,
        err: '',
        cooperation: '11',
        illnesslengthNum: '1',
        adeplengthNum: '1',
        off: false,
        num: ''
    },
    onShow() {
        var that = this;
        var userinfo = wx.getStorageSync('userinfo') || null;
        var phone = wx.getStorageSync('phone')
        var userid = (userinfo != undefined) ? userinfo.id : 0;
        that.getDocterMsg(phone)
        wx.getSystemInfo({
            success: (res) => {
                that.setData({
                    windowHeight: res.windowHeight,
                    windowWidth: res.windowWidth
                });
            }
        })
        if (userinfo != null && userinfo.mfk_doctor_id != undefined) {
            that.adeptList();
            that.setData({
                userid: userid
            })
        }

    },
    //判断userId是否过期抓取信息
    onLoad: function() {
        var that = this;
        var userinfo = wx.getStorageSync('userinfo') || null;
        var phone = wx.getStorageSync('phone')
        var userid = (userinfo != undefined) ? userinfo.id : 0;

        if (userinfo == null) {
            wx.redirectTo({
                url: '../login/login',
            })
        } else if (userinfo != undefined && userinfo.mfk_doctor_id == undefined) { //信息审核中
            that.getCode(phone)
            console.log('111')
        } else {
            that.setData({
                userid: userid
            })
        }
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
                    code: false,
                })
                console.log('审核中')
            } else if (res.data.code == 200) {
                console.log("成功")
                app.globalData.user = res.data.msg;
                console.log(app.globalData.user)
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
        app.net.$Api.getDocterMsg(params).then((res) => {
            console.log(res.data.msg.cooperation)
            that.setData({
                cooperation: res.data.msg.cooperation || ''
            })
        })
    },
    // 擅长
    adeptList: function() {
        var that = this;
        var page = that.data.page;
        var adeptList = page == 1 ? [] : that.data.adeptList;
        var params = new Object();
        params.appid = app.globalData.appid;
        params.userid = that.data.userid;
        params.page = page;
        app.loading();
        app.net.$Api.getIndexArticleList(params).then((res) => {
            wx.hideToast();
            console.log(res)
            var list = res.data.data;
            if (list.length <= 0) {
                that.data.hasnext = false;
            } else {
                for (var i = 0; i < list.length; i++) {
                    adeptList.push(list[i]);
                };
                that.setData({
                    adeptList: adeptList,
                });
            }
        })
    },
    goCertification() {
        wx.navigateTo({
            url: '../certification/certification',
        })
    },
    onReachBottom: function() {
        var that = this;
        that.data.loading = true;
        that.data.page++;
        that.adeptList();
    },
    //认领文章
    publisharticle() {
        wx.navigateTo({
            url: '/pages/publisharticle/publisharticle',
        })
    },
    goFlow: function(e) {
        var that = this;
        var ftype = e.currentTarget.dataset.type;
        var title = e.currentTarget.dataset.title;
        console.log(e);
        wx.navigateTo({
            url: '../flow/flow?ftype=' + ftype + '&title=' + title,
        })
    },

    // 重新上传三证
    goUploadagain: function() {
        wx.navigateTo({
            url: '../Uploadagain/Uploadagain',
        })
    },

    //分享页面 
    onShareAppMessage: function() {
        var that = this;
        return {
            title: "民福康医生-文章发布",
            path: '/pages/article/article',
        }
    },
})