// pages/Invitedoctor/Invitedoctor.js
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        doctorId:'',
        doctorName:'',
        is:''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var phone = wx.getStorageSync('phone');
        let userinfo = wx.getStorageSync('userinfo') || null;
        this.getDocterMsg(phone)
    },
    getDocterMsg(phone) {
        let that = this,
            params = new Object();
        params.appid = app.globalData.appid;
        params.phone = phone;
        app.net.$Api.getDocterMsg(params).then((res) => {
            var userinfo = wx.getStorageSync('userinfo') || null;
            var phone = wx.getStorageSync('phone')
            var userid = (userinfo != undefined) ? userinfo.id : 0;
            if (res.data.code == 200) {
                if (res.data.is == "expert") {
                    let doctorId = userinfo.mfk_doctor_id,
                        doctorName = userinfo.wx_nick
                    that.setData({
                        is: res.data.is,
                        doctorId: res.data.msg.mfk_doctor_id,
                        doctorName: res.data.msg.name
                    })
                  
                } else {
                    that.setData({
                        is: res.data.is,
                        doctorId: res.data.msg.id,
                        doctorName: res.data.msg.name
                    })
                  
                }

            } 

        })
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
        let that = this;
        if (that.data.is == "expert") {
            console.log('医生')
            return {
                title: that.data.doctorName + "邀请您加入民福康医生，加入后领取双重奖励哟~",
                path: '/pages/joinMFk/joinMFk?doctorId=' + that.data.doctorId + "&doctorName=" + that.data.doctorName + "&type=0",
            }
        } else {
            console.log('渠道')
            return {
                title: that.data.doctorName + "邀请您加入民福康医生，加入后领取双重奖励哟~",
                path: '/pages/joinMFk/joinMFk?channelId=' + that.data.doctorId + "&channelName=" + that.data.doctorName + "&type=1",
            }
        }
    }
})