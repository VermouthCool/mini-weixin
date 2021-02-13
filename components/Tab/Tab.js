// components/Tab/Tab.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tab:{
      type:Array,
      value:[]//默认值
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    tab(e){
      let a = e.currentTarget.dataset.index;
      this.triggerEvent('itemjian',a)
    }
  }
})
