// pages/centerNav/deposit/deposit.js
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        page:1,//页码
        on_off:false,//分页开关
        flag: false,
        doctorId:'',//医生id
        depositList: [],//提现记录
        is: '',//来源
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this;
        let userinfo = wx.getStorageSync('userinfo') || null;
        let doctorId = userinfo.mfk_doctor_id;
        var phone = wx.getStorageSync('phone')
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
                    doctorId: res.data.msg.mfk_doctor_id,
                })
                that.getcashOutLog()
            } else {
                that.setData({
                    is: res.data.is,
                    doctorId: res.data.msg.id,
                })
                that.channelProfitInfo()
            }


        })
    },
    getcashOutLog() {
        let that = this;
        let params = {
            appid: app.globalData.appid,
            doctor_id: that.data.doctorId,
            page: that.data.page
        }
        app.net.$Api.cashOutLog(params).then((res) => {
            if (res.data.data.length ==0 && that.data.page==1){
                that.data.flag = true
            }
            if(res.data.data.length>0){
                res.data.data.forEach(val=>{
                    that.data.depositList.push(val)
                })
            }else{
                that.data.on_off = true;
            }
            that.setData({
                depositList: that.data.depositList,
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
            page: that.data.page
        }
        app.net.$Api.channelCashOutLog(params).then((res) => {
            if (res.data.data.length ==0 && that.data.page==1){
                that.data.flag = true
            }
            if(res.data.data.length>0){
                res.data.data.forEach(val=>{
                    that.data.depositList.push(val)
                })
            }else{
                that.data.on_off = true;
            }
            that.setData({
                depositList: that.data.depositList,
                on_off: that.data.on_off,
                flag: that.data.flag
            })
            console.log(that.data.flag)

        })
    },
    onReachBottom: function () {
        var that = this;
        if (!that.data.on_off && that.data.is == "expert") {
            that.data.page++
            that.getcashOutLog()
        } else {
            that.data.page++
            that.channelProfitInfo()
        }
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})