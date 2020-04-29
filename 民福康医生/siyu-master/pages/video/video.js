// pages/video/video.js
const app = getApp()
Page({
    data: {
        videoId: "", //视频id
        videoMsg: {}, //视频信息
        page: 1,
        url: '',
        autoHeight: '',
        posterShow: false,
        boXShow: true,
        isplay: false,
        goIndex: false,
        title: '',
        doctorid: ''
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var that = this
        that.setData({
            videoId: options.videoId,
        });
        wx.getSystemInfo({
            success: function(res) {
                that.setData({
                    autoHeight: ((res.windowWidth) / 16) * 9
                });
            }
        });
        //直接调用
        that.getVideo()
    },
    gomfk(e) {
        var doctorid = e.currentTarget.dataset.id
        console.log(e)
        wx.navigateToMiniProgram({
            appId: 'wxd8fd4122d8ed38e9',
            path: 'pages/doctorHomePage/doctorHomePage?doctorId=' + doctorid,
            extraData: {},
            envVersion: 'release',
            success(res) {
                // 打开成功
                console.log('打开了')
            }
        })
    },
    bindplay() {
        var taht = this
        this.setData({
            boXShow: false
        })
    },
    bindended() {
        var taht = this
        this.setData({
            boXShow: true,
            goIndex: true
        })
    },

    //获取视频信息
    getVideo() {
        let that = this,
            params = new Object();
        params.appid = app.globalData.appid;
        params.videoid = that.data.videoId;
        wx.showLoading({
            title: '加载中'
        })
        app.net.$Api.getVideoInfo(params).then((res) => {
            console.log(res)
            wx.hideLoading()
            that.setData({
                videoMsg: res.data.data,
                doctorid: res.data.data.doctor.id
            });
        })
    },
    //点击再次播放
    repPlay() {
        var that = this
        var prevV = wx.createVideoContext('video');
        prevV.play()
        that.setData({
            boXShow: false,
            isplay: true
        })
    },
    //分享页面 
    onShareAppMessage: function() {
        var that = this;
        return {
            title: that.data.title,
            path: '/pages/video/video?videoId=' + that.data.videoId + '&share_query=video',
        }
    },

})