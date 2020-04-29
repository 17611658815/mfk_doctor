// pages/earnings/earnings.js
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        showToast: false,
        flag: true,
        cooperation: '11',
        month: '', //当天日期
        page: 1,
        profit: {},
        on_off: false, //分页开关
        profitInfoList: [],
        openId:'',
        is:'',
        userid:'',
        currentTab:0,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let that = this;
        let userinfo = wx.getStorageSync('userinfo') || null;
        let userid = userinfo.id;
        let phone = wx.getStorageSync('phone');
        that.setData({
            openId:userinfo.wx_openid,
            userid: userinfo.id,
            month: that.formatTime(new Date()), //月份
            currentTab:options.index
        })
        that.getDocterMsg(phone)
    },
    // 判断来源
    getDocterMsg(phone) {
        let that = this,
            params = new Object();
        params.appid = app.globalData.appid;
        params.phone = phone;
        app.net.$Api.getDocterMsg(params).then((res) => {
            console.log(res)
            if (res.data.is == "expert") {
                that.setData({
                    is: res.data.is,
                    doctorId:res.data.msg.mfk_doctor_id,
                    cooperation: res.data.msg.cooperation || '',
                    profit: res.data.profit,
                    month: that.formatTime(new Date()), //月份
                })
                console.log(res.data.msg.id,53)
                that.getprofitInfo()
            } else {
                that.setData({
                    is: res.data.is,
                    profit: res.data.profit,
                    doctorId: res.data.msg.id,
                    // doctorName: res.data.msg.name,
                })
                that.channelProfitInfo()
            }
        })
    },
    getprofitInfo() {
        let that = this;
        let params = {
            appid: app.globalData.appid,
            doctor_id: that.data.doctorId,
            page: that.data.page,
            type: that.data.currentTab/1+1
        }
        app.net.$Api.profitInfo(params).then((res) => {
            console.log(res)
            if (res.data.data.length == 0 && that.data.page == 1) {
                that.data.flag = false
            }
            if (res.data.data.length > 0) {
                res.data.data.forEach(val => {
                    that.data.profitInfoList.push(val)
                })
            } else {
                that.data.on_off = true;
            }
            that.setData({
                profitInfoList: that.data.profitInfoList,
                on_off: that.data.on_off,
                flag: that.data.flag
            })

        })
    },
    channelProfitInfo() {
        let that = this;
        let params = {
            appid: app.globalData.appid,
            channel_id: that.data.doctorId,
            page: that.data.page,
            type: that.data.currentTab / 1 + 1
        }
        app.net.$Api.channelProfitInfo(params).then((res) => {
            console.log(res)
            if (res.data.data.length == 0 && that.data.page == 1) {
                that.data.flag = false
            }
            if (res.data.data.length > 0) {
                res.data.data.forEach(val => {
                    that.data.profitInfoList.push(val)
                })
            } else {
                that.data.on_off = true;
            }
            that.setData({
                profitInfoList: that.data.profitInfoList,
                on_off: that.data.on_off,
                flag: that.data.flag
            })

        })
    },
    onReachBottom: function () {
        var that = this;
        if (!that.data.on_off && that.data.is == "expert") {
            that.data.page++
            that.getprofitInfo()
        }else{
            that.data.page++
            that.channelProfitInfo()
        }
    },
    formatTime(date) {
        var year = date.getFullYear()
        var month = date.getMonth() + 1
        var day = date.getDate()
        var hour = date.getHours()
        var minute = date.getMinutes()
        var second = date.getSeconds()
        return [month]
        // return [year + '年' + month + '月' + day + '日'].map(formatNumber).join('-')
    },
    
    goaudioList() {
        wx.navigateTo({
            url: '/pages/audioList/audioList',
        })
    },
    goCertification() {
        wx.navigateTo({
            url: '../certification/certification',
        })
    },
    //提现说明
    check() {
        let that = this;
        that.setData({
            showToast: !that.data.showToast
        })
    },
    // 立即提现
    goDeposit() {
        let that = this;
        let money = that.data.profit.total;
        let sure = that.data.profit.sure;
        if (that.data.month[1] !== 20) {
            app.alert('每月20日才能提现哟~')
            return 
        }
        if (that.data.month[1] == 20 && parseInt(that.data.profit.sure.replace(/,/g, ""))<200) {
            app.alert('满200元才可以提现哟~')
            return 
        }
       
        if (that.data.cooperation == '') {
            app.alert('医生资质必须认证通过才可提现~')
            return 
        }
        wx.navigateTo({
            url: '/pages/depositapply/depositapply?money=' + sure,
        })
    },
    //检查授权
    checkauth: function() {
        var that = this;
        console.log('开始授权')
    },
    bindGetUserInfo(res) {
        var that = this;
        var userInfo = res.detail.userInfo;
        var openid = that.data.openId;
        // if (openid != '') {
        //     console.log('有openid')
        //     that.goDeposit()
        // } else {
            console.log('没有openid')
            if (res.detail.userInfo) {
                app.loading()
                wx.login({
                    success: function(res) {
                        console.log(res)
                        that.getOpenid(res.code, userInfo)
                    },
                    fail: function(res) {
                        app.alert('信息获取失败')
                    },
                    complete: function(res) {
                        wx.hideToast()
                    },
                })
            } else {
                app.alert('“允许”授权后才可以提现哟~请再次点击“立即提现”按钮进行授权~')
            }
        // }

    },
    getOpenid: function(loginCode, userInfo) {
        var that = this,
            params = new Object();
        params.appid = app.globalData.appid;
        params.code = loginCode;
        app.net.$Api.getOpenId(params).then((res) => {
            console.log(res)
            wx.setStorageSync("openid", res.data.openid)
            that.register(res.data.openid, userInfo)
        })
    },
    register(openid, userInfo) {
        var that = this,
            params = new Object();
            wx.request({
                url: 'https://mfkapi.39yst.com/appInterface/user/wxLogin',
                header: {
                    'content-type': 'application/json'
                },
                method: "POST",
                data:{
                    appid:app.globalData.appid,
                    id:that.data.userid,
                    openid:openid,
                    userInfo:userInfo,
                },
                success:function(res){
                    that.merge(res.data)
                  
                }
            })
    },
    // 账号合并
    merge(res){
        let that = this;
        console.log(res)
        wx.request({
            url: 'https://mfkapi.39yst.com/appInterface/user/userMerge',
            method: "POST",
            data:{
                appid:app.globalData.appid,
                id: that.data.userid,
                openid: res.wx_openid,
                userInfo: res,
            },
            success:function(res){
                app.globalData.user = res.data
                that.goDeposit()
            }
        })
    },
    swatchTab(e){
        let index = e.currentTarget.dataset.index;
        this.setData({
            currentTab: index,
            page: 1,
            profitInfoList: []
        })
        if (this.data.is == "expert"){
            this.getprofitInfo()
        }else{
            this.channelProfitInfo()
        }   
      
        console.log(e)
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

   
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})