# 原生框架 MINA 提供了自己的视图层描述语言 WXML 和 WXSS,以及JavaScript，并在视图层和逻辑层提供了事件传输和事件系统 小程序有JSON配置文件
## pages文件夹
### index文件夹为首页文件
### log为日志文件
## utils为第三方工具
## app.js 为入口文件 全局文件
## app.json 指定一些全局的配置
```javascript
{
  "pages":[//标明当前的应用有几个页面  注意不要加后缀名  放到最上面的为首页
    "pages/index/index",
    "pages/logs/logs"
  ],
  "window":{//定义小程序所有页面的顶部背景颜色 文字颜色等
    "backgroundTextStyle":"light",//加载的背景颜色
    "navigationBarBackgroundColor": "#fff",
    "navigationBarTitleText": "Weixin",
    "navigationBarTextStyle":"black"
  },
  "style": "v2",
  "sitemapLocation": "sitemap.json",
  "tabBar": {//设置导航栏 到了上面 图标就不显示了
    "list": [{//至少得两个 
      "pagePath": "pages/jian/jian",
      "text": "diyiye",
      "iconPath": "https://wimg.588ku.com/gif620/21/01/28/2363d105072834957ad3688f35ea2b5a.gif",
      "selectedIconPath": "//bpic.588ku.com/element_pic/20/06/30/d9bb73d4db643f679d3d551bb59dee53.jpg!/fw/329/quality/90/unsharp/true/compress/true"
    },
    {
      "pagePath": "pages/index/index",
      "text": "index",
      "iconPath": "//wimg.588ku.com/gif620/21/01/28/7be300e796f668f1121e94197741f7f5.gif",
      "selectedIconPath": "//wimg.588ku.com/gif620/21/01/28/b9b8e09f00b89c36edbba1927ab51fb2.gif"
    }
  ],
  "color":"#008c8c",//只能写16进制的颜色表示法
  "selectColor":"#008c8d",//16
  "backgroundColor":"#000",//16
  "position":"top"
  }
}
```
## app.wxss 全局的样式
## project.config.json 项目配置文件
## sitemap.json 发布时用
### 配置小程序及其页面是否允许索引
# 模板语法
## 数据绑定
1.text 相当于web中的 span标签 行内元素  不会换行
2.view  相当于div标签  默认是块级元素  会换行
3.checkbox 相当于以前的复选框 加checked
```javascript
Page({
  data:{//存着wxml里用的数据 直接写变量名就行
    mes:'hello world!!!'
  }
})
<view>{{mes}}</view>
<view data-num="{{mes}}" >自定义属性</view>
//字符串和花括号之间不要存在空格  不然会出现失败
<checkbox checked="{{mes}}">jian</checkbox>
```
## 运算
可以在花括号里写入表达式，不能加入语句
## 循环遍历
```javascript
list:[
      {
        id:0,
        name:'li'
      },
      {
        id:1,
        name:'zi'
      },
      {
        id:2,
        name:'jian'
      }
    ]
    1.<view wx:for="{{list}}" wx:for-item="item"  wx:for-index="index" wx:key="id">{{item.name}},{{index}}</view>
    2.<view wx:for="{{list}}" wx:for-item="item"  wx:for-index="index" wx:key="id">{{item.name}},{{index}}</view>
    也可以使用 *this 表示当前的循环项  这时item必须为数字或字符串
```
当出现数组的循环嵌套时 尤其要注意item和index不要重名 只有一层循环的话这俩也可以不写 默认就叫item和index
对象的循环
wx:for:"{{对象}}" wx:for-item="对象的值" wx:for-index="对象的属性"
## block标签
  1.占位符
  2.写代码的时候这个标签存在
  3.页面渲染时 小程序会把它移除 同时也是sapn元素
## 条件渲染
### wx:if
<view wx:if="jian">jainjian</view>
<view wx:else>jainjiangege</view>
<view wx:elif="jian">jainjian</view>

### hidden 在标签上直接写上这个属性
<view hidden>hidden</view> 没有移除标签  只是display ：none

## 绑定事件
无法在小程序的事件中直接传参的  通过自定义属性的方式传递参数
<button bindtap="lai" data-lai="1"></button>

# WXSS
## rpx 可以根据屏幕宽度 进行自适应  规定屏幕宽为750rpx
## 小程序中不需要自己引入样式
## 样式导入
1.通过@import引入  
2.只支持相对路径

## 小程序的选择器不支持通配符 *
## 小程序 写less less.compile:{"outExt":"wxss"}

## 常见的组件
1. view 代替原来的div
  hover-class=""  指定手指按下去的类
  hover-stop-propagation 指定是否事件冒泡
2. text 只能内部嵌套text组件 长按文字可以复制  只有这个组件才有这个功能  可以对空格 回车进行编码
  selectable: 是否可以选中 默认值false
  decode: 是否解码
  <text selectable decode>jaingezuishuai 
   a </text>
