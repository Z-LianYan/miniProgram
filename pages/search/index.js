const httpsUtil = require('../../utils/httpsUtil');
const util = require('../../utils/util.js');
const API = require('../../constant/api');
Page({
  data: {
    isLoading:true,
    search_list:[],
    total:'',
    fetchOptoins:{
      keywords: "",
      page: 1
    },
    result_type:"",

    hotList:[],

    searchHistory:[]
  },

  onLoad:function(){
    this.fetchHotSearch();
  },
  onShow:function(){
    let searchHistory = wx.getStorageSync('searchHistory')?JSON.parse(wx.getStorageSync('searchHistory')):[];
    if(searchHistory.length){
      this.setData({
        searchHistory:searchHistory.reverse()
      })
    }
  },
  onHide: function () {

  },

  getSearchList:function(){
    httpsUtil({
      url: API.GET_RECOMMEND_FOR_YOU,
      data: this.data.fetchOptoins,
      success: (data) => {
        console.log("搜索", data.data.data.result_type);



        let list = data.data.data.list
        for (let i = 0; i < list.length;i++){
          list[i].date_scope = util.formatDate(list[i].start_show_timestamp * 1000, "Y.M.D") + " - " + util.formatDate(list[i].end_show_timestamp * 1000, "M.D");
        }
        
        this.setData({
          result_type: data.data.data.result_type,
          search_list: this.data.search_list.concat(list),
          total:data.data.data.total
        })

        
        
        if (this.data.search_list.length == data.data.data.total || data.data.data.total==0){
          this.setData({isLoading: false})
        }else{
          this.setData({
            isLoading:true
          })
        }
        
        
      },
      fail: (err) => {
        console.log("err", err);
      }
    })
  },

  fetchHotSearch(){
    httpsUtil({
      url: API.GET_HOT_SEARCH_LIST,
      data: {},
      success: (data) => {
        console.log("热搜索列表", data.data);
        
        this.setData({
          hotList:data.data.data
        })
        
      },
      fail: (err) => {
        console.log("err", err);
      }
    })
  },


  //滚动到顶部处理函数
  bindscrolltoupper(e){
    console.log('关闭继续向上滑动')
  },
  //滚动到底部处理函数
  bindscrolltolower(e){
    console.log('关闭继续向下滑动')
    if (this.data.isLoading) {
      this.setData({
        'fetchOptoins.page':this.data.fetchOptoins.page+1,
        isLoading:false
      })
      this.getSearchList();
    };
    
  },

  onHotSearch(e){
    console.log("e",e.currentTarget.dataset.keywords);
    let keywords = e.currentTarget.dataset.keywords;
    let searchHistory = wx.getStorageSync('searchHistory')?JSON.parse(wx.getStorageSync('searchHistory')):[];
    console.log("哟吗",searchHistory);
    for(let i=0;i<searchHistory.length;i++){
      if(searchHistory[i]==keywords){
        searchHistory.splice(i,1);
      }
    }
    if(searchHistory.length>=5){
      searchHistory.splice(0,4);
    }
    searchHistory.push(keywords)
    wx.setStorageSync('searchHistory', JSON.stringify(searchHistory));

    this.setData({
      'fetchOptoins.keywords':keywords
    })
    this.getSearchList()
  },

  delSearchHistory:function(){
    console.log("123")
    wx.removeStorageSync('searchHistory')
    this.setData({
      searchHistory:[]
    })
  },

  onChange:function(e){
    console.log("e",e.detail);
    if(!e.detail) {
      return this.setData({
        search_list:[]
      })
    };
    this.setData({
      'fetchOptoins.keywords':e.detail,
      search_list:[]
    })
    this.getSearchList();
  },

  onSearch:function(){
    console.log("搜索");
    this.setData({
      search_list:[]
    })
    this.getSearchList();
  },

  onCancel:function(){
    wx.switchTab({
      url: "/pages/index/index"
    })
  }
  
});