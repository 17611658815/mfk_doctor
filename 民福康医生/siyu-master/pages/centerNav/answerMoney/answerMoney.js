// pages/centerNav/answerMoney/answerMoney.js
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        textArr: ['本月答题奖励', '累计过审数','累计答题奖励'],
        showToast: false,
        on_off:false,
        doctorId:'',
        flag: false,
        page:1,
        invitationNum: 0,//累计答题数量
        profit: '0.00',//本月答题奖励
        mouthProfit: '0.00',//累计答题奖励
        questionList: [],//答题列表
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this;
        let userinfo = wx.getStorageSync('userinfo') || null;
        let doctorId = userinfo.mfk_doctor_id;
        that.setData({
            doctorId: doctorId,
        })
        that.getAnswerProfit()
    },
    showExplain() {
        let that = this;
        that.setData({
            showToast: !that.data.showToast
        })
    },
    getAnswerProfit() {
        let that = this;
        let params = {
            appid: app.globalData.appid,
            doctor_id: that.data.doctorId,
            page: that.data.page
        }
        app.net.$Api.getAnswerProfit(params).then((res) => {
            console.log(res.data.data.profit)
            that.data.invitationNum = res.data.data.AnswerNum;
            that.data.profit = res.data.data.profit || that.data.profit;
            if (that.data.page == 1){
                that.setData({
                    invitationNum: res.data.data.AnswerNum || 0,
                    profit: res.data.data.profit || "0.00",
                    mouthProfit: res.data.data.mouthProfit || "0.00",
                })
            }
            if (that.data.invitationNum == 0 && that.data.page == 1) {
                that.data.flag = true
            }
            if (res.data.data.questionList.length > 0) {
                res.data.data.questionList.forEach(val => {
                    that.data.questionList.push(val)
                })
            } else {
                that.data.on_off = true
            }
            that.setData({
                questionList: that.data.questionList,
                on_off: that.data.on_off,
                flag: that.data.flag
            })

        })
    },
    onReachBottom: function () {
        var that = this;
        if (!that.data.on_off){
            that.data.page++
            that.getAnswerProfit()
        }
    },
    fn(){
        wx.navigateTo({
            url: '/pages/audioList/audioList',
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
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})