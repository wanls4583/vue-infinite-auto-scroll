# vue-infinite-auto-scroll
> 基于vue.js的无缝自动滚动的插件，可添加无限数据而不卡顿

## 内容

- [**`浏览器兼容性`**](#浏览器兼容性)
- [**`功能特性`**](#功能特性)
- [**`安装`**](#安装)
- [**`使用`**](#使用)
- [**`案例`**](#使用)
- [**`配置项默认值`**](#配置项默认值)   
- [**`个别特殊配置项说明`**](#个别特殊配置项说明)
- [**`历史版本`**](#历史版本)
- [**`注意`**](#注意)
- [**`贡献`**](#贡献)

## 浏览器兼容性
| [<img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/edge.png" alt="IE" width="16px" height="16px" />](http://godban.github.io/browsers-support-badges/)</br>IE | [<img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/firefox.png" alt="Firefox" width="16px" height="16px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/chrome.png" alt="Chrome" width="16px" height="16px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/safari.png" alt="Safari" width="16px" height="16px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/safari-ios.png" alt="iOS Safari" width="16px" height="16px" />](http://godban.github.io/browsers-support-badges/)</br>iOS | [<img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/chrome-android.png" alt="Chrome for Android" width="16px" height="16px" />](http://godban.github.io/browsers-support-badges/)</br>Android |
|:---------:|:---------:|:---------:|:---------:|:---------:|:---------:|
| IE9+ | &check;| &check; | &check; | &check; | &check; | &check;

## 功能特性
* [x] 基于requestAnimationFrame实现
* [x] 配置多满足多样需求
* [x] 目前支持上下无缝滚动
* [x] 持续维护迭代

## 安装

### NPM

```bash
npm install vue-infinite-auto-scroll --save
```

## 使用

```js
// **main.js**
// 1.全局 install
import Vue from 'vue'
import scroll from 'vue-infinite-auto-scroll'
Vue.use(scroll)

// 或者你可以自己设置全局注册的组件名 默认注册的组件名是 vue-infinite-auto-scroll
Vue.use(scroll,{componentName: 'vue-infinite-auto-scroll'})

// 2.单个.vue文件局部注册
<script>
  import vueInfiniteAutoScroll from 'vue-infinite-auto-scroll'
   export default {
      components: {
        vueInfiniteAutoScroll
      }
   }
</script>
```

## 案例

请查看[**`example`**](https://github.com/wanls4583/vue-infinite-auto-scroll/tree/master/example-src)

[**`online demo`**](https://blog.lisong.hn.cn/code/vue-infinite-auto-scroll/example/index.html)

## 配置项

|key|description|default|val|
|:---|---|---|---|
|`speed`|数值越大速度滚动越快|`1`|`Number`|
|`force`|是否强制滚动，如果为ture，则即使列表小于容器高度，也将循环滚动|`false`|`Number`|
|`once`|是否只滚动一次|`false`|`Boolean`|
|`newFirst`|动态新增的数据是否优先显示，为true时将打乱显示的顺序|`false`|`Boolean`|


## 个别特殊配置项说明

> 1.最外层容器需要手动设置`width height overflow:hidden`


## 历史版本

See the GitHub [历史版本](https://github.com/wanls4583/vue-infinite-auto-scroll/releases).


## 贡献

欢迎给出一些意见和优化，期待你的 `Pull Request`