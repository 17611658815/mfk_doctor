// pages/search/search.js
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        pageChange: true,
        searchMsg: '',
        oldName: '',
        speciality: '', //擅长疾病
        userid: '',
        illnessArray: [],
        page:1,
        no_off:false,
        isGoTop:false
    },
    // 获取问题
    searchMsgs: function(e) {
        var that = this;
        var userinfo = wx.getStorageSync('userinfo');
        var value = e.detail.value;
        var params = new Object();
        params.appid = app.globalData.appid;
        params.keyword = e.detail.value;
        params.doctor_id = userinfo.mfk_doctor_id;
        that.setData({
            searchMsg: e.detail.value
        })
        console.log(that.data.oldName)
        /*  if (e.detail.value.length > 0) {
            app.net.$Api.getLikeQuestion(params).then((res) => {
                console.log(res)
                let searchData = res.data.data.map(function(res) {
                    return {
                        key: value,
                        name: res.title,
                        id: res.id
                    }
                })
                that.setData({
                    searchData,
                    searchResultDatas: res.data.data
                })

            })
        } else if (e.detail.value == 0) { //如果val为空 清空列表
            this.setData({
                searchResultDatas: []
            })
        } */
    },
    chooseSearchResultAction(e) {
        var id = e.currentTarget.dataset.id
        this.setData({
            searchMsg: e.currentTarget.dataset.val,
        })
        wx.navigateTo({
            url: '/pages/record/record?questionId=' + id,
        })
    },

    // 擅长疾病
    specialityIllness() {
        let that = this,
            params = new Object();
        params.appid = app.globalData.appid;
        params.userid = that.data.userid;
        app.net.$Api.getExpertIllness(params).then((res) => {
            that.setData({
                speciality: res.data.data
            })
        })
    },
    // 点击搜索
    searchIllness() {
        let that = this;
        if (that.data.searchMsg != '') {
            that.getIllnessQuestionList()
        } else {
            app.alert('搜索内容不能为空！')
        }

    },
    getIllnessQuestionList(){
        let that =this,
        params = new Object();
        params.appid = app.globalData.appid;
        params.userid = that.data.userid;
        params.keyword = that.data.searchMsg;
        params.page = that.data.page;
        params.time = new Date().getTime();
        app.loading()
        app.net.$Api.getIllnessQuestionList(params).then((res) => {
            wx.hideToast()
            that.data.pageChange  = false
            if (res.data.list.length > 0) {
                that.setData({
                    illnessArray: that.data.illnessArray.concat(res.data.list),
                    pageChange: that.data.pageChange
                    // illnessArray: [],
                    
                })
            } else {
                that.setData({
                    no_off: true
                })
            }
        })
    },
    // 去录音
    gotoRecord: function(e) {
        var that = this;
        var question = e.currentTarget.dataset.questionid;
        let is_self = 1;
        wx.navigateTo({
            url: '/pages/record/record?questionId=' + question  + '&is_self=' + is_self +'&next=0',
        })
    },
    // 
    searchSpeciality(e) {
        let that = this;
        wx.request({
            url: 'https://mfkapi.39yst.com/appInterface/mfkdoctor/getIllnessQuestionList/',
            data: {
                appid: app.globalData.appid,
                userid: that.data.userid,
                keyword: e.currentTarget.dataset.id
            },
            header: {
                'content-type': 'application/json'
            },
            method: 'POSt',
            success: function(res) {
                console.log(res.data.list)
                that.setData({
                    illnessArray: res.data.list,
                    // illnessArray: [],
                    pageChange: false
                })
            }
        })
    },
    goask() {
        wx.navigateTo({
            url: '/pages/ask/ask',
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var that = this;
        var userinfo = wx.getStorageSync('userinfo') || null;
        var phone = wx.getStorageSync('phone')
        var userid = userinfo != undefined ? userinfo.id : 0;
        that.setData({
            userid: userid
        })
        this.specialityIllness()
    },
    onPageScroll(e) {
        let that = this;
        if (e.scrollTop > 500) {
            that.setData({
                isGoTop: true
            })
        } else if (e.scrollTop < 10) {
            that.setData({
                isGoTop: false
            })
        }
    },
    goTop: function () {
        wx.pageScrollTo({
            scrollTop: 0,
            duration: 300
        });
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
        if (this.data.illnessArray.length>0){
            this.data.illnessArray= [];
            this.data.page=1;
            this.data.no_off = false;
            this.getIllnessQuestionList()
        }
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
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {
        if (!this.data.no_off && this.data.illnessArray.length>0){
            this.data.page++;
            this.getIllnessQuestionList()
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})