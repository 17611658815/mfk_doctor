// pages/centerNav/shareMone/shareMone.js
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        textArr: ['本月分成奖励','好友答题过审数', '累计分成奖励'],
        showToast: false,//模态框
        flag: false,//无数据提示
        doctorId: '',
        page: 1,
        invitationNum: 0,//答题数量
        profit: '0.00',//奖励金额
        mouthProfit: '0.00',//奖励金额
        questionList: [],//答题列表
        on_off:false,
        is: '',
        doctorList:[{
            name: '张三',
            position: '主任',
            hospital: '骨科',
            department: '666',
            time: '2019-0518-'
        }]
            
        
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this;
        let userinfo = wx.getStorageSync('userinfo') || null;
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
                console.log('1111')
                that.setData({
                    is: res.data.is,
                    doctorId: res.data.msg.mfk_doctor_id,
                    doctorName: res.data.msg.name,
                })
                that.getDivideProfit()
            } else {
                that.setData({
                    is: res.data.is,
                    doctorId: res.data.msg.id,
                    doctorName: res.data.msg.name,
                })
                that.getChannelDivideProfit()
            }
        })
    },
    showExplain() {
        let that = this;
        that.setData({
            showToast: !that.data.showToast
        })
    },
    getDivideProfit() {
        console.log('医生')
        let that = this;
        let params = {
            appid: app.globalData.appid,
            doctor_id: that.data.doctorId,
            page: that.data.page
        }
        app.net.$Api.getDivideProfit(params).then((res) => {
            console.log(res)
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
    getChannelDivideProfit() {
        console.log('渠道')
        let that = this;
        let params = {
            appid: app.globalData.appid,
            channel_id: that.data.doctorId,
            page: that.data.page
        }
        app.net.$Api.getChannelDivideProfit(params).then((res) => {
            console.log(res)
            that.data.invitationNum = res.data.data.AnswerNum;
            that.data.profit = res.data.data.profit || that.data.profit;
            if (that.data.page == 1) {
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
        if (that.data.is == "expert") {
            that.data.page++
            that.getDivideProfit()
        }else{
            that.data.page++
            that.getChannelDivideProfit()
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
    onShareAppMessage: function () {
        let that = this;
        let url = that.data.is == "expert" ? '/pages/joinMFk/joinMFk?doctorId=' + that.data.doctorId + "&doctorName=" + that.data.doctorName + "&type=0" : '/pages/joinMFk/joinMFk?channelId=' + that.data.doctorId + "&channelName=" + that.data.doctorName + "&type=1";
        console.log(url)
        return {
            title: that.data.doctorName + "医生邀请您加入民福康医生，加入后领取双重奖励哟~",
            imageUrl: "https://api.mfk.com/statics/images/shareimg/share_1.jpg",
            path: url,
        }
    }
})