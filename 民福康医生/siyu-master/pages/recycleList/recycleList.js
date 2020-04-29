// pages/recycleList /recycleList .js
let app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userid:0,
        page:1,
        recycleList:[],
        on_off:false
        
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var userinfo = wx.getStorageSync('userinfo');
        this.setData({
            userid: userinfo.id
        })
    },
    /**
    * 生命周期函数--监听页面显示
    */
    onShow: function () {
        this.data.page =1;
        this.data.on_off= false;
        this.data.recycleList = [];
        this.getDoctorWillTranslation()
    },
    getDoctorWillTranslation: function () {
        var that = this;
        var params = new Object();
        params.appid = app.globalData.appid;
        params.page = that.data.page;
        params.userid = that.data.userid;
        app.net.$Api.getDoctorWillTranslation(params).then((res) => {
            console.log(res);
            if (res.data.list.length>0){
                that.setData({
                    recycleList: that.data.recycleList.concat(res.data.list)
                })
            }else{
                that.setData({
                    on_off:true
                })
            }
        })
    },
    goDetaile(e){
        var id = e.currentTarget.dataset.id;
        var status = e.currentTarget.dataset.status;
        wx.navigateTo({
            url: '/pages/recycleItemDetaile/recycleItemDetaile?id=' + id + "&status=" + status,
        })
    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        if(!this.data.on_off){
            this.data.page++
            this.getDoctorWillTranslation()
        }
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

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