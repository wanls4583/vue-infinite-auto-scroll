/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
    name: 'scroller',
    data() {
        return {
            listData: [],
            copyData: [],
            dataLength: 0,
            store: []
        }
    },
    props: {
        data: {
            type: Array,
            default: () => {
                return []
            }
        },
        //force:默认为false（如果列表总高度小于容器将不进行循环滚动），当为true时，不论列表总高度为多少都将进行循环滚动
        //speed:滚动速度
        //once:是否只滚动一次
        option: {
            type: Object,
            default: () => {
              return {}
            }
        }
    },
    created(){
        //页面可能同时存在多个该组件
        window.scrollerCount = window.scrollerCount || 0;
        window.scrollerCount++;
        this.scrollerClass = 'scroller'+window.scrollerCount;
        this.wrapClass = 'infinite-warp'+window.scrollerCount;
        this.listData = this.data.slice(0,1);
        this.copyData = this.data.slice(1,this.data.length);
        this.dataLength = this.data.length;
        this.force = this.option.force || false;
        this.speed = this.option.speed || 1;
        this.once = this.option.once || false;
    },
    mounted(){
        this.scroll();
    },
    methods:{
        //开始滚动
        scroll(){
            let self = this;
            let wrap = document.querySelector('.'+self.wrapClass);
            let scroller = document.querySelector('.'+self.scrollerClass);
            if(!scroller)
                return;
            let translateY = self.getComputedTranslateY(scroller);
            let li = scroller.querySelectorAll('li');
            if(scroller.scrollHeight > Math.abs(translateY)+wrap.clientHeight){
                scroller.style = 'transform: translate3d(0px, '+(translateY-self.speed)+'px, 0px);';
            //只有列表总高度超过容器高度或者force参数为false时才循环无限滚动
            }else{ 
                let tmp = [];
                tmp = self.copyData.splice(0,2);
                //缓存数据
                if(self.store.length<1000){
                    self.store = self.store.concat(tmp);
                }
                //如果没有数据了则从缓存里取，以实现循环无限滚动
                if(!tmp.length && !self.once &&
                    (self.force || 
                        (!self.force && li.length && self.data.length*li[0].clientHeight > wrap.clientHeight))){
                    tmp = self.store.splice(0,2);
                    self.store = self.store.concat(tmp);
                }
                tmp.forEach(function(item){
                    self.$set(self.listData,self.listData.length,item);
                });
            }
            //删除顶部无用的dom，防止浏览器卡顿
            if(scroller && li.length){
                let liHieght = li[0].clientHeight;
                let delLenght = (Math.abs(translateY)/liHieght)>>0;
                if(delLenght>5){
                    self.listData.splice(0,delLenght);
                    scroller.style = 'transform: translate3d(0px, '+(translateY%liHieght)+'px, 0px);';
                }
            }
            window.requestAnimationFrame(function(){
                self.scroll();
            })
        },
        //获取计算后的translateY
        getComputedTranslateY: function(dom) {
            var startY = 0;
            var style = window.getComputedStyle ? window.getComputedStyle(dom, null) : null || dom.currentStyle;
            var matrix = style['transform'];
            if (matrix && matrix != 'none') {
                startY = Number(matrix.replace(/matrix\(|\)/g, '').split(',')[5]);
            }
            return startY;
        }
    },
    watch:{
        data: { 
            handler: function (val, oldVal) {  
                if(val.length>this.dataLength){
                    this.copyData = this.copyData.concat(val.slice(this.dataLength,val.length));
                }else if(val!=oldVal){
                    this.store = [];
                    this.copyData = [];
                }
                this.dataLength = val.length;
            },  
            deep: true
        }
    }
});



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_scroller_vue__ = __webpack_require__(2);


__WEBPACK_IMPORTED_MODULE_0__components_scroller_vue__["a" /* default */].install = function (Vue, options = {}) {
  Vue.component(options.componentName || __WEBPACK_IMPORTED_MODULE_0__components_scroller_vue__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__components_scroller_vue__["a" /* default */])
}

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__components_scroller_vue__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__components_scroller_vue__["a" /* default */])
}

/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_0__components_scroller_vue__["a" /* default */]);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_14_2_2_vue_loader_lib_selector_type_script_index_0_scroller_vue__ = __webpack_require__(0);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_14_2_2_vue_loader_lib_template_compiler_index_id_data_v_49d9d52a_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_14_2_2_vue_loader_lib_selector_type_template_index_0_scroller_vue__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_14_2_2_vue_loader_lib_runtime_component_normalizer__ = __webpack_require__(4);
var disposed = false
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null

var Component = Object(__WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_14_2_2_vue_loader_lib_runtime_component_normalizer__["a" /* default */])(
  __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_14_2_2_vue_loader_lib_selector_type_script_index_0_scroller_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_14_2_2_vue_loader_lib_template_compiler_index_id_data_v_49d9d52a_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_14_2_2_vue_loader_lib_selector_type_template_index_0_scroller_vue__["a" /* render */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_14_2_2_vue_loader_lib_template_compiler_index_id_data_v_49d9d52a_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_14_2_2_vue_loader_lib_selector_type_template_index_0_scroller_vue__["b" /* staticRenderFns */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\components\\scroller.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-49d9d52a", Component.options)
  } else {
    hotAPI.reload("data-v-49d9d52a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "infinite-warp", class: _vm.wrapClass }, [
    _c(
      "ul",
      { staticClass: "scroller", class: _vm.scrollerClass },
      _vm._l(_vm.listData, function(item) {
        return _c("li", [_vm._t("default", null, { item: item })], 2)
      })
    )
  ])
}
var staticRenderFns = []
render._withStripped = true

if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-49d9d52a", { render: render, staticRenderFns: staticRenderFns })
  }
}

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = normalizeComponent;
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  scriptExports = scriptExports || {}

  // ES6 modules interop
  var type = typeof scriptExports.default
  if (type === 'object' || type === 'function') {
    scriptExports = scriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ })
/******/ ]);