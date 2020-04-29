//引入js插件
const app = getApp()
Page({

    data: {
        articleId: "", //文章id
        articleList: {}, //文章内容数组
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let that = this;
        that.setData({
            articleId: options.id,
        })
        that.gitArticle()
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
    gitArticle(){
        let that = this;
        let params = {
            appid: app.globalData.appid,
            id: that.data.articleId
        }
        app.net.$Api.getArticleInfo(params).then((res) => {
            console.log(res)
            that.setData({
                articleList:res.data.data

            })
           
        })
    },
    //分享页面 
    onShareAppMessage: function() {
        var that = this;
        return {
            title: that.data.title,
            path: '/pages/article/article?id=' + that.data.articleId + '&share_query=article',
        }
    }

})