// pages/joinMFk/joinMFk.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        shereType:0,
        doctorId: '',
        doctorName: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options)
        // 医生分享
        if (options.type==0){
            this.setData({
                shereType: options.type,
                doctorId: options.doctorId,
                doctorName: options.doctorName
            })
        }else{
            // 渠道分享
            this.setData({
                shereType: options.type,
                channelId: options.channelId,
                channelName: options.channelName
            })
        }
       
    },  
    goregister(){
        let url = this.data.shereType == 0 ? '/pages/register/register?doctorId=' + this.data.doctorId + "&shereType=0" : '/pages/register/register?channelId=' + this.data.channelId +"&shereType=1"
        wx.navigateTo({
            url: url
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

    }
})