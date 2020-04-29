// pages/depositapply/depositapply.js
var util = require('../../utils/util.js');
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        moneyNum:'',//提现金额
        time:'',
        money:0,
        is:'',
        phone:'',
        doctorId:"",

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this;
        var phone = wx.getStorageSync('phone');
        let userinfo = wx.getStorageSync('userinfo') || null;
        console.log(userinfo)
        let doctorId = userinfo.mfk_doctor_id;
        let time = that.formatTime(new Date());
        console.log(app.globalData.is)
        let is = app.globalData.is;
        that.setData({
            is:is,
            doctorId: doctorId,
            time,
            money: options.money,//可提现收益
            phone: phone || ''

        })
        console.log(userinfo.mfk_doctor_id)
    },
    moneyNumFn(e){
        console.log(e)
        let that = this;
        let time = that.formatTime(new Date());
        that.setData({
            moneyNum: e.detail.value
        })
    },
    //全部提现
    alldepositapply(){
        let that = this;
        that.setData({
            moneyNum: parseInt(that.data.money.replace(/,/g, ""))
        })
    },
    confirm(){
        wx.navigateTo({
            url: '/pages/schedule/schedule?moneyNum=' + this.data.moneyNum +'&time='+this.data.time,
        })
    },
    formatTime(date) {
        var year = date.getFullYear()
        var month = date.getMonth() + 1
        var day = date.getDate()
        var hour = date.getHours()
        var minute = date.getMinutes()
        var second = date.getSeconds()
        var hours = date.getHours();      
        var minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes(); 
        return year + '-' + month + '-' + day +'  '+ hours + ':' + minute
    },
    pushCashOut() {
        let that = this;
        if (parseInt(that.data.money) < parseInt(that.data.moneyNum)) {
            app.alert('您当前可提现金额不足~')
            return
        }
        if (that.data.is == 'expert'){
            let params = {
                appid: app.globalData.appid,
                doctor_id: that.data.doctorId,
                money: that.data.moneyNum
            }
            app.net.$Api.pushCashOut(params).then((res) => {
                if (res.data.code == 200) {
                    wx.showModal({
                        title: '提示',
                        content: res.data.msg,
                        showCancel: false,
                        success: function () {
                            that.confirm()
                        }
                    })
                }
                else if (res.data.code == 402) {
                    wx.showModal({
                        title: '提示',
                        content: res.data.msg,
                        showCancel: false,
                        success: function () {
                            wx.navigateBack({
                                delta: 1
                            })
                        }
                    })
                } else if (res.data.code == 500) {
                    wx.showModal({
                        title: '提示',
                        content: res.data.msg,
                        showCancel: false,
                    })
                }
            })
        }else{
            // 渠道提现
            let params = {
                appid: app.globalData.appid,
                channel_id: app.globalData.id,
                money: that.data.moneyNum,
                mobile: that.data.phone
            }
            app.net.$Api.pushChannelCashOut(params).then((res) => {
                if (res.data.code == 200) {
                    wx.showModal({
                        title: '提示',
                        content: res.data.msg,
                        showCancel: false,
                        success: function () {
                            that.confirm()
                        }
                    })
                }
                else if (res.data.code == 402) {
                    wx.showModal({
                        title: '提示',
                        content: res.data.msg,
                        showCancel: false,
                        success: function () {
                            wx.navigateBack({
                                delta: 1
                            })
                        }
                    })
                } else {
                    wx.showModal({
                        title: '提示',
                        content: res.data.msg,
                        showCancel: false,

                    })
                }
            })
        }

        // that.confirm()
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
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})