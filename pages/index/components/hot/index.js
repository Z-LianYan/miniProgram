// pages/index/components/hot/index.js

const httpsUtil = require('../../../../utils/httpsUtil');
const API = require('../../../../constant/api');

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    hot_list: []
  },

  /**
   * 组件的方法列表
   */
  methods: {



  },


  lifetimes: {

    created() {
      console.log("created", this.data.toView);
    },

    attached() {
      httpsUtil({
        url: API.GET_HOT_LIST,
        data: {
          city_id: 3,
          version: '6.1.1',
          referer: 2
        },
        success: (data) => {
          console.log("data----", data.data.data);
          this.setData({
            hot_list: data.data.data.hots_show_list,
          })
        },
        fail: (err) => {
          console.log("err", err);
        }
      })

      console.log("attached", this.data.toView);
    },

    ready() {
      console.log("ready");
    },
  },



})
