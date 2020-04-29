// pages/nextStep/nextStep.js
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        imgs: [], //照片
        imgs2: [], //身份证
        imgs3: [], //执业证
        imgs4: [], //职称证
        docInfo: {
            userPic: '',
            idcard: [],
            zhiyezheng: [],
            zhicheng: '',
            self_video: '', //认证视频
            xyImg: ''
        },
        windowHeight: "",
        windowWidth: "",
        docInfo2: wx.getStorageSync('docInfo') || {},
        name: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var that = this
        var userinfo = wx.getStorageSync('userinfo') || {};
        var phone = wx.getStorageSync('phone') || ''
        if (JSON.stringify(userinfo) == "{}") {
            wx.reLaunch({
                url: '/pages/login/login',
            })
        }
        that.getDocterMsg(phone)
    },
    onShow() {
        var that = this;
        wx.getSystemInfo({
            success: (res) => {
                that.setData({
                    windowHeight: res.windowHeight,
                    windowWidth: res.windowWidth
                });
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
            console.log(res)
            let identity = res.data.msg.identity.split(',')
            that.setData({
                'imgs[0]': res.data.msg.avatar, //头像
                'imgs2': identity, //身份证
                'imgs4[0]': res.data.msg.title, //职称证
                'docInfo.xyImg': res.data.msg.cooperation,
                name: res.data.msg.name,
                imgs3: res.data.msg.qualification.split(","), //执业证
                'docInfo.self_video': res.data.msg.self_video,
            })
        })
    },
    onShareAppMessage: function() {
        var that = this;
        return {
            title: "民福康医生-资质认证",
            path: '/pages/identification/identification',
        }
    },
})