3. image 腾讯规定上线打包的图片不能大于2MB  所以一般都用线上图片 小程序不支持img标签 图片默认设置大小为   320*240
  src 规定图片的路径
  mode 决定图片如何和宽高做适配  默认值叫scaleFill  不保持纵横比
    acpectFit 保持纵横比 使长边显示出来
    acpectFill 保持纵横比 使短边显示出来
    widthFix 宽度自己设置 高度自适应 然后比例不变 设置了也没用
    top
  小程序的图片直接支持懒加载 lazy-load  当图片出现在视口的上下三屏之内  会自动加载
4. swiper 外层swiper  每一项 swiper-item
  swiper 默认宽度为100% 高度为150px  高度无法实现靠内容撑开  
    swiper{
    width: 100%;
    height: 420rpx;
    image{
      width: 100%;
      height: 420rpx;
    }
  }

  autoplay 默认false
  interval="2000" 播放的时间间隔 默认5000
  circular 循环轮播
  indicator-dots false
  indicator-color 未选中的颜色
  indicator-active-color 选中的颜色
5. navigator 块级元素  可以设置宽高
  url: 可以写相对路径；
  target: 设置要跳转到当前的小程序还是其他的小程序 默认   self自己 miniProgram 表示其他小程序
  open-type 跳转方式
    navigate 默认值  保留当前页面 跳转到当前应用的某一个页面，但是不能跳转到tabbar页面
    redirect  关闭当前页面 跳转到应用内的某个页面 不允许跳到tarbar页面
    swichTab  跳到 tabbar页面 关闭其他所有的非tarbar页面
    reLaunch  关闭其他所有的页面  跳转到当前应用的某个页面的
    navigateBack 关闭当前页面  返回上一个页面
    exit  退出其他小程序  和target配合一起使用
6. 富文本标签
  nodes属性来实现
    1.接受标签字符串
    2.接受对象数组
```javascript
html:[
      {
        name:"div",
        attrs:{
          class:'mydiv',
          style:"color:red"
        },
        children:[
          name:"p",
          attrs:{
            class:'mydiv',
            style:"color:red"
          },
          children:[{
            type:"text",
            text:'hello'
          }]
        ]
      }
    ]
```
7. button组件
  size 两个值 mini  defaluat
  type 控制颜色 primary defalut waring
  plain 控制是否按钮透明镂空
  loading  是否有loading
  form-type  用于form表单
    submit
    reset
  open-type
    contact保留当前页面直接打开 客服对话功能  需要在微信小程序的后台配置
    share  转发当前的小程序到微信朋友中  不能把小程序发到朋友圈
    getPhoneNumber 获取当前的用户的手机号  结合一个事件bindgetphonenumber  不是企业的小程序账号  没有权限  获取的是加密过的
    getUserInfo 获取当前的用户信息  结合一个事件bindgetuserinfo  可以直接获取
    lanuchApp 在小程序中  直接打开App 现在App中打开某个链接 打开小程序  再在小程序内使用这个重新打开app
    openSetting  打开小程序内置的小程序授权页面  只会打开曾今用过的权限
    feedback  打开小程序的内置的意见反馈页面

## icon https://api-hmugo-web.itheima.net/api/public/v1/categories
  type
  size
  color

## radio
<radio-group bindchange="radio">
  <radio color="blue" value="man">男</radio>
  <radio value="famale">女</radio>
</radio-group>

## checkout
<checkbox-group bindchange="radio">
  <checkbox value="jian" color="black">jian</checkbox>
  <checkbox value="ge" color="skyblue">ge</checkbox>
  <checkbox value="shuai">shuai</checkbox>
</checkbox-group>

# 自定义组件
## 组件的生命周期
  created  setDate不能用
  attached  组件实例进入页面的节点树
  ready 页面已经布局到页面
  move  在组件实例移动到另一位置时执行
  detached  组件被销毁时使用
## 应用的生命周期  app.js
  ### onLaunch 应用第一次启动时触发的事件
  ### onShow  应用被用户看到的 时候  切后台 回来 显示也会触发
  ### onHide  页面隐藏  切后台
  ### onError  应用的代码报错时触发
  ### onPageNotFound  应用第一次启动时  找不到第一个入口页面  才会执行  
## 页面的生命周期
  data 对象
  onLoad 页面加载完成
  onShow 页面显示
  onReady  页面准备完毕
  onHide  页面隐藏
  onUnload  页面卸载  关闭当前页面导航跳转
  onPullDownRefresh   下拉刷新的事件
  onReachBottom  上拉加载  上拉到当前页面时调用
  onShareAppMessage  用户点击右上角分享
  onPageScroll  当页面滚动时触发
  onResize  页面尺寸发生改变时触发  横屏竖屏时触发
  onTabItemTap  当在tabbar页面点击当前的tarbar页面时调用

