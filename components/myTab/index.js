const httpsUtil = require('../../utils/httpsUtil');
const util = require('../../utils/util.js');
const API = require('../../constant/api');
Component({
  options: {
    styleIsolation: 'shared'//表示页面 wxss 样式将影响到自定义组件
  },
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    classifyList:[]
  },

  lifetimes: {
    created:function(){//在组件实例刚刚被创建时执行
      console.log("123")
      this.getClassifyList();
    },
    attached:function(){//在组件实例进入页面节点树时执行
      console.log("456")
    },
    ready:function(){//在组件在视图层布局完成后执行
      console.log("789")
    },
    moved:function(){//在组件实例被移动到节点树另一个位置时执行

    },
    detached:function(){//在组件实例被从页面节点树移除时执行

    },
    detached:function(){//每当组件方法抛出错误时执行

    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    selectLocation:function(){
      this.triggerEvent("onSelectLocation",{})
    },
    getClassifyList:function(){
      // console.log("111111")
      httpsUtil({
        url: API.GET_CATEGORY_LIST,
        data:{},
        success:(data)=>{
          console.log("data----分类",data.data.data);
          this.setData({
            classifyList:data.data.data
          })
        },
        fail:(err)=>{
          console.log("err",err);
        }
      })
    },

  }
})
